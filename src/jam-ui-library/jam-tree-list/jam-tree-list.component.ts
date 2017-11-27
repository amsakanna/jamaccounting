import { Component, OnInit, Input, ContentChild, TemplateRef, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FlatTree } from "../../jam-model-library/jam-model-library";

@Component( {
	selector: 'jam-tree-list',
	templateUrl: './jam-tree-list.component.html',
	styleUrls: [ './jam-tree-list.component.css' ]
} )
export class JamTreeListComponent implements OnInit
{

	@ContentChild( TemplateRef ) listItemTemplate: TemplateRef<any>;

	@Input() tree: FlatTree<any>;
	@Input() selectedItemBackgroundColor: string;
	@Input() selectedItemForegroundColor: string;
	@Input() hoveredItemBackgroundColor: string;
	@Input() hoveredItemForegroundColor: string;

	@Output() select: EventEmitter<any>;
	@Output() open: EventEmitter<any>;

	private list: Array<any>;
	private path: Array<any>;
	private isRoot: boolean;
	private parentName: string;

	ngOnInit ()
	{
		this._open( this.tree.selectedFamily );
	}

	ngDoCheck ()
	{
		// this._open( this.tree.getParent( this.tree.selectedItem ) );
	}

	constructor ()
	{
		this.select = new EventEmitter<any>();
		this.open = new EventEmitter<any>();
	}

	_select ( item: any )
	{
		this.select.emit( item );
	}

	_open ( item: any, selectedItem?: any )
	{
		// check before open
		var list = this.tree.getChildren( item );
		if ( !list || !list.length ) return;

		// open
		this.list = list;

		// select item
		selectedItem = selectedItem ? selectedItem : list[ 0 ];
		this._select( selectedItem );
		this.isRoot = this.tree.rootReached;
		this.parentName = this.tree.selectedFamily.name;

		// broadcast
		this.open.emit( item );
	}

	_goBack ()
	{
		if ( this.isRoot = this.tree.rootReached ) return;
		var parent = this.tree.getParent( this.list[ 0 ] );
		var grandParent = this.tree.getParent( parent );
		this._open( grandParent, parent );
	}

	// interface related

	_backIconColor (): string
	{
		return this.isRoot ? 'red' : 'black';
	}

}
