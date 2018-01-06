import { FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Data } from "../../model-library";
import { buildModelFromForm } from "../../functions";
import { JamEntityState } from "./jam-entity.state";
import { JamEntityActions } from "./jam-entity.actions";

export class JamEntityService<T extends Data, S> implements JamEntityState<T>
{

	public initialized: boolean;
	public list: T[];
	public form: FormGroup;
	public loading: boolean;
	public creating: boolean;
	public editing: boolean;
	public adding: boolean;
	public modifying: boolean;
	public removing: boolean;
	public defaultItem: T;
	public selectedItem: T;
	public emptyItem: T;
	public formItem: T;
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

	public store: Store<S>;

	constructor ( public stateName: string, public actions: JamEntityActions<T> ) { }

	public subscribeProperties ( subscribables: ( keyof JamEntityState<T> )[] = [] )
	{
		subscribables.forEach( property => this.subscribeProperty( property ) );
	}

	public subscribeProperty ( property: string )
	{
		this.store.select( this.stateName as keyof S, property as keyof S[ keyof S ] )
			.subscribe( value => this[ property ] = value );
	}

	public checkAndSelect ( key: string ): void
	{
		if ( !this.selectedItem || this.selectedItem.key != key ) {
			this.store.dispatch( this.actions.Select( key ) )
		}
	}

	public select ( item: T ): void
	{
		this.store.dispatch( this.actions.Select( item.key ) );
	}

	public create (): void
	{
		console.log( this );
		this.store.dispatch( this.actions.Create() );
	}

	public edit ( item: T ): void
	{
		this.store.dispatch( this.actions.Edit( item ) );
	}

	public remove ( key: string ): void
	{
		this.store.dispatch( this.actions.Remove( key ) );
	}

	public submit ( item?: T ): void
	{
		item = item || buildModelFromForm( this.formItem, this.form );
		this.creating
			? this.store.dispatch( this.actions.Add( item ) )
			: this.store.dispatch( this.actions.Modify( item ) );
	}

	public cancel (): void
	{
		this.creating
			? this.store.dispatch( this.actions.CancelCreate() )
			: this.store.dispatch( this.actions.CancelEdit() );
	}

}