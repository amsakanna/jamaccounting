import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FlatTree } from '../../jam-model-library/jam-model-library';

@Component( {
	selector: 'jam-tree',
	templateUrl: './jam-tree.component.html',
	styleUrls: [ './jam-tree.component.css' ]
} )
export class JamTreeComponent implements OnInit
{

	@Input() tree: FlatTree<any>;
	@Input() node: any;
	@Input() displayTextProperty: string;
	@Input() selectedNode: any;
	@Output() selectNode: EventEmitter<any>;
	private text: string;
	private childNodes: Array<any>;
	private isActive: boolean;

	constructor ()
	{
		this.selectNode = new EventEmitter<any>();
	}

	ngOnInit ()
	{
		this.text = this.node[ this.displayTextProperty ];
		this.childNodes = this.tree.getChildren( this.node );
		this.isActive = this.tree.isAncestor( this.selectedNode, this.node );
	}

	ngOnChanges ( changes: SimpleChanges )
	{
		this.isActive = this.isActive || this.tree.isAncestor( this.selectedNode, this.node );
	}

	private get selected (): boolean
	{
		return ( this.selectedNode ) && ( this.node ) && ( this.selectedNode == this.node );
	}

	_handleAccordionToggle ( expanded: boolean )
	{
		this.selectNode.emit( this.node );
	}

	_handleChildNodeSelect ( node: any )
	{
		this.selectNode.emit( node );
	}

}
