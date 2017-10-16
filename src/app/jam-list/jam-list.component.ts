import { Component, OnInit, EventEmitter, Input, Output, ContentChild, TemplateRef } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";

@Component({
	selector: 'jam-list',
	templateUrl: './jam-list.component.html',
	styleUrls: ['./jam-list.component.css'],
	animations: [
		trigger('listItemAnimation', [
			state('listItemState', style({
				transform: 'translateY(0px)'			  
			})),			
			transition('void => *', animate('200ms ease-in', keyframes([
				style({opacity: '0'}),
				style({opacity: '1'})
			]))),		
			// transition('* => void', animate('200ms linear', keyframes([
			// 	style({opacity: '1'}),
			// 	style({opacity: '0'})
			// ])))
		])
	]
})
export class JamListComponent implements OnInit 
{
	
	@ContentChild(TemplateRef) listItemTemplate: TemplateRef<any>;
	
	@Input() list: Array<any>;
	@Input() selectedItem: any;
	@Input() selectedItemBackgroundColor: string;
	@Input() selectedItemForegroundColor: string;
	@Input() hoveredItemBackgroundColor: string;
	@Input() hoveredItemForegroundColor: string;
	
	@Output() selectedItemChange: EventEmitter<any>;
	@Output() select: EventEmitter<any>;
	@Output() open: EventEmitter<any>;

	private _hoveredItem: any;
	
	constructor( private router: Router )
	{
		this.selectedItemChange = new EventEmitter<any>();
		this.select = new EventEmitter<any>();
		this.open = new EventEmitter<any>();		
	}
	
	ngOnInit()
	{
		this.selectedItemBackgroundColor = this.selectedItemBackgroundColor ? this.selectedItemBackgroundColor : 'rgb(227, 230, 235)';
		this.selectedItemForegroundColor = this.selectedItemForegroundColor ? this.selectedItemForegroundColor : 'white';
		this.hoveredItemBackgroundColor = this.hoveredItemBackgroundColor ? this.hoveredItemBackgroundColor : 'rgb(227, 230, 235)';
		this.hoveredItemForegroundColor = this.hoveredItemForegroundColor ? this.hoveredItemForegroundColor : 'black';
	}
	
	private _select( item: any )
	{
		this.selectedItem = item;
		this.select.emit( item );
		this.selectedItemChange.emit( item );
	}

	private _deselect()
	{
		this.selectedItem = null;
		this.selectedItemChange.emit( null );
	}

	private _open( item: any )
	{
		this.open.emit( item );
	}

	// interface related

	private _backgroundColor( item: any ) : string
	{
		var backgroundColor: string;

		switch ( item ) {
			case this.selectedItem:
				backgroundColor = this.selectedItemBackgroundColor;
				break;
			case this._hoveredItem:
				backgroundColor = this.hoveredItemBackgroundColor;		
			default:
				backgroundColor = 'transparent';
				break;
		}
		return backgroundColor;
	}

	private _foregroundColor( item: any ) : string
	{
		var foregroundColor: string;
		
		switch ( item ) {
			case this.selectedItem:
				foregroundColor = this.selectedItemForegroundColor;
				break;
			case this._hoveredItem:
				foregroundColor = this.hoveredItemForegroundColor;		
			default:
				foregroundColor = 'black';
				break;
		}
		return foregroundColor;
	}


}
