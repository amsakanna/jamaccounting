import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Account } from '../models/account.model';
import { AccountService } from '../services/account.service';
import { Observable } from "rxjs";
import "rxjs/add/operator/filter";

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit
{

	private accountList: Array<Account>;

	ngOnInit() {}
	constructor(private router: Router,
				private accountService: AccountService)
	{
		this.accountList = this.accountService.tree.getChildren( this.accountService.tree.root );
	}
	
	select( account: Account )
	{
		this.accountService.select( account );
		this.router.navigateByUrl( '/accounts/' + this.accountService.tree.selectedItem.$key );
	}

	newItem()
	{
		this.router.navigateByUrl( '/accounts/new/edit' );
	}

}
