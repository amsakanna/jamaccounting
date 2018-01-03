import { Action } from '@ngrx/store';
import { ProductCategory } from '../model';

export const enum ProductCategoryActionTypes
{
	initialize = '[ProductCategory] initialize',
	initialized = '[ProductCategory] initialized',
	select = '[ProductCategory] select',
	selected = '[ProductCategory] selected',
	selectFailed = '[ProductCategory] selectFailed',
	create = '[ProductCategory] create',
	cancelCreate = '[ProductCategory] cancelCreate',
	add = '[ProductCategory] add',
	added = '[ProductCategory] added',
	edit = '[ProductCategory] edit',
	cancelEdit = '[ProductCategory] cancelEdit',
	modify = '[ProductCategory] modify',
	modified = '[ProductCategory] modified',
	remove = '[ProductCategory] remove',
	removed = '[ProductCategory] removed',
	removeFailed = '[ProductCategory] removeFailed',
}
export namespace ProductCategoryAction
{
	export class Initialize implements Action { public readonly type = ProductCategoryActionTypes.initialize; constructor () { } }
	export class Initialized implements Action { public readonly type = ProductCategoryActionTypes.initialized; constructor ( public list: ProductCategory[] ) { } }
	export class Select implements Action { public readonly type = ProductCategoryActionTypes.select; constructor ( public key: string = null ) { } }
	export class Selected implements Action { public readonly type = ProductCategoryActionTypes.selected; constructor ( public item: ProductCategory ) { } }
	export class SelectFailed implements Action { public readonly type = ProductCategoryActionTypes.selectFailed; constructor () { } }
	export class Create implements Action { public readonly type = ProductCategoryActionTypes.create; constructor () { } }
	export class CancelCreate implements Action { public readonly type = ProductCategoryActionTypes.cancelCreate; constructor () { } }
	export class Add implements Action { public readonly type = ProductCategoryActionTypes.add; constructor ( public item: ProductCategory ) { } }
	export class Added implements Action { public readonly type = ProductCategoryActionTypes.added; constructor ( public item: ProductCategory ) { } }
	export class Edit implements Action { public readonly type = ProductCategoryActionTypes.edit; constructor ( public item?: ProductCategory ) { } }
	export class CancelEdit implements Action { public readonly type = ProductCategoryActionTypes.cancelEdit; constructor () { } }
	export class Modify implements Action { public readonly type = ProductCategoryActionTypes.modify; constructor ( public item: ProductCategory ) { } }
	export class Modified implements Action { public readonly type = ProductCategoryActionTypes.modified; constructor ( public item: ProductCategory ) { } }
	export class Remove implements Action { public readonly type = ProductCategoryActionTypes.remove; constructor ( public key: string ) { } }
	export class Removed implements Action { public readonly type = ProductCategoryActionTypes.removed; constructor ( public item: ProductCategory ) { } }
	export class RemoveFailed implements Action { public readonly type = ProductCategoryActionTypes.removeFailed; constructor () { } }

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