import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { DatabaseService } from './database.service';
import { Account } from "../models/account.model";
import { FlatTree } from "../models/flat-tree.model";

@Injectable()
export class AccountService
{

	public list: Array<Account>;
	private _selectedItem: Account;
	public tree: FlatTree<Account>;
	public selectedItem$: Subject<Account>

	constructor ( private router: Router,
		private db: DatabaseService )
	{
		console.log( 'account-service' );
		this.selectedItem$ = new Subject<Account>();
		this.db.tables.Account.listAndHold
			.subscribe( list => this.buildTree( list ) );
	}

	public get selectedItem (): Account
	{
		return this._selectedItem;
	}

	public set selectedItem ( value: Account )
	{
		this._selectedItem = value;
		this.selectedItem$.next( this._selectedItem );
	}

	public buildTree ( list: Array<Account> )
	{
		console.log( ( this.tree ? 're-' : '' ) + 'building account tree' );
		console.log( list );
		/**
		 * Build tree
		 */
		const rootAccount = list.find( item => item.parentKey == null );
		this.tree = new FlatTree<Account>( list, rootAccount.key );

		/**
		 * Set default item and select it
		 */
		this.tree.defaultItem = list.find( item => item.id == '101' );
		console.log( this.selectedItem );
		this.tree.select( this.selectedItem || this.tree.defaultItem );
		this.selectedItem = this.tree.selectedItem;

		/**
		 * Build initial list
		 */
		this.list = this.tree.getChildren( this.tree.root );
		console.log( 'account-service', 'tree-built' );
	}

	public select ( account: Account )
	{
		this.selectedItem = ( this.tree && this.tree.select( account ) ) || account;
	}

}