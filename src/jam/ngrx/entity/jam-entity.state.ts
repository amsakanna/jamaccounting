import { FormGroup } from "@angular/forms";
import { Data } from "../../../jam/model-library";

export interface JamEntityState<T extends Data = Data>
{
	initialized: boolean;

	list: T[];
	form: FormGroup;

	processing: boolean;
	loading: boolean;
	creating: boolean;
	editing: boolean;
	adding: boolean;
	modifying: boolean;
	removing: boolean;

	defaultItem: T;
	selectedItem: T;
	emptyItem: T;
	formItem: T;

	defaultItemKey: string;
	selectedItemKey: string;

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
