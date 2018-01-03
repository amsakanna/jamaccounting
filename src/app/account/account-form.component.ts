import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store } from '@ngrx/store';
import { AccountModuleState, AccountState, AccountAction } from './account.store';
import { Account } from '../model';

@Component( {
	selector: 'app-account-form',
	templateUrl: './account-form.component.html',
	styleUrls: [ './account-form.component.css' ]
} )
export class AccountFormComponent implements OnInit
{

	private form: FormGroup;
	private creating: boolean;
	private item: Account;
	private list: Account[];

	constructor ( private store: Store<AccountModuleState>,
		private formBuilder: FormBuilder,
		private activatedRoute: ActivatedRoute )
	{
		this.item = new Account();
	}

	ngOnInit ()
	{
		this.store.select( state => state.accountState )
			.subscribe( accountState =>
			{
				if ( accountState.loading ) return;

				this.list = accountState.list;
				this.creating = accountState.creating;

				if ( accountState.creating ) {
					this.item.parentKey = ( accountState.selectedItem || this.item ).key;
				} else if ( accountState.editing ) {
					this.item = accountState.selectedItem || this.item;
				}

			} );

		/**
		 * Handle first load
		 */
		const accountKey: string = this.activatedRoute.snapshot.params[ 'account' ] || null;
		this.store.select( state => state.accountState.selectedItem ).take( 1 )
			.filter( selectedItem => !selectedItem || ( accountKey && selectedItem.key != accountKey ) )
			.subscribe( selectedItem => this.store.dispatch( new AccountAction.Select( accountKey ) ) );

		this.store.select( state => state.accountState.creating ).take( 1 )
			.withLatestFrom( this.store.select( state => state.accountState.editing ) )
			.filter( ( [ creating, editing ] ) => !creating && !editing )
			.subscribe( ( [ creating, editing ] ) => accountKey
				? this.store.dispatch( new AccountAction.Edit( new Account( { key: accountKey } ) ) )
				: this.store.dispatch( new AccountAction.Create() ) );

		this.form = this.buildForm();

	}

	private buildForm (): FormGroup
	{
		return this.formBuilder.group( {
			name: [ this.item.name, Validators.required ]
		} );
	}

	private buildModel (): Account
	{
		this.item.name = this.form.controls[ 'name' ].value;
		return this.item;
	}

	private submit (): void
	{
		const account = this.buildModel();
		if ( this.creating ) {
			this.store.dispatch( new AccountAction.Add( account ) );
		} else {
			this.store.dispatch( new AccountAction.Modify( account ) );
		}
	}

	private cancel (): void
	{
		this.store.dispatch( new AccountAction.CancelCreate() );
		this.store.dispatch( new AccountAction.CancelEdit() );
	}

	private reset (): void
	{

	}

}
