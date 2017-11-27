import { Action } from '@ngrx/store';
import { User } from '../../jam-auth/jam-auth';
import { UserAccount } from './user-account.model';

export const enum UserActionTypes
{
	load = '[User] load',
	loaded = '[User] loaded',
	unload = '[User] unload',
	add = '[User] add',
	added = '[User] added',
	addFailed = '[User] addFailed',
	archive = '[User] archive',
	archived = '[User] archived',
	archiveFailed = '[User] archiveFailed'
}
export namespace UserAction
{
	export class Load implements Action { public readonly type = UserActionTypes.load; constructor () { } }
	export class Loaded implements Action { public readonly type = UserActionTypes.loaded; constructor ( public item: UserAccount ) { } }
	export class Unload implements Action { public readonly type = UserActionTypes.unload; constructor () { } }
	export class Add implements Action { public readonly type = UserActionTypes.add; constructor ( public item: UserAccount ) { } }
	export class Added implements Action { public readonly type = UserActionTypes.added; constructor ( public item: UserAccount ) { } }
	export class AddFailed implements Action { public readonly type = UserActionTypes.addFailed; constructor () { } }
	export class Archive implements Action { public readonly type = UserActionTypes.archive; constructor ( public item: UserAccount ) { } }
	export class Archived implements Action { public readonly type = UserActionTypes.archived; constructor ( public item: UserAccount ) { } }
	export class ArchiveFailed implements Action { public readonly type = UserActionTypes.archiveFailed; constructor ( public item: UserAccount ) { } }

	export type All
		= Load
		| Loaded
		| Unload
		| Add
		| Added
		| AddFailed
		| Archive
		| Archived
		| ArchiveFailed
		;
}