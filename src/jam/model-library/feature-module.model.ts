import { ComponentType } from "@angular/cdk/overlay";

export interface FeatureModule
{
	name: string;
	dialogs: { id: string, component: ComponentType<any> }[];
}
