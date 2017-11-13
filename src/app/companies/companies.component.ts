import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Company } from '../models/company.model';
import { EventManager, EventStatus } from '../../jam-event-manager/jam-event-manager';
import { MyEvents } from '../models/event.model';
import { Pages } from '../enums/pages.enum';

@Component({
	selector: 'app-companies',
	templateUrl: './companies.component.html',
	styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit
{

	private list: Array<Company>;
	private selectedItem: Company;

	constructor(private db: DatabaseService,
				private eventManager: EventManager)
	{

	}

	ngOnInit()
	{
		this.db.tables.Company.list.subscribe( list => {
			console.log( list );
			this.list = list;
		 } );
	}

	private select( company: Company )
	{
		this.eventManager.emitPageRequestEvent( Pages.Company, EventStatus.Requested, [{ key: 'company', value: company.key }] );
	}

	private newItem()
	{
		this.eventManager.emitPageRequestEvent( Pages.NewCompany, EventStatus.Requested );
	}

}
