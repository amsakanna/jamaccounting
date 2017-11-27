import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CompanyModuleState } from './company.state';
import { CompanyAction } from './company.actions';
import { NavigatorAction } from '../../jam-navigator/jam-navigator';
import { Pages } from '../shared/pages.enum';
import { Company } from './company.model';

@Component( {
	selector: 'app-company',
	templateUrl: './company.component.html',
	styleUrls: [ './company.component.css' ]
} )
export class CompanyComponent implements OnInit
{
	private company: Company;

	constructor ( private store: Store<CompanyModuleState>,
		private activatedRoute: ActivatedRoute )
	{
		this.store.select( state => state.companyState )
			.subscribe( companyState => this.company = companyState.selectedItem );
	}

	ngOnInit ()
	{
		var companyKey = this.activatedRoute.snapshot.params[ 'company' ] || '';
		this.store.dispatch( new CompanyAction.Select( companyKey ) );
	}

	private goto ( page: Pages )
	{
		this.store.dispatch( new NavigatorAction.Navigate( page ) );
	}

	private async shutDown ()
	{
		this.store.dispatch( new CompanyAction.Remove( this.company.key ) );
	}

}
