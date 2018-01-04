import { Data } from "../../../jam/model-library";

export interface JamEntityState<T extends Data = Data>
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
	itemBeingRemovedIndex: number;

	lastAddedItem: T;
	lastModifiedItem: T;
	lastRemovedItem: T;
	lastRemovedItemIndex: number;
}