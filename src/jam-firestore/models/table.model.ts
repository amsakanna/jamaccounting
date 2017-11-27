import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/take';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { EventManager, EventStatus } from '../../jam-event-manager/jam-event-manager';
import { IData } from './i-data.model';
import { ITable } from './i-table.model';
import { DatabaseOperations } from './database-operations.enum';
import * as firebase from 'firebase/app';

export class Table<T extends IData> implements ITable
{

    public key: string;
    public name: string;
    public path: string;
    public fields: string;
    public db: AngularFirestore;
    private eventManager: EventManager;
    private collection: AngularFirestoreCollection<T>;
    public currentItem: T;
    public model: { new( data: T ): T; };

    constructor ( itable: ITable, db: AngularFirestore, eventManager: EventManager )
    {
        this.db = db;
        this.eventManager = eventManager;
        this.name = itable.name;
        this.path = itable.path;
        this.collection = this.path && this.path.indexOf( '{' ) < 0 ? this.db.collection<T>( this.path ) : null;
    }

    public resolvePath ( collectionName: string, documentKey: string )
    {
        if ( !documentKey ) return;
        this.path = this.path.replace( '{' + collectionName + '}', documentKey );
        this.collection = this.path ? this.db.collection<T>( this.path ) : null;
    }

    private mapToModel ( data: T ): T
    {
        return new this.model( data );
    }

    private mapToModels ( list: Array<T> ): Array<T>
    {
        return list.map( item => this.mapToModel( item ) );
    }

    public get list (): Observable<Array<T>>
    {
        return this.collection.valueChanges().map( list => this.mapToModels( list ) );
    }

    public filter ( searchColumn: string, operator: firebase.firestore.WhereFilterOp, searchKey: any ): Observable<Array<T>>
    {
        return this.db.collection<T>( this.path, ref => ref.where( searchColumn, operator, searchKey ) ).valueChanges().map( list => this.mapToModels( list ) );
    }

    public get ( key: string ): Observable<T>
    {
        console.log( 'get', key );
        const document = this.collection.doc( key ) as AngularFirestoreDocument<T>;
        return document.valueChanges().map( item => this.mapToModel( item ) );
    }

    public static async clone ( sourceTable: Table<any>, targetTable: Table<any>, replace?: boolean ): Promise<boolean>
    {
        console.log( 'clone' );
        console.log( 'sourceTable', sourceTable.path );
        console.log( 'targetTable', targetTable.path );
        const sourceExists = await targetTable.list.map( list => list.length > 0 ).toPromise();
        if ( sourceExists && !replace ) return false;
        const list = await sourceTable.list.toPromise();
        const batch = sourceTable.db.firestore.batch();
        list.forEach( item =>
        {
            const path = targetTable.collection.doc( item.key ).ref;
            console.log( 'path', path );
            batch.set( path, item );
        } );
        console.log( 'committing batch' );
        await batch.commit();
        return true;
    }

    public async lookup ( searchKey: any, searchColumn?: string ): Promise<T>
    {
        console.log( 'lookup', this.path, searchColumn || 'keyColumn', '==', searchKey );
        if ( !searchKey && !searchColumn ) return;
        var result: T;
        if ( searchColumn ) {
            const collection = this.db.collection<T>( this.path, ref => ref.where( searchColumn, '==', searchKey ) );
            result = await collection.valueChanges().map( list => this.mapToModel( list[ 0 ] ) || null ).take( 1 ).toPromise();
        } else {
            const document = this.collection.doc( searchKey ) as AngularFirestoreDocument<T>;
            result = await document.valueChanges().map( item => this.mapToModel( item ) ).take( 1 ).toPromise();
        }
        console.log( 'lookup-result', result );
        return result;
    }

    public async forceLookup ( data: T, searchKey: any = data.key, searchColumn?: string ): Promise<T>
    {
        console.log( 'force-lookup', searchKey, searchColumn, data );
        return await this.lookup( searchKey, searchColumn ) || await this.insert( data );
    }

    public async insert ( data: T ): Promise<T>
    {
        /*  Insert data  */
        console.log( 'insert', data );

        var key: string;
        if ( data.key ) {
            const existingData = await this.lookup( data.key );
            if ( existingData ) return null;
            await this.collection.doc( data.key ).set( data.toObject() );
            key = data.key;
        } else {
            const docRef = await this.collection.add( data.toObject() );
            key = docRef.id;
        }
        console.log( 'data inserted', key );

        /*  Update key  */
        await this.collection.doc( key ).update( { key: key } );

        /*  Fetch and return object  */
        const insertedObject = await this.get( key ).take( 1 ).toPromise();
        console.log( 'hi' );
        insertedObject.key = insertedObject.key || key;
        console.log( 'key updated', insertedObject.key );

        /*  Broadcast  */
        // this.eventManager.emitDatabaseEvent( DatabaseOperations.Insert, EventStatus.Succeeded, this.name, insertedObject );

        return insertedObject;
    }

    public async updateElseInsert ( data: T, searchKey?: string, searchColumn?: string ): Promise<T>
    {
        console.log( 'updateElseInsert', data.toObject() );
        return await this.update( data, searchKey, searchColumn ) || await this.insert( data );
    }

    public async update ( data: T, searchKey?: string, searchColumn?: string ): Promise<T>
    {
        /*  Broadcast  */
        this.eventManager.emitDatabaseEvent( DatabaseOperations.Update, EventStatus.Started, this.name, data );

        /**
         * You can lookup via key or other columns.
         * Lookup via key - data.key
         * Lookup via columns - searchKey.
         */
        console.log( 'update', data );
        searchKey = searchKey || data.key;

        /**
         * Get existing data
         * Exit this function if existing data is not found
         */
        const existingData = await this.lookup( searchKey, searchColumn );
        if ( !existingData ) return null;

        /**
         * If search key was used, we cannot guarantee data key will be present,
         * hence get it from looked up data
         */
        data.key = data.key || existingData.key;

        /*  Update data  */
        await this.collection.doc( existingData.key ).set( data.toObject() );

        /*  Return updated data  */
        const updatedData = await this.get( existingData.key ).take( 1 ).toPromise();
        console.log( 'data updated', updatedData );

        /*  Broadcast and return  */
        this.eventManager.emitDatabaseEvent( DatabaseOperations.Update, EventStatus.Succeeded, this.name, updatedData );
        return updatedData;
    }

    public async updateFields ( data: T, searchKey?: string, searchColumn?: string ): Promise<T>
    {
        /*  Broadcast  */
        this.eventManager.emitDatabaseEvent( DatabaseOperations.Update, EventStatus.Started, this.name, data );

        /**
         * You can lookup via key or other columns.
         * Lookup via key - data.key
         * Lookup via columns - searchKey.
         */
        console.log( 'update-fields', data.toObject() );
        searchKey = searchKey || data.key;

        /**
         * Get existing data
         * If found - continue
         * Else - exit
         */
        const existingData = await this.lookup( searchKey, searchColumn );
        if ( !existingData ) {
            this.eventManager.emitDatabaseEvent( DatabaseOperations.Update, EventStatus.Cancelled, this.name, existingData );
            return null;
        }

        /**
         * Remove empty fields and prepare new object with fields to be updated
         */
        const newRawData = data.toObject();
        newRawData.key = null;
        var newData = {};
        Object.keys( newRawData ).forEach( key => newRawData[ key ] && ( newData[ key ] = newRawData[ key ] ) );

        /*  Update data  */
        try {
            await this.collection.doc( existingData.key ).update( newData );
        } catch ( error ) {
            this.eventManager.emitDatabaseEvent( DatabaseOperations.Update, EventStatus.Failed, this.name, newData );
        }

        /*  Return updated data  */
        const updatedData = await this.get( existingData.key ).take( 1 ).toPromise();
        console.log( 'data updated', updatedData );

        /*  Broadcast and return  */
        // this.eventManager.emitDatabaseEvent( DatabaseOperations.Update, EventStatus.Succeeded, this.name, updatedData );
        return updatedData;
    }

    public async delete ( searchKey: any, searchColumn?: string ): Promise<T>
    {
        /*  Broadcast  */
        this.eventManager.emitDatabaseEvent( DatabaseOperations.Delete, EventStatus.Started, this.name, { searchKey: searchKey, searchColumn: searchColumn } );

        /**
         * Get existing data
         * Exit this function if existing data is not found
         */
        console.log( 'delete', searchColumn, searchKey );
        const existingData = await this.lookup( searchKey, searchColumn );
        if ( !existingData ) {
            // this.eventManager.emitDatabaseEvent( DatabaseOperations.Update, EventStatus.Cancelled, this.name, existingData );
            return null;
        }

        /**
         * Delete data
         */
        try {
            await this.collection.doc( existingData.key ).delete();
        } catch ( error ) {
            this.eventManager.emitDatabaseEvent( DatabaseOperations.Update, EventStatus.Failed, this.name, existingData );
            return null;
        }
        console.log( 'data deleted', existingData );

        /*  Broadcast and return  */
        // this.eventManager.emitDatabaseEvent( DatabaseOperations.Update, EventStatus.Succeeded, this.name, existingData );
        return existingData;
    }

}