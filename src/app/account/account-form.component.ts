import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store } from '@ngrx/store';
import { AccountModuleState, AccountState, AccountAction } from './account.store';
import { Account } from './account.model';

@Component( {
	selector: 'app-account-form',
	templateUrl: './account-form.component.html',
	styleUrls: [ './account-form.component.css' ]
} )
export class AccountFormComponent implements OnInit
{

	private accountKeyParam: string;
	private accountState: AccountState;
	private account: Account;
	private accountList: Account[];
	private formGroup: FormGroup;

	constructor ( private formBuilder: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private store: Store<AccountModuleState> )
	{
		this.account = new Account();
	}

	ngOnInit ()
	{
		console.log( this.activatedRoute.snapshot.params );
		this.accountKeyParam = this.activatedRoute.snapshot.params[ 'account' ] || null;

		this.store.select( state => state.accountState ).subscribe( accountState =>
		{
			this.accountState = accountState;
			if ( this.accountState.loading ) return;

			this.accountList = accountState.list;
			if ( this.accountState.creating ) {
				this.account.parentKey = ( this.accountState.selectedItem || this.account ).key;
			} else if ( this.accountState.editing ) {
				this.account = this.accountState.selectedItem || this.account;
			}
		} );
		this.store.dispatch( new AccountAction.Select( this.accountKeyParam ) );
		console.log( 'account-param', this.accountKeyParam );
		this.accountKeyParam ? this.store.dispatch( new AccountAction.Edit() ) : this.store.dispatch( new AccountAction.Create() );
		this.formGroup = this.buildForm();
	}

	private buildForm ()
	{
		return this.formBuilder.group( {
			name: [ this.account.name, Validators.required ]
		} );
	}

	private buildModel ()
	{
		this.account.name = this.formGroup.controls[ 'name' ].value;
	}

	private async submit ()
	{
		this.buildModel();
		if ( this.accountState.creating ) {
			this.store.dispatch( new AccountAction.Add( this.account ) );
		} else {
			this.store.dispatch( new AccountAction.Modify( this.account ) );
		}
	}

	private cancel ()
	{
		this.store.dispatch( new AccountAction.CancelCreate() );
		this.store.dispatch( new AccountAction.CancelEdit() );
	}

}
