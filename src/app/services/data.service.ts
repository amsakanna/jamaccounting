import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Query } from "angularfire2/database/interfaces";
import { Filter, Sort, DatabaseOperation, Status, ErrorCode } from '../app.enum';
import { DataServiceObject } from '../models/data-service-object.model';
import { Error } from '../models/error.model';

@Injectable()
export abstract class DataService<T>
{

	/*-----------------------------------------------------------------------
		VARIABLE-SECTION
	-----------------------------------------------------------------------*/

	private table: FirebaseListObservable<any[]>;
	private dataServiceObject: DataServiceObject;
	protected tableName: string;
	protected foreignKeyName: string;
	protected searchKeyName: string;
	protected abstract createModel(json: any): T;
	protected mapModelToObject(item: T): any
	{
		return item;
	}
   
	/*-----------------------------------------------------------------------
		CRUD
	-----------------------------------------------------------------------*/

	constructor( protected db?: AngularFireDatabase )
	{	
		// var serviceName = this.constructor.name;
		// if( this.serviceList[serviceName] )
		// {
		// 	var service = this.serviceList[serviceName];
		// 	this.tableName = service.tableName;
		// 	this.foreignKeyName = service.foreignKeyName;
		// 	this.searchKeyName = service.searchKeyName;
		// }
		// if( this.tableName )
		// 	this.table = this.db.list( this.tableName );
		// this.dataServiceObject = new DataServiceObject( { operation: null, object: null } );
	}

	getTable() : FirebaseListObservable<any[]>
	{
		return this.table;
	}

	setTable( tableName: string ) : FirebaseListObservable<any[]>
	{
		this.tableName = tableName;
		this.table = this.db.list( this.tableName );
		return this.table;
	}

	insert(object: any) : DataServiceObject
	{
		this.dataServiceObject = new DataServiceObject({operation: DatabaseOperation.Insert, object: object});
		this.dataServiceObject.object.$key = this.table.push(this.dataServiceObject.objectWithoutKey).key;
		return this.dataServiceObject;
	}

	// delete(object: any) : firebase.Promise<any>
	// {
	// 	this.dataServiceObject = new DataServiceObject({operation: DatabaseOperation.Delete, object: object});
	// 	if( ! this.isValidKey(this.dataServiceObject.object.$key))
	// 		return null;
	// 	return this.table.remove( this.dataServiceObject.object.$key )
	// 		.then( data => this.dataServiceObject.status = Status.Success )
	// 		.catch( error => {
	// 			this.dataServiceObject.status = Status.Failure;
	// 			this.dataServiceObject.error = new Error({
	// 				code: ErrorCode.DELETE_FAILED,
	// 				message: error.message, 
	// 				reason: 'Server error', 
	// 				solution: 'Check console log',
	// 				details: error.stack
	// 			});
	// 		});
	// }

	update(object: any) : DataServiceObject
	{
		this.dataServiceObject = new DataServiceObject({operation: DatabaseOperation.Update, object: object});
		if( ! this.isValidKey(this.dataServiceObject.object.$key) )
			return null;
		this.table.update(this.dataServiceObject.object.$key, this.dataServiceObject.objectWithoutKey)
			.then( data => this.dataServiceObject.status = Status.Success )
			.catch( error => {
				this.dataServiceObject.status = Status.Failure;
				this.dataServiceObject.error = new Error({
					code: ErrorCode.UPDATE_FAILED,
					message: error.message, 
					reason: 'Server error', 
					solution: 'Check console log',
					details: error.stack
				});
			});
		return this.dataServiceObject;
	}

	upsert(object: any, lookupValue: string, lookupColumn?: string) : Observable<DataServiceObject>
	{

		Object.keys( object ).forEach( key => {
			object[key] = object[key] ? object[key] : '';
		});

		this.dataServiceObject = new DataServiceObject({
			operation: DatabaseOperation.None,
			object: object
		});

		return this
		.lookup( lookupValue, lookupColumn )
		.map( data => {
			if( data ) {
				this.dataServiceObject.oldObject = data;
				this.dataServiceObject.object.$key = this.dataServiceObject.oldObject.$key;
				return this.update( this.dataServiceObject.object );
			} else {
				return this.insert( this.dataServiceObject.object );
			}
		});
		
	}

	insertIfNew(object: any, lookupValue: string, lookupColumn?: string) : Observable<DataServiceObject>
	{
		this.dataServiceObject = new DataServiceObject({
			operation: DatabaseOperation.None,
			object: object
		});


		return this
		.lookup( lookupValue, lookupColumn )
		.map( data => {
			this.dataServiceObject.object = data;
			if( ! data && this.dataServiceObject.status != Status.Failure )
				this.insert( this.dataServiceObject.object );
			return this.dataServiceObject;
		});

	}

	lookup( lookupValue: string, lookupColumn?: string ) : Observable<T> 
	{
		var dataStream;
		if( ! this.isValidKey( lookupValue ) ) {
			return Observable.of( undefined );
		}
		if( ! lookupColumn ) {
			return this.getObject( lookupValue );
		} else {	
			return this
			.getList( lookupColumn, Filter.EqualTo, lookupValue )
			.take( 1 )
			.map( list => list[0] );
		}
	}

	getObject( key: string ): Observable<T> 
	{
		const dataStream = this.db.object(this.tableName + '/' + key ).take( 1 );
		return this.mapObjectToModel( dataStream );
	}

	getList( sortBy: Sort | string, filterBy: Filter, filterValue?: string ) : Observable<T[]>
	{
		var query = this.prepareQuery( sortBy, filterBy, filterValue );
		const dataStream = this.db.list( this.tableName, { query: query } ).take( 1 );
		return this.mapListToModel( dataStream );
	}

	/*-----------------------------------------------------------------------
		CRUD HELPERS
	-----------------------------------------------------------------------*/

	isValidKey(key: string) : boolean
	{
		if(key !== undefined && key !== null && key !== '') {
			this.dataServiceObject.isValidKey = true;
			this.dataServiceObject.status = Status.Success;
			return true;
		} else {
			this.dataServiceObject.isValidKey = false;
			this.dataServiceObject.status = Status.Failure;
			this.dataServiceObject.error = new Error({code: ErrorCode.KEY_IS_EMPTY, message: 'Key is empty', reason: 'Key not provided', solution: 'Provide a key', details: ''});
			return false;
		}
	}

	private prepareQuery(sortBy: Sort | string, filterBy: Filter, filterValue?: string) : Query
	{

		var query: Query = {};

		switch ( sortBy )
		{
			case Sort.Key:
				query.orderByKey = true;
				break;
			case Sort.Value:
				query.orderByValue = true;
				break;
			case Sort.ForeignKey:
				query.orderByChild = this.foreignKeyName;				
				break; 
			case Sort.SearchKey:
				query.orderByChild = this.searchKeyName;
				break;
			default:
				query.orderByChild = <string>sortBy;
				break;
		} 

		switch ( filterBy ) 
		{
			case Filter.EqualTo: 
				query.equalTo = filterValue;
				break; 
			case Filter.BeginsWith:
				query.startAt = filterValue;
				var firstPart = (filterValue.length == 1) ? "" : filterValue.substr(0, filterValue.length - 1);	
				var lastPart = String.fromCharCode(filterValue.charCodeAt(filterValue.length-1) + 1);
				query.endAt = firstPart + lastPart;
				break;
			default: 
				break;
		}

		return query;

	}

	/*-----------------------------------------------------------------------
		MAP TO MODEL
	-----------------------------------------------------------------------*/

	private mapListToModel( dataStream : Observable<any[]> ) 
	{
		return dataStream.map( list =>
			list.map( object => this.createModel( object ) )
		);
	}

	private mapObjectToModel( dataStream : Observable<any> ) 
	{
		return dataStream.map( object => this.createModel( object ) );
	}

}
