import { Component } from "@angular/core";
import { PartyService } from "./party.service";
import { AbstractControl } from "@angular/forms";
import { PartyTypes, CompanyRegistrationTypes } from "../model";
import { MatRadioChange } from "@angular/material";

@Component( {
	selector: 'app-party-form',
	templateUrl: './party-form.component.html',
	styleUrls: [ './party-form.component.css' ]
} )
export class PartyFormComponent
{
	private partyTypes: string[];
	private companyRegistrationTypes: string[];

	constructor ( private $: PartyService )
	{
		this.partyTypes = Object.keys( PartyTypes ).map( key => PartyTypes[ key ] );
		this.companyRegistrationTypes = Object.keys( CompanyRegistrationTypes ).map( key => CompanyRegistrationTypes[ key ] );
		this.gstinFormControl.valueChanges.subscribe( gstin =>
		{
			if ( !gstin ) return;
			const state = this.stateList.find( state => state.code == gstin.slice( 0, 2 ) );
			if ( state ) this.$.formItem.placeOfSupply = state.code;
		} );
	}

	private partyTypeChanged ( event: MatRadioChange ): void
	{
		this.$.formItem.type = event.value;
	}

	private registrationTypeChanged (): void
	{
		const gstinFormControl = this.gstinFormControl;
		if ( !this.gstRequired ) {
			gstinFormControl.reset();
			gstinFormControl.disable();
		} else {
			gstinFormControl.enable();
		}
	}

	private get gstRequired (): boolean
	{
		return this.$.formItem.companyRegistrationType == CompanyRegistrationTypes.Registered
			|| this.$.formItem.companyRegistrationType == CompanyRegistrationTypes.RegisteredComposition
			|| this.$.formItem.companyRegistrationType == CompanyRegistrationTypes.SEZ;
	}

	private get gstinFormControl (): AbstractControl
	{
		return this.$.form.get( 'gstin' );
	}

	private stateList = [
		{ name: 'Andaman and Nicobar Islands', code: '35' },
		{ name: 'Andhra Pradesh', code: '37' },
		{ name: 'Arunachal Pradesh', code: '12' },
		{ name: 'Assam', code: '18' },
		{ name: 'Bihar', code: '10' },
		{ name: 'Chandigarh', code: '04' },
		{ name: 'Chattisgarh', code: '22' },
		{ name: 'Dadra and Nagar Haveli', code: '26' },
		{ name: 'Daman and Diu', code: '25' },
		{ name: 'Delhi', code: '07' },
		{ name: 'Goa', code: '30' },
		{ name: 'Gujarat', code: '24' },
		{ name: 'Haryana', code: '06' },
		{ name: 'Himachal Pradesh', code: '02' },
		{ name: 'Jammu and Kashmir', code: '01' },
		{ name: 'Jharkhand', code: '20' },
		{ name: 'Karnataka', code: '29' },
		{ name: 'Kerala', code: '32' },
		{ name: 'Lakshadweep Islands', code: '31' },
		{ name: 'Madhya Pradesh', code: '23' },
		{ name: 'Maharashtra', code: '27' },
		{ name: 'Manipur', code: '14' },
		{ name: 'Meghalaya', code: '17' },
		{ name: 'Mizoram', code: '15' },
		{ name: 'Nagaland', code: '13' },
		{ name: 'Odisha', code: '21' },
		{ name: 'Pondicherry', code: '34' },
		{ name: 'Punjab', code: '03' },
		{ name: 'Rajasthan', code: '08' },
		{ name: 'Sikkim', code: '11' },
		{ name: 'Tamil Nadu', code: '33' },
		{ name: 'Telangana', code: '36' },
		{ name: 'Tripura', code: '16' },
		{ name: 'Uttar Pradesh', code: '09' },
		{ name: 'Uttarakhand', code: '05' },
		{ name: 'West Bengal', code: '19' }
	]
}
