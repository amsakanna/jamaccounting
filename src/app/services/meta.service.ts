import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Tables } from '../models/tables.model';
// import { ITable, Table } from '../models/table.model';
import { Global } from '../app.global';
import { JamFirestoreDatabase, Table } from "../../jam-firestore/jam-firestore";


@Injectable()
export class DatabaseMetaService
{
	public loadStatus: ReplaySubject<boolean>;
	public tables: Tables;

	constructor(private db: JamFirestoreDatabase,)
	{
		this.loadStatus = new ReplaySubject<boolean>();
		this.loadStatus.next( true );
		// Global.db = this.db;
		// this.db.collection<ITable>('Metadata/database/Table')
		// .valueChanges()
		// .subscribe( list => {
		// 	this.initializeTables( list );
		// 	this.loadStatus.next( true );
		// });
		this.tables.Company.list.subscribe( list => {
			console.log( 'companies', list );
		})
	}

	// private initializeTables( list: Array<ITable> )
	// {
	// 	this.tables = new Tables();
	// 	list.forEach( item => {
	// 		this.tables[item.key] = new Table( item );
	// 	});
	// }

}