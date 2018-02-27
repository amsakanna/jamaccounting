import { Component, ChangeDetectionStrategy } from "@angular/core";
import { MatSelectionListChange } from "@angular/material";
import { TaxGroupService } from "./tax-group.service";
import { Tax } from "../model";

@Component( {
	selector: 'app-tax-group-form',
	templateUrl: './tax-group-form.component.html',
	styleUrls: [ './tax-group-form.component.css' ],
	changeDetection: ChangeDetectionStrategy.OnPush
} )
export class TaxGroupFormComponent
{
	constructor ( private $: TaxGroupService ) { }

	public taxSelectionChange ( event: MatSelectionListChange )
	{
		this.$.formItem.taxes = event.source.selectedOptions.selected.map( item => item.value );
		this.$.formItem.taxesKey = this.$.formItem.taxes.map( tax => tax.key );
	}

	public checkSelect ( key: string )
	{
		return this.$.formItem.taxesKey.includes( key );
	}
}
