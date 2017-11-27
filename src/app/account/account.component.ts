import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AccountModuleState, AccountState, AccountAction } from './account.store';
import { Account } from './account.model';
import { Router } from '@angular/router';
import { FlatTree } from '../../jam-model-library/jam-model-library';

@Component( {
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: [ './account.component.css' ]
} )
export class AccountComponent implements OnInit
{

	private loading: boolean;
	private tree: FlatTree<Account>;
	private selectedItem: Account;

	constructor ( private store: Store<AccountModuleState>, private router: Router )
	{
	}

	ngOnInit ()
	{
		this.store.select( state => state.accountState.loading )
			.subscribe( loading => this.loading = loading );
		this.store.select( state => state.accountState.tree )
			.subscribe( tree => this.tree = tree );
		this.store.select( state => state.accountState.selectedItem )
			.subscribe( selectedItem => this.selectedItem = selectedItem );
		this.store.dispatch( new AccountAction.Initialize() );
	}

	private select ( account: Account )
	{
		console.log( account );
		this.store.dispatch( new AccountAction.Select( account.key ) );
	}

	private newItem ()
	{
		this.store.dispatch( new AccountAction.Create() );
	}

	// private createPresetAccountTable ()
	// {
	// 	this.db.tables.PresetAccount.updateElseInsert( new Account( { name: 'Primary', id: '000', parentKey: '' } ), 'Primary', 'name' )
	// 		.then( primary =>
	// 		{
	// 			this.db.tables.PresetAccount.updateElseInsert( new Account( { name: 'Assets', id: '101', parentKey: primary.key } ), 'Assets', 'name' )
	// 				.then( assets =>
	// 				{
	// 					this.db.tables.PresetAccount.updateElseInsert( new Account( { name: 'Fixed Assets', id: '105', parentKey: assets.key } ), 'Fixed Assets', 'name' );
	// 					this.db.tables.PresetAccount.updateElseInsert( new Account( { name: 'Investments', id: '106', parentKey: assets.key } ), 'Investments', 'name' );
	// 					this.db.tables.PresetAccount.updateElseInsert( new Account( { name: 'Current Assets', id: '107', parentKey: assets.key } ), 'Current Assets', 'name' )
	// 						.then( currentAssets =>
	// 						{
	// 							this.db.tables.PresetAccount.updateElseInsert( new Account( { name: 'Bank Account', id: '120', parentKey: currentAssets.key } ), 'Bank Account', 'name' );
	// 							this.db.tables.PresetAccount.updateElseInsert( new Account( { name: 'Cash In Hand', id: '121', parentKey: currentAssets.key } ), 'Cash In Hand', 'name' );
	// 							this.db.tables.PresetAccount.updateElseInsert( new Account( { name: 'Deposits', id: '122', parentKey: currentAssets.key } ), 'Deposits', 'name' );
	// 							this.db.tables.PresetAccount.updateElseInsert( new Account( { name: 'Loans And Advances', id: '123', parentKey: currentAssets.key } ), 'Loans And Advances', 'name' );
	// 							this.db.tables.PresetAccount.updateElseInsert( new Account( { name: 'Stock In Hand', id: '124', parentKey: currentAssets.key } ), 'Stock In Hand', 'name' );
	// 							this.db.tables.PresetAccount.updateElseInsert( new Account( { name: 'Sundry Debtors', id: '125', parentKey: currentAssets.key } ), 'Sundry Debtors', 'name' );
	// 						} );
	// 					this.db.tables.PresetAccount.updateElseInsert( new Account( { name: 'Miscellaneous Expenses', id: '108', parentKey: assets.key } ), 'Miscellaneous Expenses', 'name' );
	// 				} );
	// 			this.db.tables.PresetAccount.updateElseInsert( new Account( { name: 'Liabilities', id: '102', parentKey: primary.key } ), 'Liabilities', 'name' )
	// 				.then( liabilities =>
	// 				{
	// 					this.db.tables.PresetAccount.updateElseInsert( new Account( { name: 'Current Liabilities', id: '109', parentKey: liabilities.key } ), 'Current Liabilities', 'name' )
	// 						.then( currentLiabilities =>
	// 						{
	// 							this.db.tables.PresetAccount.updateElseInsert( new Account( { name: 'Duties And Taxes', id: '102', parentKey: currentLiabilities.key } ), 'Duties And Taxes', 'name' );
	// 							this.db.tables.PresetAccount.updateElseInsert( new Account( { name: 'Provisions', id: '102', parentKey: currentLiabilities.key } ), 'Provisions', 'name' );
	// 							this.db.tables.PresetAccount.updateElseInsert( new Account( { name: 'Sundry Creditors', id: '102', parentKey: currentLiabilities.key } ), 'Sundry Creditors', 'name' );
	// 						} );
	// 					this.db.tables.PresetAccount.updateElseInsert( new Account( { name: 'Loans', id: '110', parentKey: liabilities.key } ), 'Loans', 'name' )
	// 						.then( loans =>
	// 						{
	// 							this.db.tables.PresetAccount.updateElseInsert( new Account( { name: 'Bank OD Account', id: '126', parentKey: loans.key } ), 'Bank OD Account', 'name' );
	// 							this.db.tables.PresetAccount.updateElseInsert( new Account( { name: 'Secured Loans', id: '127', parentKey: loans.key } ), 'Secured Loans', 'name' );
	// 							this.db.tables.PresetAccount.updateElseInsert( new Account( { name: 'Unsecured Loans', id: '128', parentKey: loans.key } ), 'Unsecured Loans', 'name' );
	// 						} );
	// 					this.db.tables.PresetAccount.updateElseInsert( new Account( { name: 'Branches / Divisions', id: '111', parentKey: liabilities.key } ), 'Branches / Divisions', 'name' );
	// 					this.db.tables.PresetAccount.updateElseInsert( new Account( { name: 'Capital Account', id: '112', parentKey: liabilities.key } ), 'Capital Account', 'name' )
	// 						.then( capital =>
	// 						{
	// 							this.db.tables.PresetAccount.updateElseInsert( new Account( { name: 'Reserves And Surplus', id: '129', parentKey: capital.key } ), 'Reserves And Surplus', 'name' );
	// 						} );
	// 					this.db.tables.PresetAccount.updateElseInsert( new Account( { name: 'Suspense Accounts', id: '113', parentKey: liabilities.key } ), 'Suspense Accounts', 'name' );
	// 				} );
	// 			this.db.tables.PresetAccount.updateElseInsert( new Account( { name: 'Incomes', id: '103', parentKey: primary.key } ), 'Incomes', 'name' )
	// 				.then( incomes =>
	// 				{
	// 					this.db.tables.PresetAccount.updateElseInsert( new Account( { name: 'Direct Incomes', id: '114', parentKey: incomes.key } ), 'Direct Incomes', 'name' );
	// 					this.db.tables.PresetAccount.updateElseInsert( new Account( { name: 'Indirect Incomes', id: '115', parentKey: incomes.key } ), 'Indirect Incomes', 'name' );
	// 					this.db.tables.PresetAccount.updateElseInsert( new Account( { name: 'Sales Accounts', id: '116', parentKey: incomes.key } ), 'Sales Accounts', 'name' );
	// 				} );
	// 			this.db.tables.PresetAccount.updateElseInsert( new Account( { name: 'Expenses', id: '104', parentKey: primary.key } ), 'Expenses', 'name' )
	// 				.then( expenses =>
	// 				{
	// 					this.db.tables.PresetAccount.updateElseInsert( new Account( { name: 'Direct Expenses', id: '117', parentKey: expenses.key } ), 'Direct Expenses', 'name' );
	// 					this.db.tables.PresetAccount.updateElseInsert( new Account( { name: 'Indirect Expenses', id: '118', parentKey: expenses.key } ), 'Indirect Expenses', 'name' );
	// 					this.db.tables.PresetAccount.updateElseInsert( new Account( { name: 'Purchase Accounts', id: '119', parentKey: expenses.key } ), 'Purchase Accounts', 'name' );
	// 				} );
	// 		} );
	// }

}
