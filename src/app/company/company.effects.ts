import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { KeyValue } from "../../jam-model-library/jam-model-library";
import { NavigatorAction } from "../../jam-navigator/jam-navigator";
import { DatabaseService } from "../shared/database.service";
import { CompanyModuleState, CompanyState } from './company.state';
import { CompanyActionTypes, CompanyAction } from './company.actions';
import { Company } from './company.model';
import { Pages } from "../shared/pages.enum";
import { Table } from "../../jam-firestore/jam-firestore";

@Injectable()
export class CompanyEffects
{
	@Effect() public initialize$: Observable<Action>;
	@Effect() public initialized$: Observable<Action>;
	@Effect() public select$: Observable<Action>;
	@Effect() public selected$: Observable<Action>;
	@Effect() public create$: Observable<Action>;
	@Effect() public edit$: Observable<Action>;
	@Effect() public add$: Observable<Action>;
	@Effect() public added$: Observable<Action>;
	@Effect() public cancelEdit$: Observable<Action>;
	@Effect() public remove$: Observable<Action>;
	@Effect() public removed$: Observable<Action>;

	constructor ( private actions$: Actions, private db: DatabaseService, private store: Store<CompanyModuleState> )
	{

		this.initialize$ = this.actions$.ofType<CompanyAction.Initialize>( CompanyActionTypes.initialize )
			.switchMap( action => action.userAccount.companies
				.reduce( ( allCompanies, companyKey ) => this.db.tables.Company
					.get( companyKey ), Observable.of<Company>( null ) ) )
			.map( company => new CompanyAction.Selected( company ) );

		this.select$ = this.actions$.ofType<CompanyAction.Select>( CompanyActionTypes.select )
			.switchMap( action => this.db.tables.Company.lookup( action.key ) )
			.map( company => new CompanyAction.Selected( company ) );

		this.selected$ = this.actions$.ofType<CompanyAction.Selected>( CompanyActionTypes.selected )
			.map( action =>
			{
				this.db.EnterCollection( 'Company', action.item.key );
				const params = [ new KeyValue( 'company', action.item.key ) ];
				return new NavigatorAction.Navigate( Pages.Company, params );
			} );

		this.create$ = this.actions$.ofType( CompanyActionTypes.create )
			.map( params => new NavigatorAction.Navigate( Pages.CreateCompany ) );

		this.add$ = this.actions$.ofType<CompanyAction.Add>( CompanyActionTypes.add )
			.switchMap( async action =>
			{
				const company = await this.db.tables.Company.insert( action.item );
				this.db.EnterCollection( 'Company', company.key );
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
				const company = await this.db.tables.Company.delete( action.key );
				if ( company ) this.db.ExitCollection( 'Company' );
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