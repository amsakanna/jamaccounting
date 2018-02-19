import { Routes } from "@angular/router";
import { MasterComponent } from "./master.component";

export const masterRoutes: Routes = [
	{
		path: '', component: MasterComponent, children: [
			{ path: 'account', loadChildren: '../account/account.module#AccountModule' },
			{ path: 'product', loadChildren: '../product/product.module#ProductModule' },
			{ path: 'product-category', loadChildren: '../product-category/product-category.module#ProductCategoryModule' },
			{ path: 'brand', loadChildren: '../brand/brand.module#BrandModule' },
			{ path: 'inventory', loadChildren: '../inventory/inventory.module#InventoryModule' },
			// { path: 'voucher-type', loadChildren: '../voucher-type/voucher-type.module#VoucherTypeModule' },
			// { path: 'voucher', loadChildren: '../voucher/voucher.module#VoucherModule' }
			{ path: 'tax', loadChildren: '../tax/tax.module#TaxModule' },
			{ path: 'tax-type', loadChildren: '../tax-type/tax-type.module#TaxTypeModule' }
		]
	}
]
