import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Table, ITable } from '../models/table.model';
import { Address } from '../models/address.model';
import { Company } from '../models/company.model';
import { Global } from '../app.global';

@Injectable()
export class DatabaseService
{
	public tables: {
		Temp: Table<any>,
		Address: Table<Address>,
		Company: Table<Company>
	};

	constructor(private db: AngularFirestore)
	{
		Global.db = this.db;
		this.initializeTables();
	}

	initializeTables()
	{
		const dummyTable: ITable = { key: '', name: '', path: '' }
		this.tables = {
			Temp: new Table<any>( dummyTable ),
			Address: new Table<Address>( dummyTable ),
			Company: new Table<Company>( dummyTable )
		};
	}

}
