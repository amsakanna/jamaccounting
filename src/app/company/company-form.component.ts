import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper, MatDatepicker } from '@angular/material';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { ActivatedRoute, Router } from "@angular/router";
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { DatabaseService } from '../shared/database.service';
import { Table } from '../../jam/firestore';
import { UserService } from '../user/user.service';
import { Company, UserAccount, Pages } from '../model';

@Component( {
	selector: 'app-company-form',
	templateUrl: './company-form.component.html',
	styleUrls: [ './company-form.component.css' ]
} )
export class CompanyFormComponent implements OnInit
{
	@ViewChild( 'stepper' ) stepper: MatStepper;

	private company: Company;
	private formGroups: Array<FormGroup>;
	private stepperNextButtonText: string;
	private stepperNextButtonColor: string;
	private readonly finalStep: number;

	constructor ( private activatedRoute: ActivatedRoute,
		private router: Router,
		private formBuilder: FormBuilder,
		private db: DatabaseService,
		private userService: UserService )
	{
		this.company = new Company();
		this.company.owner = this.userService.user.key;
		this.finalStep = 4;
	}

	ngOnInit ()
	{
		this.formGroups = this.buildForm();
		this.refresh( 0 );

		/**
		 * Generate company id.
		 * TODO: Implement lookup database for existing companies with the same id.
		 */
		this.formGroups[ 0 ].controls[ 'name' ].valueChanges.subscribe( () =>
		{
			this.formGroups[ 3 ].controls[ 'id' ].setValue( this.convertNameToId( this.formGroups[ 0 ].controls[ 'name' ].value ) );
		} );

		this.stepper.selectionChange.subscribe( ( stepperEvent: StepperSelectionEvent ) =>
		{
			this.refresh( stepperEvent.selectedIndex );
		} )
	}

	private buildForm ()
	{
		return [
			this.formBuilder.group( {
				name: [ this.company.name, Validators.required ]
			} ),
			this.formBuilder.group( {
				streetAddress: [ this.company.address.streetAddress ],
				city: [ this.company.address.city ],
				pinCode: [ this.company.address.pinCode ],
				state: [ this.company.address.state ]
			} ),
			this.formBuilder.group( {
				phone: [ this.company.address.phone ],
				landline: [ this.company.address.landline ],
				email: [ this.company.address.email ],
				website: [ this.company.address.website ],
				fax: [ this.company.address.fax ]
			} ),
			this.formBuilder.group( {
				id: [ this.company.id, Validators.pattern( /^[a-z0-9-]*$/ ) ],
				gstin: [ this.company.gstin ],
				pan: [ this.company.pan ],
				cin: [ this.company.cin ]
			} ),
			this.formBuilder.group( {} )
		];
	}

	private get id (): AbstractControl
	{
		return this.formGroups[ 3 ].get( 'id' );
	}

	private get formTitle (): string
	{
		return this.company.name || 'Create your company';
	}

	private nextStepper ()
	{
		if ( this.stepper.selectedIndex == this.finalStep ) {
			this.submit();
		} else {
			this.stepper.next();
		}
	}

	private async submit ()
	{
		this.refresh( this.finalStep );
		this.company = await this.db.tables.Company.insert( this.company );
		// this.db.EnterCollection( 'Company', this.company.key );
		var existingUserAccount = this.userService.userAccount;
		existingUserAccount.companies.push( this.company.key );
		const newUserAccount = new UserAccount( { key: existingUserAccount.key, companies: existingUserAccount.companies } );
		await this.db.tables.UserAccount.updateFields( newUserAccount );
		await Table.clone( this.db.tables.PresetAccount, this.db.tables.Account, true );
	}

	private convertNameToId ( name: string )
	{
		return name
			.trim()
			.replace( /[\s]+/g, '-' )					//  Replace white spaces with hyphen
			.split( '-' ).slice( 0, 2 ).join( '-' )		  //  Take two words only
			.toLowerCase()
			.replace( /((?![a-z0-9-]).)/g, '' );	  //  Remove anything other than lowercase, number, hyphen
	}

	private refresh ( index: number )
	{
		this.company.name = this.formGroups[ 0 ].controls[ 'name' ].value;
		this.company.id = this.formGroups[ 3 ].controls[ 'id' ].value;
		this.company.key = this.company.id;

		this.company.address.streetAddress = this.formGroups[ 1 ].controls[ 'streetAddress' ].value;
		this.company.address.city = this.formGroups[ 1 ].controls[ 'city' ].value;
		this.company.address.pinCode = this.formGroups[ 1 ].controls[ 'pinCode' ].value;
		this.company.address.state = this.formGroups[ 1 ].controls[ 'state' ].value;

		this.company.address.phone = this.formGroups[ 2 ].controls[ 'phone' ].value;
		this.company.address.landline = this.formGroups[ 2 ].controls[ 'landline' ].value;
		this.company.address.email = this.formGroups[ 2 ].controls[ 'email' ].value;
		this.company.address.website = this.formGroups[ 2 ].controls[ 'website' ].value;
		this.company.address.fax = this.formGroups[ 2 ].controls[ 'fax' ].value;

		this.company.gstin = this.formGroups[ 3 ].controls[ 'gstin' ].value;
		this.company.pan = this.formGroups[ 3 ].controls[ 'pan' ].value;
		this.company.cin = this.formGroups[ 3 ].controls[ 'cin' ].value;

		switch ( index ) {
			case this.finalStep:
				this.stepperNextButtonText = 'Finish';
				this.stepperNextButtonColor = 'accent';
				break;
			default:
				this.stepperNextButtonText = 'Next';
				this.stepperNextButtonColor = 'primary';
				break;
		}

	}

}