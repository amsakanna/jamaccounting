import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { MatDialog } from "@angular/material";
import { DatabaseService } from "../shared/database.service";
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { JamEntityAction } from "../../jam/ngrx";
import { InvoiceModuleState, invoiceActions } from './invoice.store';
import { Invoice, Pages, Inventory, Product } from '../model';
import { NavigatorAction } from "../../jam/navigator";

@Injectable()
export class InvoiceEffects
{
	@Effect() public initialize$: Observable<Action>;
	@Effect() public load$: Observable<Action>;
	@Effect() public loaded$: Observable<Action>;
	@Effect() public add$: Observable<Action>;
	@Effect() public modify$: Observable<Action>;
	@Effect() public remove$: Observable<Action>;
	@Effect() public selectAfterCrud$: Observable<Action>;
	@Effect( { dispatch: false } ) public openForm$: Observable<any>;
	@Effect( { dispatch: false } ) public closeForm$: Observable<any>;

	@Effect() public filterParties$: Observable<any>;
	@Effect() public filterProducts$: Observable<any>;

	constructor (
		private actions$: Actions<JamEntityAction<Invoice>>,
		private rootStore: Store<InvoiceModuleState>,
		private db: DatabaseService,
		private dialogManager: MatDialog
	)
	{

		/**
		 * Load Effects
		 */
		this.initialize$ = this.actions$.ofType( invoiceActions.initialize )
			.switchMap( action => this.rootStore.select( state => state.companyState.selectedItem ) )
			.filter( company => !!company )
			.mergeMap( company => [
				invoiceActions.Initialized(),
				invoiceActions.Load()
			] );

		this.load$ = this.actions$.ofType( invoiceActions.load )
			.switchMap( action => this.db.tables.Invoice.list )
			.switchMap( result => this.db.tables.TaxGroup.list, ( outerValue, innerValue ) => ( { list: outerValue, taxGroupList: innerValue } ) )
			.switchMap( result => this.db.tables.Tax.list, ( outerValue, innerValue ) => ( { ...outerValue, taxList: innerValue } ) )
			.switchMap( result => this.db.tables.TaxType.list, ( outerValue, innerValue ) => ( { ...outerValue, taxTypeList: innerValue } ) )
			.map( result => invoiceActions.Loaded( result.list, { taxTypeList: result.taxTypeList, taxList: result.taxList, taxGroupList: result.taxGroupList } ) );

		this.loaded$ = this.actions$.ofType( invoiceActions.loaded )
			.mergeMap( action => [
				invoiceActions.FilterParties( null ),
				invoiceActions.FilterProducts( null )
			] );

		this.filterParties$ = this.actions$.ofType( invoiceActions.filterParties )
			.switchMap( action => action.key
				? this.db.tables.Party.filter( 'name', '==', action.key )
				: this.db.tables.Party.listFirst( 10 ) )
			.map( partyList => invoiceActions.FilteredParties( partyList ) );

		this.filterProducts$ = this.actions$.ofType( invoiceActions.filterProducts )
			.switchMap( action => action.key
				? this.db.tables.Product.filter( 'name', '==', action.key )
				: this.db.tables.Product.listFirst( 10 ) )
			.switchMap( productList => this.db.tables.Inventory.filterMany( 'productKey', productList.map( product => product.key ) ), ( outerValue, innerValue ) => ( [ outerValue, innerValue ] ) as [ Product[], Inventory[] ] )
			.withLatestFrom(
				this.rootStore.select( state => state.invoiceState.taxTypeList ),
				this.rootStore.select( state => state.invoiceState.taxList ),
				this.rootStore.select( state => state.invoiceState.taxGroupList ) )
			.map( ( [ [ productList, inventoryList ], taxTypeList, taxList, taxGroupList ] ) => inventoryList
				.map( inventory =>
				{
					const product = productList
						.find( product => product.key == inventory.productKey ) || null;
					const taxGroup = taxGroupList
						.find( taxGroup => taxGroup.key == inventory.taxGroupKey ) || null;
					taxGroup.taxes = taxGroup.taxesKey.map( taxKey =>
					{
						const tax = taxList.find( tax => tax.key == taxKey ) || null;
						tax.type = taxTypeList.find( taxType => taxType.key == tax.typeKey ) || null;
						return tax;
					} );
					return {
						...inventory,
						product: product,
						taxGroup: taxGroup
					} as Inventory
				} ) )
			.map( inventoryList => invoiceActions.FilteredProducts( inventoryList ) );


		// this.load$ = this.actions$.ofType( invoiceActions.load )
		// 	.switchMap( action => this.db.tables.Invoice.list )
		// 	.switchMap( list => this.db.tables.Party.list, ( outerValue, innerValue ) => ( { list: outerValue, partyList: innerValue } ) )
		// 	.switchMap( result => this.db.tables.Product.list, ( outerValue, innerValue ) => ( { ...outerValue, productList: innerValue } ) )
		// 	.switchMap( result => this.db.tables.Inventory.list, ( outerValue, innerValue ) => ( { ...outerValue, inventoryList: innerValue } ) )
		// 	.switchMap( result => this.db.tables.TaxGroup.list, ( outerValue, innerValue ) => ( { ...outerValue, taxGroupList: innerValue } ) )
		// 	.switchMap( result => this.db.tables.Tax.list, ( outerValue, innerValue ) => ( { ...outerValue, taxList: innerValue } ) )
		// 	.switchMap( result => this.db.tables.TaxType.list, ( outerValue, innerValue ) => ( { ...outerValue, taxTypeList: innerValue } ) )
		// 	.map( result => ( {
		// 		list: result.list,
		// 		partyList: result.partyList,
		// 		inventoryList: result.inventoryList.map( inventory =>
		// 		{
		// 			const product = result.productList
		// 				.find( product => product.key == inventory.productKey ) || null;
		// 			const taxGroup = result.taxGroupList
		// 				.find( taxGroup => taxGroup.key == inventory.taxGroupKey ) || null;
		// 			taxGroup.taxes = taxGroup.taxesKey.map( taxKey =>
		// 			{
		// 				const tax = result.taxList.find( tax => tax.key == taxKey ) || null;
		// 				tax.type = result.taxTypeList.find( taxType => taxType.key == tax.typeKey ) || null;
		// 				return tax;
		// 			} );

		// 			return {
		// 				...inventory,
		// 				product: product,
		// 				taxGroup: taxGroup
		// 			} as Inventory
		// 		} )
		// 	} ) )
		// 	.map( result => invoiceActions.Loaded( result.list, { partyList: result.partyList, inventoryList: result.inventoryList } ) );

		/**
		 * Select Effects
		 */
		this.selectAfterCrud$ = this.actions$.ofType( invoiceActions.loaded, invoiceActions.added, invoiceActions.modified, invoiceActions.removed )
			.map( action => invoiceActions.Select() );

		/**
		 * CRUD Effects
		 */
		this.add$ = this.actions$.ofType( invoiceActions.add )
			.switchMap( action => this.db.tables.Invoice.insert( action.item ) )
			.map( item => item ? invoiceActions.Added( item ) : invoiceActions.AddFailed() );

		this.modify$ = this.actions$.ofType( invoiceActions.modify )
			.switchMap( action => this.db.tables.Invoice.update( action.item ) )
			.map( item => item ? invoiceActions.Modified( item ) : invoiceActions.ModifyFailed() );

		this.remove$ = this.actions$.ofType( invoiceActions.remove )
			.switchMap( action => this.db.tables.Invoice.remove( action.key ) )
			.map( item => item ? invoiceActions.Removed( item ) : invoiceActions.RemoveFailed() );

		/**
		 * Form Effects
		 */
		this.openForm$ = this.actions$.ofType( invoiceActions.create, invoiceActions.edit )
			.map( action => this.rootStore.dispatch( new NavigatorAction.Navigate( Pages.CreateInvoice ) ) );

		this.closeForm$ = this.actions$.ofType( invoiceActions.cancelCreate, invoiceActions.cancelEdit, invoiceActions.added, invoiceActions.modified )
			.map( action => this.rootStore.dispatch( new NavigatorAction.Navigate( Pages.Invoice ) ) );

	}
}
