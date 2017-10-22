import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Table, JamFirestoreDatabase } from "../../jam-firestore/jam-firestore";
import { Address } from "../models/address.model";
import { Company } from "../models/company.model";

@Injectable()
export class DatabaseService
{
    public tables: Tables;
    public loadStatus: ReplaySubject<boolean>;

	constructor(private db: JamFirestoreDatabase)
	{
        this.db.loadStatus.subscribe( loaded => {
			this.tables = this.db.tables as Tables;
			this.loadStatus.next( true );
		})
	}

}

export class Tables
{
	public Temp: Table<any>;
	public Address: Table<Address>;
	public Company: Table<Company>;
}