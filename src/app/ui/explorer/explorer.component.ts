import { Component, Input } from "@angular/core";
import { JamEntityService } from "../../../jam/ngrx";

@Component( {
	selector: 'app-explorer',
	templateUrl: './explorer.component.html',
	styleUrls: [ './explorer.component.css' ]
} )
export class ExplorerComponent
{
	@Input() $: JamEntityService<any, any>;
}
