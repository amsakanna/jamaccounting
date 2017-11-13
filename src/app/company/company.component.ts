import { Component, OnInit } from '@angular/core';
import { Pages } from '../enums/pages.enum';
import { EventManager, EventStatus } from '../../jam-event-manager/jam-event-manager';
import { DatabaseService } from '../services/database.service';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../models/company.model';
import { UserService } from '../services/user.service';
import { UserAccount } from '../models/user-account.model';

@Component({
	selector: 'app-company',
	templateUrl: './company.component.html',
	styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit
{

	private company: Company;
	private Pages = Pages;

	constructor(private eventManager: EventManager,
				private activatedRoute: ActivatedRoute,
				private db: DatabaseService,
				private	userService: UserService
			)
	{
		console.log( 'company-component' );
		var companyKey = this.activatedRoute.snapshot.params['company'] || '';
		console.log( companyKey );
		this.db.EnterCollection( this.db.tables.Company.name, companyKey );
		companyKey && this.db.tables.Company.lookup( companyKey ).then( company => this.company = company );
	}

	ngOnInit()
	{
	}

	private goto( page: Pages )
	{
		if( page in Pages ) {
			this.eventManager.emitPageRequestEvent( page, EventStatus.Requested );
		}
	}

	private async shutDown()
	{
		const companyDeleted = await this.db.tables.Company.delete( this.company.key );
		if( companyDeleted ) {
			var existingUserAccount = this.userService.userAccount;
			existingUserAccount.companies = existingUserAccount.companies.filter( company => company != this.company.key );
			const newUserAccount = new UserAccount( { key: existingUserAccount.key, companies: existingUserAccount.companies } );
			await this.db.tables.UserAccount.updateFields( newUserAccount );
			this.eventManager.emitPageRequestEvent( Pages.Companies, EventStatus.Requested );
		}
	}

}
