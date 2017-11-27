import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CompaniesComponent } from './companies.component';
import { CompanyFormComponent } from './company-form.component';
import { CompanyComponent } from './company.component';

const routes: Routes = [
	{
		path: '', component: CompanyComponent, children: [
			{ path: 'list', component: CompaniesComponent },
			{ path: '@create', component: CompanyFormComponent },
			{
				path: ':company', component: CompanyComponent, children: [
					{ path: 'account', loadChildren: '../account/account.module#AccountModule' },
					// { path: 'inventory', loadChildren: '../inventory/inventory.module#InventoryModule' },
					// { path: 'voucher-type', loadChildren: '../voucher-type/voucher-type.module#VoucherTypeModule' },
					// { path: 'voucher', loadChildren: '../voucher/voucher.module#VoucherModule' }
				]
			},
		]
	}
]

@NgModule( {
	imports: [ RouterModule.forChild( routes ) ],
	exports: [ RouterModule ]
} )
export class CompanyRoutingModule { }