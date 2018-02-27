import { Action } from '@ngrx/store';
import { Inventory, Product, ProductCategory, Tax } from '../model';

export const enum InventoryActionTypes
{
	initialize = '[Inventory] initialize',
	initialized = '[Inventory] initialized',
	select = '[Inventory] select',
	selected = '[Inventory] selected',
	selectFailed = '[Inventory] selectFailed',
	create = '[Inventory] create',
	cancelCreate = '[Inventory] cancelCreate',
	add = '[Inventory] add',
	added = '[Inventory] added',
	edit = '[Inventory] edit',
	cancelEdit = '[Inventory] cancelEdit',
	modify = '[Inventory] modify',
	modified = '[Inventory] modified',
	remove = '[Inventory] remove',
	removed = '[Inventory] removed',
	removeFailed = '[Inventory] removeFailed',
}
export namespace InventoryAction
{
	export class Initialize implements Action { public readonly type = InventoryActionTypes.initialize; constructor () { } }
	export class Initialized implements Action { public readonly type = InventoryActionTypes.initialized; constructor ( public list: Inventory[], public taxList: Tax[] ) { } }
	export class Select implements Action { public readonly type = InventoryActionTypes.select; constructor ( public key: string = null ) { } }
	export class Selected implements Action { public readonly type = InventoryActionTypes.selected; constructor ( public item: Inventory, public product: Product, public category: ProductCategory ) { } }
	export class SelectFailed implements Action { public readonly type = InventoryActionTypes.selectFailed; constructor () { } }
	export class Create implements Action { public readonly type = InventoryActionTypes.create; constructor () { } }
	export class CancelCreate implements Action { public readonly type = InventoryActionTypes.cancelCreate; constructor () { } }
	export class Add implements Action { public readonly type = InventoryActionTypes.add; constructor ( public item: Inventory ) { } }
	export class Added implements Action { public readonly type = InventoryActionTypes.added; constructor ( public item: Inventory ) { } }
	export class Edit implements Action { public readonly type = InventoryActionTypes.edit; constructor ( public item?: Inventory ) { } }
	export class CancelEdit implements Action { public readonly type = InventoryActionTypes.cancelEdit; constructor () { } }
	export class Modify implements Action { public readonly type = InventoryActionTypes.modify; constructor ( public item: Inventory ) { } }
	export class Modified implements Action { public readonly type = InventoryActionTypes.modified; constructor ( public item: Inventory ) { } }
	export class Remove implements Action { public readonly type = InventoryActionTypes.remove; constructor ( public key: string ) { } }
	export class Removed implements Action { public readonly type = InventoryActionTypes.removed; constructor ( public item: Inventory ) { } }
	export class RemoveFailed implements Action { public readonly type = InventoryActionTypes.removeFailed; constructor () { } }

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
		| RemoveFailed
		;
}