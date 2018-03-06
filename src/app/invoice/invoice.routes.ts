import { Routes } from "@angular/router";
import { InvoiceComponent } from "./invoice.component";
import { InvoiceFormComponent } from "./invoice-form.component";

export const invoiceRoutes: Routes = [
	{
		path: '', children: [
			{ path: 'list', component: InvoiceComponent },
			{ path: '@create', component: InvoiceFormComponent }
		]
	},
]
