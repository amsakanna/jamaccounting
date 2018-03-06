import { FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";
import { buildModelFromForm } from "../../functions";
import { JamEntityState } from "./jam-entity.state";
import { JamEntityActions } from "./jam-entity.actions";
import { Subscription } from "rxjs";

export class JamEntityService<T, S extends JamEntityState<T> = JamEntityState<T>, AS extends JamEntityActions<T> = JamEntityActions<T>> implements JamEntityState<T>
{

	public initialized: boolean;
	public list: T[];
	public form: FormGroup;
	public processing: boolean;
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
	public defaultItemKey: string;
	public selectedItemKey: string;
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

	public subscribedProperties: ( keyof S )[];
	private subscriptionList: Subscription[];

	constructor ( public store: Store<S>, public actions: AS )
	{
		this.subscribedProperties = [];
		this.subscriptionList = [];
		this.subscribeProperty( 'creating' );
	}

	public subscribeProperties ( ...subscribables: ( keyof S )[] )
	{
		subscribables.forEach( property => this.subscribeProperty( property ) );
	}

	public subscribeProperty ( property: keyof S ): boolean
	{
		if ( this.subscribedProperties.includes( property ) ) {
			return false;
		} else {
			const newSubscription = this.store.select( property ).subscribe( value => this[ property as string ] = value );
			this.subscribedProperties.push( property );
			this.subscriptionList.push( newSubscription );
			return true;
		}
	}

	public unsubscribeAll (): void
	{
		this.subscriptionList.forEach( item => item.unsubscribe() );
	}

	public select ( item: T, keyColumn: string = 'key' ): void
	{
		this.store.dispatch( this.actions.Select( item[ keyColumn ] ) );
	}

	public create (): void
	{
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

	public reset (): void
	{
		this.form.reset();
	}

	public compareFn = ( listItem: any, selectedItem: any ) =>
	{
		return selectedItem && listItem.key === selectedItem.key;
	}

}
