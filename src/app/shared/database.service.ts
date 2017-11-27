import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { JamFirestoreDatabase, Table } from "../../jam-firestore/jam-firestore";
import { IData } from '../../jam-firestore/jam-firestore';
import { User } from '../../jam-auth/jam-auth';
import { UserAccount } from '../user/user-account.model';
import { Company } from "../company/company.model";
import { Address } from "../company/address.model";
import { Account } from "../account/account.model";

@Injectable()
export class DatabaseService
{
	public tables: Tables;
	public loadStatus: Subject<boolean>;

	constructor ( private jamDb: JamFirestoreDatabase )
	{
		this.loadStatus = new Subject<boolean>();

		this.jamDb.loadStatus.subscribe( loaded =>
		{
			this.tables = new Tables();
			var tables = this.jamDb.tables;
			tables.forEach( table =>
			{
				this.tables[ table.name ] = table;
			} );
			this.tables.setModels();
			this.loadStatus.next( true );
		} );
	}

	public EnterCollection ( collectionName: keyof Tables, documentKey: string )
	{
		console.log( 'Entering-Collection', collectionName, documentKey );
		this.jamDb.resolvePaths( collectionName, documentKey );
	}

	public ExitCollection ( collectionName: keyof Tables )
	{
		console.log( 'Exiting-Collection', collectionName );
		this.jamDb.resolvePaths( collectionName, '{' + collectionName + '}' );
	}

}

export class Tables
{
	public Temp: Table<IData>;
	public User: Table<User>;
	public UserAccount: Table<UserAccount>;
	public PresetAccount: Table<Account>;
	public Company: Table<Company>;
	public Address: Table<Address>;
	public Account: Table<Account>;

	constructor () { }

	public setModels ()
	{
		this.User.model = User;
		this.UserAccount.model = UserAccount;
		this.PresetAccount.model = Account;
		this.Company.model = Company;
		this.Address.model = Address;
		this.Account.model = Account;
	}
}