import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CompanyModuleState } from './company.state';
import { CompanyAction } from './company.actions';
import { NavigatorAction } from '../../jam/navigator';
import { Company, Pages } from '../model';
import { KeyValue } from '../../jam/model-library';

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

		var masterNames: KeyValue[] = [
			{ key: 'Account', value: Pages.Account },
			{ key: 'Product', value: Pages.Product },
			{ key: 'Product Category', value: Pages.ProductCategory },
			{ key: 'Brand', value: Pages.Brand },
			{ key: 'Tax', value: Pages.Tax },
			{ key: 'Tax Group', value: Pages.TaxGroup },
			{ key: 'Party', value: Pages.Party },
			{ key: 'Inventory', value: Pages.Inventory }
		]

		this.store.dispatch( new CompanyAction.Initialize( masterNames ) );
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
