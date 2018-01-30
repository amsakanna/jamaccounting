import { Component, Input } from "@angular/core";
import { JamEntityService } from "../../../jam/ngrx";

@Component( {
	selector: 'app-form-dialog',
	templateUrl: './form-dialog.component.html',
	styleUrls: [ './form-dialog.component.css' ]
} )
export class FormDialogComponent
{
	@Input() $: JamEntityService<any, any>;
}
