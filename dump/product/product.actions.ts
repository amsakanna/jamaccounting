import { Action } from '@ngrx/store';
import { Product, ProductCategory } from '../model';

export const enum ProductActionTypes
{
	initialize = '[Product] initialize',
	initialized = '[Product] initialized',
	select = '[Product] select',
	selected = '[Product] selected',
	selectFailed = '[Product] selectFailed',
	create = '[Product] create',
	cancelCreate = '[Product] cancelCreate',
	add = '[Product] add',
	added = '[Product] added',
	edit = '[Product] edit',
	cancelEdit = '[Product] cancelEdit',
	modify = '[Product] modify',
	modified = '[Product] modified',
	remove = '[Product] remove',
	removed = '[Product] removed',
	removeFailed = '[Product] removeFailed'
}
export namespace ProductAction
{
	export class Initialize implements Action { public readonly type = ProductActionTypes.initialize; constructor () { } }
	export class Initialized implements Action { public readonly type = ProductActionTypes.initialized; constructor ( public list: Product[], public categoryList: ProductCategory[] ) { } }
	export class Select implements Action { public readonly type = ProductActionTypes.select; constructor ( public key: string = null ) { } }
	export class Selected implements Action { public readonly type = ProductActionTypes.selected; constructor ( public item: Product, public category: ProductCategory ) { } }
	export class SelectFailed implements Action { public readonly type = ProductActionTypes.selectFailed; constructor () { } }
	export class Create implements Action { public readonly type = ProductActionTypes.create; constructor () { } }
	export class CancelCreate implements Action { public readonly type = ProductActionTypes.cancelCreate; constructor () { } }
	export class Add implements Action { public readonly type = ProductActionTypes.add; constructor ( public item: Product ) { } }
	export class Added implements Action { public readonly type = ProductActionTypes.added; constructor ( public item: Product ) { } }
	export class Edit implements Action { public readonly type = ProductActionTypes.edit; constructor ( public item?: Product ) { } }
	export class CancelEdit implements Action { public readonly type = ProductActionTypes.cancelEdit; constructor () { } }
	export class Modify implements Action { public readonly type = ProductActionTypes.modify; constructor ( public item: Product ) { } }
	export class Modified implements Action { public readonly type = ProductActionTypes.modified; constructor ( public item: Product ) { } }
	export class Remove implements Action { public readonly type = ProductActionTypes.remove; constructor ( public key: string ) { } }
	export class Removed implements Action { public readonly type = ProductActionTypes.removed; constructor ( public item: Product ) { } }
	export class RemoveFailed implements Action { public readonly type = ProductActionTypes.removeFailed; constructor () { } }

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