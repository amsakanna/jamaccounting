import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CompanyModuleState } from './company.state';
import { CompanyAction } from './company.actions';
import { NavigatorAction } from '../../jam/navigator';
import { Company, Pages } from '../model';

@Component( {
	selector: 'app-company',
	templateUrl: './company.component.html',
	styleUrls: [ './company.component.css' ]
} )
export class CompanyComponent implements OnInit
{
	private company: Company;
	private Pages = Pages;

	constructor ( private store: Store<CompanyModuleState>,
		private activatedRoute: ActivatedRoute )
	{
		console.log( 'company-component' );

		this.store.dispatch( new CompanyAction.Initialize() );
		this.store.select( state => state.companyState.selectedItem )
			.subscribe( company => this.company = company );

		const companyKey: string = this.activatedRoute.snapshot.params[ 'company' ] || '';
		if ( !this.company || companyKey != this.company.key ) {
			console.log( 'selecting ', companyKey );
			this.store.dispatch( new CompanyAction.Select( companyKey ) );
		}
	}

	ngOnInit ()
	{
	}

	private goto ( page: Pages )
	{
		this.store.dispatch( new NavigatorAction.Navigate( page ) );
	}

	private shutDown ()
	{
		this.store.dispatch( new CompanyAction.Remove( this.company.key ) );
	}

}
