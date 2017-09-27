import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
	selector: 'app-account-form',
	templateUrl: './account-form.component.html',
	styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit
{

	private formGroup: FormGroup;
	
	ngOnInit() {}
	constructor(private formBuilder: FormBuilder)
	{
		this.formGroup = this.formBuilder.group({
			name: [ '', Validators.required ]
		});
	}

}
