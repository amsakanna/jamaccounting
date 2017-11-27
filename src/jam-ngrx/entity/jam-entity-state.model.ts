import { IData } from '../../jam-firestore/models/i-data.model';

export interface JamEntityState<T extends IData>
{
	initialized: boolean;

	list: T[];

	loading: boolean;
	creating: boolean;
	editing: boolean;
	adding: boolean;
	modifying: boolean;
	removing: boolean;

	defaultItem: T;
	selectedItem: T;

	itemBeingSelectedKey: string;
	itemBeingCreated: T;
	itemBeingEdited: T;
	itemBeingAdded: T;
	itemBeingModified: T;
	itemBeingRemovedKey: string;

	lastAddedItem: T;
	lastModifiedItem: T;
	lastRemovedItem: T;
}