import { Action } from "@ngrx/store";
import { Data } from "../../model-library";
import { JamEntityActionTypes } from "./jam-entity-action-types.enum";
import { JamEntityAction } from "./jam-entity-action.model";

export class JamEntityActions<T extends Data>
{

	public get initialize (): string { return this.entityName + this.ifs + JamEntityActionTypes.initialize; };
	public get initialized (): string { return this.entityName + this.ifs + JamEntityActionTypes.initialized; };
	public get select (): string { return this.entityName + this.ifs + JamEntityActionTypes.select; };
	public get selected (): string { return this.entityName + this.ifs + JamEntityActionTypes.selected; };
	public get selectFailed (): string { return this.entityName + this.ifs + JamEntityActionTypes.selectFailed; };
	public get create (): string { return this.entityName + this.ifs + JamEntityActionTypes.create; };
	public get cancelCreate (): string { return this.entityName + this.ifs + JamEntityActionTypes.cancelCreate; };
	public get add (): string { return this.entityName + this.ifs + JamEntityActionTypes.add; };
	public get added (): string { return this.entityName + this.ifs + JamEntityActionTypes.added; };
	public get addFailed (): string { return this.entityName + this.ifs + JamEntityActionTypes.addFailed; };
	public get edit (): string { return this.entityName + this.ifs + JamEntityActionTypes.edit; };
	public get cancelEdit (): string { return this.entityName + this.ifs + JamEntityActionTypes.cancelEdit; };
	public get modify (): string { return this.entityName + this.ifs + JamEntityActionTypes.modify; };
	public get modified (): string { return this.entityName + this.ifs + JamEntityActionTypes.modified; };
	public get modifyFailed (): string { return this.entityName + this.ifs + JamEntityActionTypes.modifyFailed; };
	public get remove (): string { return this.entityName + this.ifs + JamEntityActionTypes.remove; };
	public get removed (): string { return this.entityName + this.ifs + JamEntityActionTypes.removed; };
	public get removeFailed (): string { return this.entityName + this.ifs + JamEntityActionTypes.removeFailed; };

	constructor ( public readonly entityName: string = '', public readonly ifs: string = ' ' ) { }

	public Initialize (): JamEntityAction<T> { return { type: this.initialize }; }
	public Initialized ( list: T[], extras: any = {} ): JamEntityAction<T> { return { type: this.initialized, list: list, ...extras }; };
	public Select ( key?: string ): JamEntityAction<T> { return { type: this.select, key: key }; }
	public Selected ( item: T, extras: any = {} ): JamEntityAction<T> { return { type: this.selected, item: item, ...extras }; }
	public SelectFailed (): JamEntityAction<T> { return { type: this.selectFailed }; }
	public Create (): JamEntityAction<T> { return { type: this.create }; }
	public CancelCreate (): JamEntityAction<T> { return { type: this.cancelCreate }; }
	public Add ( item: T ): JamEntityAction<T> { return { type: this.add, item: item }; }
	public Added ( item: T ): JamEntityAction<T> { return { type: this.added, item: item }; }
	public AddFailed (): JamEntityAction<T> { return { type: this.addFailed }; }
	public Edit ( item: T ): JamEntityAction<T> { return { type: this.edit, item: item }; }
	public CancelEdit (): JamEntityAction<T> { return { type: this.cancelEdit }; }
	public Modify ( item: T ): JamEntityAction<T> { return { type: this.modify, item: item }; }
	public Modified ( item: T ): JamEntityAction<T> { return { type: this.modified, item: item }; }
	public ModifyFailed (): JamEntityAction<T> { return { type: this.modifyFailed }; }
	public Remove ( key: string ): JamEntityAction<T> { return { type: this.remove, key: key }; }
	public Removed ( item: T ): JamEntityAction<T> { return { type: this.removed, item: item }; }
	public RemoveFailed (): JamEntityAction<T> { return { type: this.removeFailed }; }

}
