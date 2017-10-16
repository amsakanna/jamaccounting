import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface IJamXboxMenuItem
{
	$key: any;
	text: string;
}

@Component({
	selector: 'jam-xbox-menu',
	templateUrl: './jam-xbox-menu.component.html',
	styleUrls: ['./jam-xbox-menu.component.css']
})
export class JamXboxMenuComponent implements OnInit
{

	@Input() menu: Array<IJamXboxMenuItem>;
	@Input() selectedItem: IJamXboxMenuItem;
	
	@Output() select: EventEmitter<IJamXboxMenuItem>;
	
	constructor()
	{
		this.select = new EventEmitter<IJamXboxMenuItem>();
	}

	ngOnInit() {}

	public _select( menuItem: IJamXboxMenuItem )
	{
		this.selectedItem = menuItem;
		this.select.emit( menuItem );
	}

}
