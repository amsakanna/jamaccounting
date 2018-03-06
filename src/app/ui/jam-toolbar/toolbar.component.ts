import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core";
import { MenuItem } from "./menu-item.model";

@Component( {
	selector: 'jam-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: [ './toolbar.component.css' ],
	changeDetection: ChangeDetectionStrategy.Default
} )
export class JamToolbarComponent
{
	@Input() menu: MenuItem[];
	@Input() selected: MenuItem;
	@Output() selectedChange: EventEmitter<MenuItem>;
	private selectedParent: MenuItem;

	constructor ()
	{
		this.selectedChange = new EventEmitter();
	}

	private _drillDown ( menuItem: MenuItem )
	{
		this.selectedParent = menuItem;
		if ( ( !menuItem.subMenu || menuItem.subMenu.length <= 0 ) && menuItem.link )
			this._select( menuItem );
	}

	private _select ( menuItem: MenuItem )
	{
		this.selected = menuItem;
		this.selectedChange.emit( menuItem );
	}
}
