import { Injectable, Inject } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AngularFirestore } from 'angularfire2/firestore';

import { configToken, defaults } from "../jam-firestore.config";
import { Table, ITable } from '../models/table.model';
import { IJamFirestoreConfig } from '../models/i-jam-firestore-config.model';

interface ILooseObject {
    [key: string]: any
}

@Injectable()
export class JamFirestoreDatabase
{
	public loadStatus: ReplaySubject<boolean>;
	public tables: ILooseObject;

    constructor(@Inject(configToken) config: IJamFirestoreConfig,
                private db: AngularFirestore)
	{
        this.loadStatus = new ReplaySubject<boolean>();
		this.tables = {};
		const databaseMetadataPath = config.databaseMetadataPath || defaults.databaseMetadataPath;

		this.db.collection<ITable>( databaseMetadataPath )
		.valueChanges()
		.subscribe( list => {
			this.initializeTables( list );
			this.loadStatus.next( true );
		});
	}

	private initializeTables( list: Array<ITable> )
	{
		list.forEach( item => {
			this.tables[item.key] = new Table( item, this.db );
		});
	}

}