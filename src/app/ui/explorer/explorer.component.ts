import { Component, Input, Output, EventEmitter } from "@angular/core";
import { JamEntityService } from "../../../jam/ngrx";
import { KeyValue } from "../../../jam/model-library";
import { MatSelectChange } from "@angular/material";
import { Router } from "@angular/router";

@Component( {
	selector: 'app-explorer',
	templateUrl: './explorer.component.html',
	styleUrls: [ './explorer.component.css' ]
} )
export class ExplorerComponent
{
	@Input() $: JamEntityService<any, any>;
	@Input() tabs: KeyValue[];
	@Input() selectedTab: KeyValue;
	@Output() tabChange: EventEmitter<KeyValue>;

	constructor ()
	{
		this.tabChange = new EventEmitter();
	}

	private _tabChange ( event: MatSelectChange )
	{
		this.tabChange.emit( event.value );
	}
}
