import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CompanyModuleState } from './company.state';
import { CompanyAction } from './company.actions';
import { Company } from './company.model';

@Component( {
	selector: 'app-companies',
	templateUrl: './companies.component.html',
	styleUrls: [ './companies.component.css' ]
} )
export class CompaniesComponent implements OnInit
{

	private list: Array<Company>;

	constructor ( private store: Store<CompanyModuleState> ) { }

	ngOnInit ()
	{
		this.store.select( state => state.companyState )
			.subscribe( companyState => this.list = companyState.list );
	}

	private select ( company: Company )
	{
		this.store.dispatch( new CompanyAction.Select( company.key ) );
	}

	private create ()
	{
		this.store.dispatch( new CompanyAction.Create() );
	}

}
