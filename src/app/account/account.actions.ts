import { Action } from '@ngrx/store';
import { Account } from './account.model';
import { FlatTree } from '../../jam-model-library/jam-model-library';

export const enum AccountActionTypes
{
	initialize = '[Account] initialize',
	initialized = '[Account] initialized',
	select = '[Account] select',
	selected = '[Account] selected',
	selectFailed = '[Account] selectFailed',
	create = '[Account] create',
	cancelCreate = '[Account] cancelCreate',
	add = '[Account] add',
	added = '[Account] added',
	edit = '[Account] edit',
	cancelEdit = '[Account] cancelEdit',
	modify = '[Account] modify',
	modified = '[Account] modified',
	remove = '[Account] remove',
	removed = '[Account] removed',
}
export namespace AccountAction
{
	export class Initialize implements Action { public readonly type = AccountActionTypes.initialize; constructor () { } }
	export class Initialized implements Action { public readonly type = AccountActionTypes.initialized; constructor ( public list: Account[], public defaultItem: Account, public tree: FlatTree<Account> ) { } }
	export class Select implements Action { public readonly type = AccountActionTypes.select; constructor ( public key: string = null ) { } }
	export class Selected implements Action { public readonly type = AccountActionTypes.selected; constructor ( public item: Account ) { } }
	export class SelectFailed implements Action { public readonly type = AccountActionTypes.selectFailed; constructor () { } }
	export class Create implements Action { public readonly type = AccountActionTypes.create; constructor () { } }
	export class CancelCreate implements Action { public readonly type = AccountActionTypes.cancelCreate; constructor () { } }
	export class Add implements Action { public readonly type = AccountActionTypes.add; constructor ( public item: Account ) { } }
	export class Added implements Action { public readonly type = AccountActionTypes.added; constructor ( public item: Account ) { } }
	export class Edit implements Action { public readonly type = AccountActionTypes.edit; constructor ( public item?: Account ) { } }
	export class CancelEdit implements Action { public readonly type = AccountActionTypes.cancelEdit; constructor () { } }
	export class Modify implements Action { public readonly type = AccountActionTypes.modify; constructor ( public item: Account ) { } }
	export class Modified implements Action { public readonly type = AccountActionTypes.modified; constructor ( public item: Account ) { } }
	export class Remove implements Action { public readonly type = AccountActionTypes.remove; constructor ( public key: string ) { } }
	export class Removed implements Action { public readonly type = AccountActionTypes.removed; constructor ( public item: Account ) { } }

	export type All
		= Initialize
		| Initialized
		| Select
		| Selected
		| SelectFailed
		| Create
		| CancelCreate
		| Add
		| Added
		| Edit
		| CancelEdit
		| Modify
		| Modified
		| Remove
		| Removed
		;
}