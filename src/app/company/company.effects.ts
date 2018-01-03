import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { KeyValue } from "../../jam/model-library";
import { NavigatorAction } from "../../jam/navigator";
import { DatabaseService } from "../shared/database.service";
import { CompanyModuleState, CompanyState } from './company.state';
import { CompanyActionTypes, CompanyAction } from './company.actions';
import { Company, Pages } from '../model';
import { Table, DbAction } from "../../jam/firestore";

@Injectable()
export class CompanyEffects
{
	@Effect() public initialize$: Observable<Action>;
	@Effect() public select$: Observable<Action>;
	@Effect() public select2$: Observable<Action>;
	@Effect() public create$: Observable<Action>;
	@Effect() public add$: Observable<Action>;
	@Effect() public added$: Observable<Action>;
	@Effect() public remove$: Observable<Action>;
	@Effect() public removed$: Observable<Action>;

	constructor ( private actions$: Actions, private db: DatabaseService, private store: Store<CompanyModuleState> )
	{

		console.log( 'company-effects' );

		this.initialize$ = this.actions$.ofType<CompanyAction.Initialize>( CompanyActionTypes.initialize )
			.map( action => new CompanyAction.Initialized() );

		this.select$ = this.actions$.ofType<CompanyAction.Select>( CompanyActionTypes.select )
			.withLatestFrom( this.store.select( state => state.companyState.selectedItem ) )
			.filter( ( [ action, stateItem ] ) => ( !stateItem ) || ( stateItem.key != action.key ) )
			.switchMap( ( [ action, stateItem ] ) => this.db.tables.Company.lookup( action.key ) )
			.map( company => new CompanyAction.Selected( company ) );

		this.select2$ = this.actions$.ofType<CompanyAction.Select>( CompanyActionTypes.select )
			.map( action => new DbAction.EnterCollection( 'Company', action.key ) )

		this.create$ = this.actions$.ofType( CompanyActionTypes.create )
			.map( params => new NavigatorAction.Navigate( Pages.CreateCompany ) );

		this.add$ = this.actions$.ofType<CompanyAction.Add>( CompanyActionTypes.add )
			.switchMap( async action =>
			{
				const company = await this.db.tables.Company.insert( action.item );
				this.store.dispatch( new DbAction.EnterCollection( 'Company', company.key ) );
				/**
				 * TODO
				 * var existingUserAccount = this.userService.userAccount;
				 * existingUserAccount.companies.push( company.key );
				 * const newUserAccount = new UserAccount( { key: existingUserAccount.key, companies: existingUserAccount.companies } );
				 * await this.db.tables.UserAccount.updateFields( newUserAccount );
				 */
				await Table.clone( this.db.tables.PresetAccount, this.db.tables.Account, true );
				return company;
			} )
			.map( item => new CompanyAction.Added( item ) );

		this.added$ = this.actions$.ofType<CompanyAction.Added>( CompanyActionTypes.added )
			.map( action => new CompanyAction.Select( action.item.key ) );

		this.remove$ = this.actions$.ofType<CompanyAction.Remove>( CompanyActionTypes.remove )
			.switchMap( async action =>
			{
				const company = await this.db.tables.Company.remove( action.key );
				if ( company ) this.store.dispatch( new DbAction.ExitCollection( 'Company' ) );;
				/**
				 * TODO
				 * var existingUserAccount = this.userService.userAccount;
				 * existingUserAccount.companies = existingUserAccount.companies.filter( company => company != this.company.key );
				 * const newUserAccount = new UserAccount( { key: existingUserAccount.key, companies: existingUserAccount.companies } );
				 * await this.db.tables.UserAccount.updateFields( newUserAccount );
				 */
				return company;
			} )
			.map( item => new CompanyAction.Removed( item ) );

		this.removed$ = this.actions$.ofType<CompanyAction.Removed>( CompanyActionTypes.removed )
			.map( action => new NavigatorAction.Navigate( Pages.Companies ) );

	}
}