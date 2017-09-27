import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AccountService } from "../services/account.service";
import { Account } from "../models/account.model";

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit
{

	private account: Account;
	private path: Array<Account>;
	private pathText: string;

	ngOnInit() {}
	constructor(private activatedRoute: ActivatedRoute,
				private router: Router,
				private accountService: AccountService)
	{
		var routeKey = this.activatedRoute.snapshot.params['key'] || '';
		if( routeKey != this.accountService.tree.selectedItem.$key )
		{
			this.accountService.select( routeKey );
			this.router.navigateByUrl( '/accounts/' + this.accountService.tree.selectedItem.$key );
		}
	}
	
	ngDoCheck()
	{
		this.account = this.accountService.tree.selectedItem;
		this.path = this.accountService.tree.getPath( this.account ).reverse();
	}

	select( account: Account )
	{
		this.accountService.select( account );	
	}

}
