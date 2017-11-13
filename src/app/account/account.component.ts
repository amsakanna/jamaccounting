import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AccountService } from "../services/account.service";
import { Account } from "../models/account.model";
import { EventManager, EventStatus } from '../../jam-event-manager/jam-event-manager';
import { Pages } from '../enums/pages.enum';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit
{

	private path: Array<Account>;

	constructor(private activatedRoute: ActivatedRoute,
				private eventManager: EventManager,
				private accountService: AccountService)
	{
		const accountKey: string = this.activatedRoute.snapshot.params['account'];
		console.log( 'accountKey:', accountKey );
		const account = new Account( { key: accountKey } );
		this.accountService.select( account );
	}

	ngOnInit()
	{
	}

	private select( account: Account )
	{
		this.accountService.select( account );
	}

	private edit( account: Account )
	{
		this.eventManager.emitPageRequestEvent( Pages.EditAccount, EventStatus.Requested );
	}

}
