import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Global } from "../app.global";

export interface ITable
{
    key: string;
    name: string;
    path: string;
}

export class Table<T> implements ITable
{

    public key: string;
    public name: string;
    public path: string;
    public fields: string;
    private db: AngularFirestore;
    private collection: AngularFirestoreCollection<T>;
    
    constructor( itable: ITable )
    {
        this.db = Global.db;
        this.construct( itable );
    }

    public construct( itable: ITable )
    {
        this.name = itable.name;
        this.path = itable.path;
		this.collection = ( this.path && this.name ) ? this.db.collection( this.path + this.name ) : null;
    }

    public get list() : Observable<Array<T>>
	{
		return this.collection.valueChanges();
	}
    
}
