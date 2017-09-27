import { Component, OnInit, Input, ContentChild, TemplateRef, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FlatTree } from "../models/flat-tree.model";

@Component({
	selector: 'jam-explorer',
	templateUrl: './jam-explorer.component.html',
	styleUrls: ['./jam-explorer.component.css']
})
export class JamExplorerComponent implements OnInit
{

	@ContentChild(TemplateRef) listItemTemplate: TemplateRef<any>;
	
	@Input() tree: FlatTree<any>;
	@Input() title: string;
	@Input() showNewButton: boolean;
	@Input() newItemText: string;
	@Input() selectedItemBackgroundColor: string;
	@Input() selectedItemForegroundColor: string;
	@Input() hoveredItemBackgroundColor: string;
	@Input() hoveredItemForegroundColor: string;

	@Output() select: EventEmitter<any>;
	@Output() open: EventEmitter<any>;

	private list: Array<any>;
	private path: Array<any>;

	ngOnInit()
	{
		this._open( this.tree.getParent( this.tree.selectedItem ) );
	}

	ngDoCheck()
	{
		// this._open( this.tree.getParent( this.tree.selectedItem ) );
	}

	constructor()
	{
		this.select = new EventEmitter<any>();
		this.open = new EventEmitter<any>();
	}

	_select( item: any )
	{
		this.select.emit( item );
	}
	
	_open( item: any, selectedItem?: any )
	{
		var list = this.tree.getChildren( item );
		if( ! list || ! list.length) return;
		this.list = list;
		selectedItem = selectedItem ? selectedItem : list[0];
		this._select( selectedItem );
		this.open.emit( item );
	}

	_goBack()	
	{
		var parent = this.tree.getParent( this.list[0] );
		var grandParent = this.tree.getParent( parent );
		this._open( grandParent, parent );
	}

}
