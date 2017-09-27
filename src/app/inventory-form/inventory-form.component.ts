import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { InventoryService } from "../services/inventory.service";
import { InventoryItem } from "../models/inventory-item.model";
import { FlatTree } from "../models/flat-tree.model";

@Component({
	selector: 'app-inventory-form',
	templateUrl: './inventory-form.component.html',
	styleUrls: ['./inventory-form.component.css']
})
export class InventoryFormComponent implements OnInit
{

	private formGroup: FormGroup;
	private inventoryItem: InventoryItem;
	private inventoryTree: FlatTree<InventoryItem>;
	
	ngOnInit() {}
	constructor(private activatedRoute: ActivatedRoute,
				private router: Router,
				private formBuilder: FormBuilder,
				private inventoryService: InventoryService)
	{

		this.inventoryItem = this.inventoryService.tree.selectedItem;
		var routeKey = this.activatedRoute.snapshot.params['key'] || '';
		if( routeKey == 'new' ) {
			this.inventoryItem = new InventoryItem( this.inventoryService.tree.getParent( this.inventoryService.tree.selectedItem ) );
			this.inventoryItem.parentKey = this.inventoryItem.$key;
			this.inventoryItem.$key = '';
			this.inventoryItem.id = '';
			this.inventoryItem.name = '';
		} else if( routeKey != this.inventoryService.tree.selectedItem.$key ) {
			this.inventoryService.tree.select( routeKey );
			this.router.navigateByUrl( '/inventory/' + this.inventoryService.tree.selectedItem.$key + '/edit' );
		} else {
			
		}

		this.inventoryTree = this.inventoryService.tree;

		this.formGroup = this.formBuilder.group({
			name: [ this.inventoryItem.name, Validators.required ],
			parent: [ '' ]
		});
	}

	submit()
	{
		var inventoryItem = new InventoryItem({
			$key: this.inventoryItem.parentKey + this.formGroup.controls['name'].value,
			name: this.formGroup.controls['name'].value,
			parentKey: this.inventoryItem.parentKey
		});
		this.inventoryService.upsert( inventoryItem );
	}

}
