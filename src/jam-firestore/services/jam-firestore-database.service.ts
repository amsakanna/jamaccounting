import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AngularFirestore } from 'angularfire2/firestore';
import { configToken, defaults } from "../jam-firestore.config";
import { IJamFirestoreConfig } from '../models/i-jam-firestore-config.model';
import { ITable } from '../models/i-table.model';
import { Table } from '../models/table.model';
import { IDatabase } from '../models/i-database.model';
import { EventManager } from '../../jam-event-manager/jam-event-manager';
import { IData } from '../models/i-data.model';

@Injectable()
export class JamFirestoreDatabase
{
	public loadStatus: Subject<boolean>;
	public tablesMeta: Array<ITable>
	public tables: Array<Table<IData>>;
	public databasePath: string;

	constructor ( @Inject( configToken ) config: IJamFirestoreConfig,
		private firestore: AngularFirestore,
		private eventManager: EventManager )
	{
		this.loadStatus = new Subject<boolean>();
		this.tables = new Array<Table<IData>>();

		const databaseMetadataPath = config.databaseMetadataPath || defaults.databaseMetadataPath;

		this.firestore.doc<IDatabase>( databaseMetadataPath )
			.valueChanges().take( 1 )
			.switchMap( database =>
			{
				console.log( databaseMetadataPath );
				this.databasePath = database[ 'path' ];
				return this.firestore.collection<ITable>( this.combinePaths( databaseMetadataPath, 'Table' ) )
					.valueChanges().take( 1 )
			} )
			.subscribe( list =>
			{
				this.tablesMeta = list;
				this.tablesMeta.forEach( item =>
				{
					item.path = this.combinePaths( this.databasePath, item.path );
					this.tables.push( new Table<IData>( item, this.firestore, eventManager ) );
				} );
				console.log( this.tablesMeta );
				this.loadStatus.next( true );
			} );
	}

	public resolvePaths ( collectionName: string, documentKey: string )
	{
		this.tables.forEach( table => table.resolvePath( collectionName, documentKey ) );
	}

	private combinePaths ( ...paths: Array<string> ): string
	{
		var combinedPath: string = '';
		paths.forEach( path => combinedPath = combinedPath.concat( path, '/' ) );
		return combinedPath
			.concat( '/' )
			.replace( '//', '/' );
	}

}