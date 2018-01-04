import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { Observabled, Data } from "../../model-library";
import { JamEntityState } from "./jam-entity.state";
import { JamEntityActions } from "../index";

export class JamEntityService<T extends Data, S extends JamEntityState<T>> implements Observabled<JamEntityState<T>>
{

	public readonly initialized: Observable<boolean>;
	public readonly list: Observable<T[]>;
	public readonly loading: Observable<boolean>;
	public readonly creating: Observable<boolean>;
	public readonly editing: Observable<boolean>;
	public readonly adding: Observable<boolean>;
	public readonly modifying: Observable<boolean>;
	public readonly removing: Observable<boolean>;
	public readonly defaultItem: Observable<T>;
	public readonly selectedItem: Observable<T>;
	public readonly itemBeingSelectedKey: Observable<string>;
	public readonly itemBeingCreated: Observable<T>;
	public readonly itemBeingEdited: Observable<T>;
	public readonly itemBeingAdded: Observable<T>;
	public readonly itemBeingModified: Observable<T>;
	public readonly itemBeingRemovedKey: Observable<string>;
	public readonly itemBeingRemovedIndex: Observable<number>;
	public readonly lastAddedItem: Observable<T>;
	public readonly lastModifiedItem: Observable<T>;
	public readonly lastRemovedItem: Observable<T>;
	public readonly lastRemovedItemIndex: Observable<number>;

	constructor ( public store: Store<S>, public actions: JamEntityActions<T> )
	{
		Object.keys( this ).forEach( property => this[ property ] = this.store.select( property as keyof JamEntityState<T> ) );
	}

	public select ( item: T ): void
	{
		this.store.dispatch( this.actions.Select( item.key ) );
	}

}