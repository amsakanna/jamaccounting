import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Account } from "../models/account.model";
import { FlatTree } from "../models/flat-tree.model";

@Injectable()
export class AccountService
{

	public tree: FlatTree<Account>;

	constructor(private router: Router)
	{
		var accounts = this.getAccountList();
		this.tree = new FlatTree<Account>( accounts, 'AC00' );
		this.tree.defaultItem = this.tree.getItem( 'AC00A' );
		this.select( this.tree.defaultItem );
	}

	public select( account: Account | string )
	{
		this.tree.select( account );		
	}

	private getAccountList() : Array<Account>
	{
		return [
			
			new Account( { $key: 'AC00', name: 'Primary' } ),

			new Account( { $key: 'AC00A', name: 'Assets', parentKey: 'AC00' } ),
			new Account( { $key: 'AC00A1', name: 'Fixed Assets', parentKey: 'AC00A' } ),
			new Account( { $key: 'AC00A2', name: 'Investments', parentKey: 'AC00A' } ),
			new Account( { $key: 'AC00A3', name: 'Current Assets', parentKey: 'AC00A' } ),
			new Account( { $key: 'AC00A31', name: 'Bank Account', parentKey: 'AC00A3' } ),
			new Account( { $key: 'AC00A32', name: 'Cash In Hand', parentKey: 'AC00A3' } ),
			new Account( { $key: 'AC00A33', name: 'Deposits', parentKey: 'AC00A3' } ),
			new Account( { $key: 'AC00A34', name: 'Loans And Advances', parentKey: 'AC00A3' } ),
			new Account( { $key: 'AC00A35', name: 'Stock In Hand', parentKey: 'AC00A3' } ),
			new Account( { $key: 'AC00A36', name: 'Sundry Debtors', parentKey: 'AC00A3' } ),
			new Account( { $key: 'AC00A4', name: 'Miscellaneous Expenses', parentKey: 'AC00A' } ),

			new Account( { $key: 'AC00L', name: 'Liabilities', parentKey: 'AC00' } ),
			new Account( { $key: 'AC00L4', name: 'Loans', parentKey: 'AC00L' } ),
			new Account( { $key: 'AC00L42', name: 'Secured Loans', parentKey: 'AC00L4', description: `
			A secured loan, is a loan in which the borrower pledges some asset (e.g. a car or property) as collateral for the loan, 
			which then becomes a secured debt owed to the creditor who gives the loan.
			`, number: '65232656232', holderName: 'Amsakanna' } ),
			new Account( { $key: 'AC00L43', name: 'Unsecured Loans', parentKey: 'AC00L4' } ),
			new Account( { $key: 'AC00L5', name: 'Branches / Divisions', parentKey: 'AC00L' } ),
			new Account( { $key: 'AC00L6', name: 'Capital Account', parentKey: 'AC00L' } ),
			new Account( { $key: 'AC00L61', name: 'Reserves And Surplus', parentKey: 'AC00L6' } ),
			new Account( { $key: 'AC00L7', name: 'Current Liabilities', parentKey: 'AC00L' } ),
			new Account( { $key: 'AC00L41', name: 'Bank OD Account', parentKey: 'AC00L7' } ),
			new Account( { $key: 'AC00L71', name: 'Duties And Taxes', parentKey: 'AC00L7' } ),
			new Account( { $key: 'AC00L72', name: 'Provisions', parentKey: 'AC00L7' } ),
			new Account( { $key: 'AC00L73', name: 'Sundry Creditors', parentKey: 'AC00L7' } ),
			new Account( { $key: 'AC00L8', name: 'Suspense Accounts', parentKey: 'AC00L' } ),

			new Account( { $key: 'AC00E', name: 'Expenses', parentKey: 'AC00' } ),
			new Account( { $key: 'AC00E9', name: 'Direct Expenses', parentKey: 'AC00E' } ),
			new Account( { $key: 'AC00EA', name: 'Indirect Expenses', parentKey: 'AC00E' } ),
			new Account( { $key: 'AC00EB', name: 'Purchase Accounts', parentKey: 'AC00E' } ),

			new Account( { $key: 'AC00I', name: 'Incomes', parentKey: 'AC00' } ),
			new Account( { $key: 'AC00IC', name: 'Direct Incomes', parentKey: 'AC00I' } ),
			new Account( { $key: 'AC00ID', name: 'Indirect Incomes', parentKey: 'AC00I' } ),
			new Account( { $key: 'AC00IE', name: 'Sales Accounts', parentKey: 'AC00I' } )

		];
	}

}