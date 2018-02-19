import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Link } from './link.model';

@Component( {
	selector: 'jam-explorer-side-nav',
	templateUrl: './jam-explorer-side-nav.component.html',
	styleUrls: [ './jam-explorer-side-nav.component.css' ]
} )
export class JamExplorerSideNavComponent implements OnInit
{
	@Input() title: string;
	@Input() links: Link[];
	private selectedLink: Link;

	constructor ()
	{
	}

	ngOnInit () { }

	private _select ( link: Link )
	{
		this.selectedLink = link;
	}

}
