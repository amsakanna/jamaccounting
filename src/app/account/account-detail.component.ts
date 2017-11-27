import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Store } from '@ngrx/store';
import { AccountModuleState, AccountState, AccountAction } from './account.store';
import { Account } from "./account.model";

@Component( {
	selector: 'app-account-detail',
	templateUrl: './account-detail.component.html',
	styleUrls: [ './account-detail.component.css' ]
} )
export class AccountDetailComponent implements OnInit
{

	private accountKeyParam: string;
	private account: Account;
	private path: Array<Account>;

	constructor ( private activatedRoute: ActivatedRoute,
		private store: Store<AccountModuleState> )
	{
	}

	ngOnInit ()
	{
		this.accountKeyParam = this.activatedRoute.snapshot.params[ 'account' ] || null;
		this.store.select( state => state.accountState.selectedItem )
			.subscribe( selectedItem => this.account = selectedItem );
		this.store.select( state => state.accountState.tree )
			.subscribe( tree => this.path = tree && this.account ? tree.getAncestors( this.account ).reverse() : [] );
		this.store.dispatch( new AccountAction.Select( this.accountKeyParam ) );
	}

	private select ( account: Account )
	{
		this.store.dispatch( new AccountAction.Select( account.key ) );
	}

	private edit ( account: Account )
	{
		this.store.dispatch( new AccountAction.Edit() );
	}

}
