import { Action } from "@ngrx/store";
import { JamEntityActionTypes } from "./jam-entity-action-types.enum";
import { JamEntityAction } from "./jam-entity-action.model";

export class JamEntityActions<T>
{

	constructor ( public readonly actionPrefix: string = '', public readonly ifs: string = ' ' ) { }

	public get initialize (): string { return this.actionPrefix + this.ifs + JamEntityActionTypes.initialize; };
	public get initialized (): string { return this.actionPrefix + this.ifs + JamEntityActionTypes.initialized; };
	public get select (): string { return this.actionPrefix + this.ifs + JamEntityActionTypes.select; };
	public get selected (): string { return this.actionPrefix + this.ifs + JamEntityActionTypes.selected; };
	public get selectFailed (): string { return this.actionPrefix + this.ifs + JamEntityActionTypes.selectFailed; };
	public get create (): string { return this.actionPrefix + this.ifs + JamEntityActionTypes.create; };
	public get cancelCreate (): string { return this.actionPrefix + this.ifs + JamEntityActionTypes.cancelCreate; };
	public get add (): string { return this.actionPrefix + this.ifs + JamEntityActionTypes.add; };
	public get added (): string { return this.actionPrefix + this.ifs + JamEntityActionTypes.added; };
	public get addFailed (): string { return this.actionPrefix + this.ifs + JamEntityActionTypes.addFailed; };
	public get edit (): string { return this.actionPrefix + this.ifs + JamEntityActionTypes.edit; };
	public get cancelEdit (): string { return this.actionPrefix + this.ifs + JamEntityActionTypes.cancelEdit; };
	public get modify (): string { return this.actionPrefix + this.ifs + JamEntityActionTypes.modify; };
	public get modified (): string { return this.actionPrefix + this.ifs + JamEntityActionTypes.modified; };
	public get modifyFailed (): string { return this.actionPrefix + this.ifs + JamEntityActionTypes.modifyFailed; };
	public get remove (): string { return this.actionPrefix + this.ifs + JamEntityActionTypes.remove; };
	public get removed (): string { return this.actionPrefix + this.ifs + JamEntityActionTypes.removed; };
	public get removeFailed (): string { return this.actionPrefix + this.ifs + JamEntityActionTypes.removeFailed; };

	public Initialize (): JamEntityAction<T> { return { type: this.initialize }; }
	public Initialized ( list: T[], extras: any = {}, defaultItem: T = null ): JamEntityAction<T> { return { type: this.initialized, list: list, extras: extras, defaultItem: defaultItem }; };
	public Select ( key?: string ): JamEntityAction<T> { return { type: this.select, key: key }; }
	public Selected ( item: T, extras: any = {} ): JamEntityAction<T> { return { type: this.selected, item: item, extras: extras }; }
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
