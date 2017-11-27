import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'jam-menu',
	templateUrl: './jam-menu.component.html',
	styleUrls: ['./jam-menu.component.css']
})
export class JamMenuComponent implements OnInit
{

	@Input() menu: any;
	@Output() select: EventEmitter<any>;
	
	ngOnInit() {}

	constructor()
	{
		this.select = new EventEmitter<any>();
	}

	_select( menuItem: any )
	{
		this.select.emit( menuItem );
	}

}

