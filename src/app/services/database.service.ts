import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Table, JamFirestoreDatabase } from "../../jam-firestore/jam-firestore";
import { AuthService, User } from '../../jam-auth/jam-auth';
import { Address } from "../models/address.model";
import { Company } from "../models/company.model";
import { Account } from "../models/account.model";
import { EventManager, EventTypes, Events, EventStatus, AuthEvent } from '../../jam-event-manager/jam-event-manager';
import { UserAccount } from '../models/user-account.model';
import { IData } from '../../jam-firestore/jam-firestore';

@Injectable()
export class DatabaseService
{
    public tables: Tables;
    public loadStatus: Subject<boolean>;

	constructor(private jamDb: JamFirestoreDatabase,
				private authService: AuthService,
				private eventManager: EventManager)
	{
		this.loadStatus = new Subject<boolean>();

        this.jamDb.loadStatus.subscribe( loaded => {
			this.tables = new Tables();
			var tables = this.jamDb.tables;
			tables.forEach( table => {
				this.tables[ table.name ] = table;
			});
			this.tables.setModels();
			this.loadStatus.next( true );
		});
	}

	public EnterCollection( collectionName: string, documentKey: string )
	{
		console.log( 'Entering-Collection', collectionName, documentKey );
		this.jamDb.resolvePaths( collectionName, documentKey );
	}

	public ExitCollection( collectionName: string )
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

	constructor() {}

	public setModels()
	{
		this.User.model = User;
		this.UserAccount.model = UserAccount;
		this.PresetAccount.model = Account;
		this.Company.model = Company;
		this.Address.model = Address;
		this.Account.model = Account;
	}
}