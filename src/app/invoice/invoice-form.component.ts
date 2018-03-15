import { Component, OnInit } from "@angular/core";
import { InvoiceService } from "./invoice.service";
import { FormArray, FormGroup, FormControl, Validators } from "@angular/forms";
import { MatTableDataSource } from "@angular/material";
import { VoucherLine } from "../model";

@Component( {
	selector: 'app-invoice-form',
	templateUrl: './invoice-form.component.html',
	styleUrls: [ './invoice-form.component.css' ]
} )
export class InvoiceFormComponent implements OnInit
{
	private displayedColumns: string[];
	private dataSource: MatTableDataSource<VoucherLine>;

	constructor ( private $: InvoiceService )
	{
		this.displayedColumns = [
			'sno',
			'name',
			'units',
			'rate',
			'discount',
			'tax',
			'amount',
			'action'
		];
	}

	ngOnInit (): void
	{
		this.$.create();
		this.$.store.select( 'creating' )
			.filter( creating => creating )
			.subscribe( creating =>
			{
				this.$.formItem.lines = [];
				this.addLineItem();
			} );
		const linesFormArray = this.$.form.controls[ 'lines' ] as FormArray;
		linesFormArray.valueChanges.subscribe( ( lines: any[] ) =>
		{
			console.log( lines );
			lines.forEach( ( line, i ) => this.refreshAmount( i ) );
		} );
	}

	private refreshDatasource ( lines: VoucherLine[] ): void
	{
		this.dataSource = new MatTableDataSource( lines );
	}

	private inventoryChange ( index: number ): void
	{
		const lines = this.$.formItem.lines;
		const lastLineIndex = lines.length - 1;
		const lastLine = lines[ lines.length - 1 ];

		this.refreshAmount( index );

		if ( index == lastLineIndex && lastLine && lastLine.inventory ) {
			this.addLineItem();
		}
	}

	private refreshAmount ( index: number ): void
	{
		const line = this.$.formItem.lines[ index ];
		if ( !line || !line.inventory ) return;
		const lineFormControls = ( this.$.form.controls[ 'lines' ] as FormArray ).controls[ index ].value;
		line.units = lineFormControls[ 'units' ];
		line.discount = lineFormControls[ 'discount' ];
		const amount = line.inventory.sellingPrice * line.units;
		const discountAmount = amount * ( line.discount / 100 );
		this.$.formItem.lines[ index ].amount = amount - discountAmount;
		const subtotal = this.$.formItem.lines.reduce( ( result, line ) => result + line.amount || 0, 0 );
		const adjustment = Math.round( subtotal ) - subtotal;
		const total = subtotal + adjustment - ( this.$.formItem.discountAmount || 0 );
		this.$.formItem = {
			...this.$.formItem,
			subtotal: subtotal,
			adjustment: adjustment,
			total: total
		};
	}

	private addLineItem (): void
	{
		this.$.formItem.lines.push( {
			sno: null,
			inventoryKey: '',
			inventory: null,
			units: 1,
			discount: 0,
			isFlatDiscount: false,
			amount: 0
		} );
		const linesFormArray = this.$.form.controls[ 'lines' ] as FormArray;
		linesFormArray.push( new FormGroup( {
			name: new FormControl( null ),
			units: new FormControl( 1, Validators.min( 1 ) ),
			discount: new FormControl( 0, Validators.min( 0 ) )
		} ) );
		// linesFormArray.controls.forEach( lineFormGroup =>
		// {
		// 	lineFormGroup.get( 'name' ).valueChanges().subscribe( value =>  );
		// });
		this.refreshDatasource( this.$.formItem.lines );
	}

	private removeLineItem ( index: number ): void
	{
		this.$.formItem.lines = this.$.formItem.lines.filter( ( line, i ) => i != index );
		const linesFormArray = this.$.form.controls[ 'lines' ] as FormArray;
		linesFormArray.removeAt( index );
		this.refreshDatasource( this.$.formItem.lines );
	}
}
