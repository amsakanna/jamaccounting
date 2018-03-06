import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/take';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Data, TableBase } from "../../jam/model-library";
import * as firebase from 'firebase/app';
import { filterObject } from '../functions/filter-object.function';

export class Table<T extends Data> implements TableBase
{

    public key: string;
    public name: string;
    public path: string;
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
        this.path = this.path.replace( '{' + collectionName + '}', documentKey );
        this.collection = this.pathValid ? this.db.collection<T>( this.path ) : null;
    }

    public get join (): Observable<Array<T>>
    {
        return this.collection.valueChanges();
    }

    public get list (): Observable<Array<T>>
    {
        return this.collection.valueChanges();
    }

    public filter ( searchColumn: string, operator: firebase.firestore.WhereFilterOp, searchKey: any ): Observable<Array<T>>
    {
        return this.db.collection<T>( this.path, ref => ref.where( searchColumn, operator, searchKey ) ).valueChanges()
    }

    public get ( key: string ): Observable<T>
    {
        console.log( 'get', key );
        return key ? this.collection.doc<T>( key ).valueChanges() : Observable.of( null );
    }

    public getMany ( keys: string[] ): Observable<T[]>
    {
        console.log( 'getMany', keys );
        const item$s = keys
            .map( key => this.collection.doc<T>( key ).valueChanges() );
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

    public removeVmColumns ( data: T ): Partial<T>
    {
        return filterObject<T>( data, ( data, column ) =>
        {
            if ( data[ column + 'Key' ] !== undefined )
                console.log( 'Removing', column, 'because it has a counterpart key column' );
            if ( column.endsWith( '$' ) )
                console.log( 'Removing', column, 'because it ends with $' );

            return ( data[ column + 'Key' ] === undefined ) && !( column.endsWith( '$' ) );
        } );
    }

    public async insert ( data: T ): Promise<T>
    {
        if ( !data ) return null;

        console.log( 'insert-pre', this.removeVmColumns( data ) );
        data = this.removeVmColumns( data ) as T;
        console.log( 'insert', data );

        /*  Insert data  */
        var key: string;
        if ( data.key ) {
            const existingData = await this.lookup( data.key );
            if ( existingData ) return null;
            await this.collection.doc( data.key ).set( data );
            key = data.key;
        } else {
            const docRef = await this.collection.add( data );
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

    public async update ( data: T, searchKey?: string, searchColumn?: string ): Promise<T>
    {
        if ( !data ) return null;
        /**
         * You can lookup via key or other columns.
         * Lookup via key - data.key
         * Lookup via columns - searchKey.
         */
        data = this.removeVmColumns( data ) as T;
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
        await this.collection.doc( existingData.key ).set( data );

        /*  Return updated data  */
        const updatedData = await this.get( existingData.key ).take( 1 ).toPromise();
        console.log( 'data updated', updatedData );

        return updatedData;
    }

    public async updateElseInsert ( data: T, searchKey?: string, searchColumn?: string ): Promise<T>
    {
        console.log( 'updateElseInsert', data );
        return await this.update( data, searchKey, searchColumn ) || await this.insert( data );
    }

    public async updateFields ( data: T, searchKey?: string, searchColumn?: string ): Promise<T>
    {
        if ( !data ) return null;
        /**
         * You can lookup via key or other columns.
         * Lookup via key - data.key
         * Lookup via columns - searchKey.
         */
        data = this.removeVmColumns( data ) as T;
        console.log( 'update-fields', data );
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
        var newData = { key: null };
        Object.keys( data ).forEach( key => data[ key ] !== null && ( newData[ key ] = data[ key ] ) );

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

    public async remove ( searchKey: any, searchColumn?: keyof T ): Promise<T>
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
