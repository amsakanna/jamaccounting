import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DatabaseService } from '../services/database.service';
import { Account } from '../models/account.model';
import { AccountService } from '../services/account.service';
import { Navigator } from '../services/navigator.service';
import { EventManager, EventStatus } from '../../jam-event-manager/jam-event-manager';
import { Pages } from '../enums/pages.enum';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-account-form',
	templateUrl: './account-form.component.html',
	styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit
{

	private formGroup: FormGroup;
	private account: Account;
	private parentAccount: Account;

	constructor(private formBuilder: FormBuilder,
				private activatedRoute: ActivatedRoute,
				private eventManager: EventManager,
				private db: DatabaseService,
				private navigator: Navigator,
				private accountService: AccountService)
	{
		this.account = new Account();

		var accountKey: string = this.activatedRoute.snapshot.params['account'] || '';

		this.accountService.selectedItem$.subscribe( account => {
			console.log( 'account-recieved', account );
			if( accountKey ) {
				this.account = account;
			} else {
				this.account.parentKey = account ? account.key : this.account.parentKey;
			}
			this.formGroup = this.buildForm();
		});

		if( accountKey ) {
			this.accountService.select( new Account( { key: accountKey } ) );
		} else {
			this.accountService.select( this.accountService.selectedItem );
		}
	}

	ngOnInit()
	{
		this.formGroup = this.buildForm();
	}

	private buildForm()
	{
		return this.formBuilder.group({
			name: [ this.account.name, Validators.required ]
		});
	}

	private buildModel()
	{
		this.account.name = this.formGroup.controls[ 'name' ].value;
	}

	private async submit()
	{
		this.buildModel();
		console.log( this.account );
		this.account = this.account.key ? await this.db.tables.Account.update( this.account ) : await this.db.tables.Account.insert( this.account );
		this.accountService.select( this.account );
		this.eventManager.emitPageRequestEvent( Pages.Account, EventStatus.Requested, [ { key: 'account', value: this.account.key } ] );
	}

	private cancel()
	{
		this.eventManager.emitPageRequestEvent( Pages.Account, EventStatus.Requested, [ { key: 'account', value: this.accountService.selectedItem.key } ] );
	}

}
