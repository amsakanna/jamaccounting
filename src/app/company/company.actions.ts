import { Action } from '@ngrx/store';
import { Company, UserAccount } from '../model';
import { KeyValue } from '../../jam/model-library';

export const enum CompanyActionTypes
{
	initialize = '[Company] initialize',
	initialized = '[Company] initialized',
	select = '[Company] select',
	selected = '[Company] selected',
	selectFailed = '[Company] selectFailed',
	create = '[Company] create',
	cancelCreate = '[Company] cancelCreate',
	add = '[Company] add',
	added = '[Company] added',
	edit = '[Company] edit',
	cancelEdit = '[Company] cancelEdit',
	modify = '[Company] modify',
	modified = '[Company] modified',
	remove = '[Company] remove',
	removed = '[Company] removed',
}
export namespace CompanyAction
{
	export class Initialize implements Action { public readonly type = CompanyActionTypes.initialize; constructor ( public masterNames: KeyValue[] ) { } }
	export class Initialized implements Action { public readonly type = CompanyActionTypes.initialized; constructor () { } }
	export class Select implements Action { public readonly type = CompanyActionTypes.select; constructor ( public key: string = null ) { } }
	export class Selected implements Action { public readonly type = CompanyActionTypes.selected; constructor ( public item: Company ) { } }
	export class SelectFailed implements Action { public readonly type = CompanyActionTypes.selectFailed; constructor () { } }
	export class Create implements Action { public readonly type = CompanyActionTypes.create; constructor () { } }
	export class CancelCreate implements Action { public readonly type = CompanyActionTypes.cancelCreate; constructor () { } }
	export class Add implements Action { public readonly type = CompanyActionTypes.add; constructor ( public item: Company ) { } }
	export class Added implements Action { public readonly type = CompanyActionTypes.added; constructor ( public item: Company ) { } }
	export class Edit implements Action { public readonly type = CompanyActionTypes.edit; constructor ( public item?: Company ) { } }
	export class CancelEdit implements Action { public readonly type = CompanyActionTypes.cancelEdit; constructor () { } }
	export class Modify implements Action { public readonly type = CompanyActionTypes.modify; constructor ( public item: Company ) { } }
	export class Modified implements Action { public readonly type = CompanyActionTypes.modified; constructor ( public item: Company ) { } }
	export class Remove implements Action { public readonly type = CompanyActionTypes.remove; constructor ( public key: string ) { } }
	export class Removed implements Action { public readonly type = CompanyActionTypes.removed; constructor ( public item: Company ) { } }

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
