import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component( {
	selector: 'jam-accordion-item',
	templateUrl: './jam-accordion-item.component.html',
	styleUrls: [ './jam-accordion-item.component.css' ]
} )
export class JamAccordionItemComponent implements OnInit
{

	@Input() expanded: boolean;
	@Input() expandedIcon: string;
	@Input() collapsedIcon: string;
	@Input() noContentIcon: string;
	@Input() noContent: boolean;
	@Output() toggle: EventEmitter<boolean>;

	constructor ()
	{
		this.expandedIcon = this.expandedIcon ? this.expandedIcon : 'keyboard_arrow_down';
		this.collapsedIcon = this.collapsedIcon ? this.collapsedIcon : 'keyboard_arrow_right';
		this.noContentIcon = this.noContentIcon ? this.noContentIcon : '';
		this.toggle = new EventEmitter<boolean>();
	}

	ngOnInit () { }

	private get icon (): string
	{
		return this.noContent ? '' : this.expanded ? this.expandedIcon : this.collapsedIcon;
	}

	_toggle ()
	{
		if ( !this.noContent )
			this.expanded = !this.expanded;
		this.toggle.emit( this.expanded );
	}

}
