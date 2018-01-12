import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppModuleState } from '../app.store';
import { Tables } from './tables.model';

@Injectable()
export class DatabaseService
{
	public tables: Tables;

	constructor ( private store: Store<AppModuleState> )
	{
		this.store
			.select( state => state.databaseState.tables )
			.subscribe( tables =>
			{
				if ( !tables ) return;
				this.tables = new Tables();
				tables.forEach( table => this.tables[ table.name ] = table );
			} );
	}

}