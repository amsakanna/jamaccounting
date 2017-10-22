import { Component, OnInit } from '@angular/core';
import { Company } from '../models/company.model';

@Component({
	selector: 'app-companies',
	templateUrl: './companies.component.html',
	styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit
{

	private companyList: Array<Company>;
	private selectedCompany: Company;
	
	constructor()
	{
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
