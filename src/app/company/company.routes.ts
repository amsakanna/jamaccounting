import { Routes } from '@angular/router';
import { CompanyFormComponent } from './company-form.component';
import { CompanyComponent } from './company.component';
import { CompanyGuard } from './company.guard';

export const companyRoutes: Routes = [
	{
		path: '', children: [
			{ path: '@create', component: CompanyFormComponent },
			{
				path: ':company', component: CompanyComponent, children: [
					{ path: 'account', loadChildren: '../account/account.module#AccountModule' },
					{ path: 'product', loadChildren: '../product/product.module#ProductModule' },
					// { path: 'product-category', loadChildren: '../product-category/product-category.module#ProductCategoryModule' },
					{ path: 'brand', loadChildren: '../brand/brand.module#BrandModule' },
					{ path: 'inventory', loadChildren: '../inventory/inventory.module#InventoryModule' },
					// { path: 'voucher-type', loadChildren: '../voucher-type/voucher-type.module#VoucherTypeModule' },
					// { path: 'voucher', loadChildren: '../voucher/voucher.module#VoucherModule' }
					{ path: 'tax', loadChildren: '../tax/tax.module#TaxModule' },
					{ path: 'tax-type', loadChildren: '../tax-type/tax-type.module#TaxTypeModule' }
				]
			},
		]
	}
]
