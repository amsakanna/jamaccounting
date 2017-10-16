import { Injectable, Inject } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AngularFirestore } from 'angularfire2/firestore';

import {
    IJamFireStoreConfig,
    configToken,
    Table,
    ITable
} from '../jam-firestore';

interface ILooseObject {
    [key: string]: any
}

@Injectable()
export class JamFirestoreDatabase
{
	public loadStatus: ReplaySubject<boolean>;
	public tables: ILooseObject;

    constructor(@Inject(configToken) config: IJamFireStoreConfig,
                private db: AngularFirestore)
	{
        this.loadStatus = new ReplaySubject<boolean>();
        this.tables = {};

		this.db.collection<ITable>('Metadata/database/Table')
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