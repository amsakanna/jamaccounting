import { Injectable } from '@angular/core';
import { CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { CompanyModuleState } from './company.state';

@Injectable()
export class CompanyGuard implements CanLoad
{

	constructor ( private store: Store<CompanyModuleState> ) { }

	canLoad ( route: Route ): Observable<boolean>
	{
		console.log( 'company-guard' );
		// Check if company is selected
		return this.store.select( state => state.companyState.selectedItem )
			.map( selectedItem => !!selectedItem )
			.filter( selected => selected ).take( 1 );
	}

}
