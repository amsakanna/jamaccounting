import { Component, OnInit } from '@angular/core';
import { Company } from '../models/company.model';

@Component({
	selector: 'app-company-page',
	templateUrl: './company-page.component.html',
	styleUrls: ['./company-page.component.css']
})
export class CompanyPageComponent implements OnInit
{

	private companyList: Array<Company>;
	private selectedCompany: Company;
	
	constructor()
	{
		// this.companyService
		// .getList1()
		// .subscribe( list => this.companyList = list );
	}

	ngOnInit() {
	}

	select( company: Company )
	{
		this.selectedCompany = company;
	}

	scrollme( event: MouseWheelEvent )
	{
		document.getElementById( 'company-list' ).scrollLeft += event.deltaY;
	}

}