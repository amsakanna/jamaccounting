import { Component, OnInit, EventEmitter, Input, Output, ContentChild, TemplateRef } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { Observable } from 'rxjs';
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
	@Input() title: string;
	@Input() showSearch: boolean;
	@Input() showNewButton: boolean;
	@Input() newItemText: string;
	@Input() selectedItemBackgroundColor: string;
	@Input() selectedItemForegroundColor: string;
	@Input() hoveredItemBackgroundColor: string;
	@Input() hoveredItemForegroundColor: string;
	
	@Output() search: EventEmitter<string>;
	@Output() newItem: EventEmitter<any>;
	@Output() delete: EventEmitter<any>;
	@Output() selectedItemChange: EventEmitter<any>;
	@Output() select: EventEmitter<any>;
	@Output() open: EventEmitter<any>;

	private _hoveredItem: any;
	
	constructor( private router: Router )
	{
		this.search = new EventEmitter<string>();
		this.newItem = new EventEmitter<any>();
		this.delete = new EventEmitter<any>();
		this.selectedItemChange = new EventEmitter<any>();
		this.select = new EventEmitter<any>();
		this.open = new EventEmitter<any>();		
	}
	
	ngOnInit()
	{
		this.selectedItemBackgroundColor = this.selectedItemBackgroundColor ? this.selectedItemBackgroundColor : 'royalblue';
		this.selectedItemForegroundColor = this.selectedItemForegroundColor ? this.selectedItemForegroundColor : 'white';
		this.hoveredItemBackgroundColor = this.hoveredItemBackgroundColor ? this.hoveredItemBackgroundColor : 'rgb(227, 230, 235)';
		this.hoveredItemForegroundColor = this.hoveredItemForegroundColor ? this.hoveredItemForegroundColor : 'black';
		// this.selectedItem = this.list[0];
	}
	
	_search( text: string )
	{
		this.search.emit( text );
	}

	_newItem() 
	{
		this.newItem.emit();
	}

	_select( item: any )
	{
		this.selectedItem = item;
		this.select.emit( item );
		this.selectedItemChange.emit( item );
	}

	_deselect()
	{
		this.selectedItem = null;
		this.selectedItemChange.emit( null );
	}

	_open( item: any )
	{
		this.open.emit( item );
	}

}
