import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { JamEntityState } from "../../jam/ngrx";
import { Data } from "../../jam/model-library";

@Injectable()
export class NgrxService<T extends Data, S extends JamEntityState<T>> implements JamEntityState<T>
{
	public initialized: boolean;
	public list: T[];
	public loading: boolean;
	public creating: boolean;
	public editing: boolean;
	public adding: boolean;
	public modifying: boolean;
	public removing: boolean;
	public defaultItem: T;
	public selectedItem: T;
	public itemBeingSelectedKey: string;
	public itemBeingCreated: T;
	public itemBeingEdited: T;
	public itemBeingAdded: T;
	public itemBeingModified: T;
	public itemBeingRemovedKey: string;
	public itemBeingRemovedIndex: number;
	public lastAddedItem: T;
	public lastModifiedItem: T;
	public lastRemovedItem: T;
	public lastRemovedItemIndex: number;

	constructor (
		public store: Store<S>,
		public actions: any
	)
	{
		this.storeSelect( 'list' );
		this.storeSelect( 'selectedItem' );
		this.storeSelect( 'loading' );
		this.storeSelect( 'creating' );
		this.storeSelect( 'adding' );
		this.storeSelect( 'modifying' );
	}

	private storeSelect ( key: keyof S, onSubscribe?: ( value: any ) => void ): void
	{
		this.store.select( key )
			.map( value => this[ key as string ] = value )
			.subscribe( onSubscribe );
	}
}