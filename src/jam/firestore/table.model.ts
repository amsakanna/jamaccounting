import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/take';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Data, TableBase } from "../../jam/model-library";
import * as firebase from 'firebase/app';

export class Table<T extends Data> implements TableBase
{

    public key: string;
    public name: string;
    public path: string;
    // public model: { new( data: T ): T; };
    private collection: AngularFirestoreCollection<T>;

    constructor ( public db: AngularFirestore, name: string, path: string )
    {
        this.name = name || '';
        this.path = path || '';
        this.collection = this.pathValid ? this.db.collection<T>( this.path ) : null;
    }

    public get active (): boolean
    {
        return !!this.collection;
    }

    private get pathValid (): boolean
    {
        return ( this.path && this.path.indexOf( '{' ) < 0 );
    }

    public resolvePath ( collectionName: string, documentKey: string ): void
    {
        if ( !documentKey ) return;
        // console.log( 'replacing ' + '{' + collectionName + '}' + ' with ' + documentKey );
        this.path = this.path.replace( '{' + collectionName + '}', documentKey );
        // console.log( 'after replacing ' + this.path );
        this.collection = this.pathValid ? this.db.collection<T>( this.path ) : null;
    }

    // private mapToModel ( data: T ): T
    // {
    //     return new this.model( data );
    // }

    // private mapToModels ( list: Array<T> ): Array<T>
    // {
    //     return list.map( item => this.mapToModel( item ) );
    // }

    public get list (): Observable<Array<T>>
    {
        console.log( this );
        return this.collection.valueChanges()
        // .map( list => this.mapToModels( list ) );
    }

    public filter ( searchColumn: string, operator: firebase.firestore.WhereFilterOp, searchKey: any ): Observable<Array<T>>
    {
        return this.db.collection<T>( this.path, ref => ref.where( searchColumn, operator, searchKey ) ).valueChanges()
        // .map( list => this.mapToModels( list ) );
    }

    public get ( key: string ): Observable<T>
    {
        console.log( 'get', key );
        return key ? this.collection.doc<T>( key ).valueChanges() : Observable.of( null );
        // .map( item => this.mapToModel( item ) );
    }

    public getMany ( keys: string[] ): Observable<T[]>
    {
        console.log( 'getMany', keys );
        const item$s = keys
            .map( key => this.collection.doc<T>( key ).valueChanges() );
        // .map( item => this.mapToModel( item ) ) )
        return Observable.merge( ...item$s ).toArray();
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
        return searchColumn
            ? this.db.collection<T>( this.path, ref => ref.where( searchColumn, '==', searchKey ) ).valueChanges()
                // .map( list => this.mapToModel( list[ 0 ] ) || null )
                .map( list => list[ 0 ] || null )
                .take( 1 ).toPromise()
            : this.get( searchKey )
                .take( 1 ).toPromise();
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
            await this.collection.doc( data.key ).set( data/*.toObject()*/ );
            key = data.key;
        } else {
            const docRef = await this.collection.add( data/*.toObject()*/ );
            key = docRef.id;
        }
        console.log( 'data inserted', key );

        /*  Update key  */
        await this.collection.doc( key ).update( { key: key } );

        /*  Fetch and return object  */
        const insertedObject = await this.get( key ).take( 1 ).toPromise();
        insertedObject.key = insertedObject.key || key;
        console.log( 'key updated', insertedObject.key );

        return insertedObject;
    }

    public async updateElseInsert ( data: T, searchKey?: string, searchColumn?: string ): Promise<T>
    {
        console.log( 'updateElseInsert', data/*.toObject()*/ );
        return await this.update( data, searchKey, searchColumn ) || await this.insert( data );
    }

    public async update ( data: T, searchKey?: string, searchColumn?: string ): Promise<T>
    {
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
        await this.collection.doc( existingData.key ).set( data/*.toObject()*/ );

        /*  Return updated data  */
        const updatedData = await this.get( existingData.key ).take( 1 ).toPromise();
        console.log( 'data updated', updatedData );

        return updatedData;
    }

    public async updateFields ( data: T, searchKey?: string, searchColumn?: string ): Promise<T>
    {
        /**
         * You can lookup via key or other columns.
         * Lookup via key - data.key
         * Lookup via columns - searchKey.
         */
        console.log( 'update-fields', data/*.toObject()*/ );
        searchKey = searchKey || data.key;

        /**
         * Get existing data
         * If found - continue
         * Else - exit
         */
        const existingData = await this.lookup( searchKey, searchColumn );
        if ( !existingData ) {
            return null;
        }

        /**
         * Remove empty fields and prepare new object with fields to be updated
         */
        const newRawData = data/*.toObject()*/;
        newRawData.key = null;
        var newData = {};
        Object.keys( newRawData ).forEach( key => newRawData[ key ] && ( newData[ key ] = newRawData[ key ] ) );

        /*  Update data  */
        try {
            await this.collection.doc( existingData.key ).update( newData );
        } catch ( error ) {
        }

        /*  Return updated data  */
        const updatedData = await this.get( existingData.key ).take( 1 ).toPromise();
        console.log( 'data updated', updatedData );

        return updatedData;
    }

    public async remove ( searchKey: any, searchColumn?: string ): Promise<T>
    {

        if ( !searchKey ) return null;
        /**
         * Get existing data
         * Exit this function if existing data is not found
         */
        console.log( 'delete', searchColumn, searchKey );
        const existingData = await this.lookup( searchKey, searchColumn );
        if ( !existingData ) {
            return null;
        }

        /**
         * Delete data
         */
        try {
            await this.collection.doc( existingData.key ).delete();
        } catch ( error ) {
            return null;
        }
        console.log( 'data deleted', existingData );

        return existingData;
    }

}
