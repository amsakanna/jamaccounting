import { Routes } from "@angular/router";
import { InventoryComponent } from "./inventory.component";
import { InventoryDetailComponent } from "./inventory-detail.component";
import { InventoryFormComponent } from "./inventory-form.component";

export const inventoryRoutes: Routes = [
	{
		path: '', component: InventoryComponent, children: [
			{ path: '@create', component: InventoryFormComponent },
			{ path: ':inventory', component: InventoryDetailComponent },
			{ path: ':inventory/edit', component: InventoryFormComponent }
		]
	}
];
