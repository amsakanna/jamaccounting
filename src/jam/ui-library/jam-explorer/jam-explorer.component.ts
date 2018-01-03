import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component( {
	selector: 'jam-explorer',
	templateUrl: './jam-explorer.component.html',
	styleUrls: [ './jam-explorer.component.css' ]
} )
export class JamExplorerComponent implements OnInit
{
	@Input() title: string;
	@Input() newItemText: string;
	@Input() itemTitle: string;

	@Output() create: EventEmitter<any>;
	@Output() edit: EventEmitter<any>;

	constructor ()
	{
		this.create = new EventEmitter<any>();
		this.edit = new EventEmitter<any>();
	}

	ngOnInit () { }

	private _create ()
	{
		this.create.emit();
	}

	private _edit ()
	{
		this.edit.emit();
	}

}
