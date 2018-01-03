import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from "@angular/router";
import { Store } from '@ngrx/store';
import { AccountModuleState, AccountState, AccountAction } from './account.store';
import { Account } from "../model";

@Component( {
	selector: 'app-account-detail',
	templateUrl: './account-detail.component.html',
	styleUrls: [ './account-detail.component.css' ]
} )
export class AccountDetailComponent implements OnInit
{

	private item: Account;
	private path$: Observable<Account[]>;

	constructor ( private store: Store<AccountModuleState>,
		private activatedRoute: ActivatedRoute ) { }

	ngOnInit ()
	{

		this.store.select( state => state.accountState.selectedItem )
			.subscribe( selectedItem => this.item = selectedItem );

		this.path$ = this.store.select( state => state.accountState.selectedItem )
			.withLatestFrom( this.store.select( state => state.accountState.tree ) )
			.filter( ( [ selectedItem, tree ] ) => !!tree )
			.map( ( [ selectedItem, tree ] ) => tree.getAncestors( selectedItem ).reverse() );

		/**
		 * Handle first load
		 */
		const key: string = this.activatedRoute.snapshot.params[ 'account' ] || '';
		this.store.select( state => state.accountState.selectedItem ).take( 1 )
			.filter( selectedItem => !selectedItem || selectedItem.key != key )
			.subscribe( selectedItem => this.store.dispatch( new AccountAction.Select( key ) ) );

	}

	private select ( account: Account )
	{
		this.store.dispatch( new AccountAction.Select( account.key ) );
	}

	private edit ()
	{
		this.store.dispatch( new AccountAction.Edit() );
	}

}
