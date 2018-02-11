import { FeatureModule } from "../../jam/model-library";
import { ComponentType } from "@angular/cdk/overlay";

export interface CoreModuleState
{
	coreState: CoreState
}

export interface CoreState
{
	featureModules: FeatureModule[];
	dialogs: { id: string, component: ComponentType<any> }[];
}
