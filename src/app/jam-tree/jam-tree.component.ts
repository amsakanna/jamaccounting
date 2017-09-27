import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FlatTree } from "../models/flat-tree.model";

@Component({
	selector: 'jam-tree',
	templateUrl: './jam-tree.component.html',
	styleUrls: ['./jam-tree.component.css']
})
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

	ngOnInit()
	{
		this.text = this.node[this.displayTextProperty];
		this.childNodes = this.tree.getChildren( this.node );
		this.isActive = this.tree.isAncestor( this.selectedNode, this.node );
	}

	constructor()
	{
		this.selectNode = new EventEmitter<any>();
	}

	private get selected() : boolean
	{
		return ( this.selectedNode ) && ( this.node ) && ( this.selectedNode == this.node );
	}

	_handleAccordionToggle( expanded: boolean )
	{
		this.selectNode.emit( this.node );
	}
	
	_handleChildNodeSelect( node: any )
	{
		this.selectNode.emit( node );
	}

}
