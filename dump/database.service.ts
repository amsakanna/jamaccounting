import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AngularFirestore } from 'angularfire2/firestore';
import { configToken, defaults } from "./database.config";
import { DatabaseConfig } from './database-config.model';
import { Data, TableBase } from "../../jam/model-library";
import { concatPaths } from '../../jam/functions';
import { Table } from './table.model';
import { Database } from './database.model';

@Injectable()
export class DatabaseService
{
	public loadStatus: Subject<boolean>;
	public tablesMeta: Array<TableBase>
	public tables: Array<Table<Data>>;
	public databasePath: string;

	constructor ( @Inject( configToken ) config: DatabaseConfig,
		private firestore: AngularFirestore )
	{
		console.log( '------------------database-service constructor' );
		this.loadStatus = new Subject<boolean>();
		this.tables = new Array<Table<Data>>();

		const databaseMetadataPath = config.metadataPath || defaults.databaseMetadataPath;

		this.firestore.doc<Database>( databaseMetadataPath )
			.valueChanges().take( 1 )
			.switchMap( database =>
			{
				this.databasePath = database[ 'path' ];
				return this.firestore.collection<TableBase>( concatPaths( databaseMetadataPath, 'Table' ) )
					.valueChanges().take( 1 )
			} )
			.subscribe( list =>
			{
				this.tablesMeta = list;
				this.tablesMeta.forEach( item =>
				{
					item.path = concatPaths( this.databasePath, item.path );
					this.tables.push( new Table<Data>( this.firestore, item.name, item.path ) );
				} );
				this.loadStatus.next( true );
			} );
	}

	private resolvePaths ( collectionName: string, documentKey: string )
	{
		console.log( '------------------database-service resolvePaths' );
		this.tables.forEach( table => table.resolvePath( collectionName, documentKey ) );
	}

	public enterCollection ( collectionName: string, documentKey: string )
	{
		console.log( '------------------database-service enterCollection' );
		this.resolvePaths( collectionName, documentKey );
	}

	public exitCollection ( collectionName: string )
	{
		console.log( '------------------database-service exitCollection' );
		this.resolvePaths( collectionName, '{' + collectionName + '}' );
	}

}
