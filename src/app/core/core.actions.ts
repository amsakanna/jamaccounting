import { Action } from '@ngrx/store';
import { FeatureModule } from '../../jam/model-library';

export const enum CoreActionTypes
{
	addModule = '[Core] add module'
}
export namespace CoreAction
{
	export class AddModule implements Action
	{
		public readonly type = CoreActionTypes.addModule;
		constructor ( public featureModule: FeatureModule ) { }
	}

	export type All
		= AddModule;
}
