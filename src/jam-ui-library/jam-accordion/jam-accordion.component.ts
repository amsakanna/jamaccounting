import { Component, OnInit, ContentChild, TemplateRef } from '@angular/core';

@Component({
	selector: 'jam-accordion',
	templateUrl: './jam-accordion.component.html',
	styleUrls: ['./jam-accordion.component.css']
})
export class JamAccordionComponent implements OnInit
{

	private _expanded: boolean;
	private get expanded() : boolean
	{
		return this._expanded;
	}
	private set expanded( expanded: boolean )
	{
		this._expanded = expanded;
	}

	ngOnInit() {}
	constructor()
	{
	}


}
