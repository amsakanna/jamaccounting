import { Component } from "@angular/core";
import { Link } from "../../jam/ui-library/jam-explorer-side-nav/link.model";
import { Pages } from '../model';

@Component( {
	selector: 'app-master',
	templateUrl: './master.component.html',
	styles: [ './master.component.css' ]
} )
export class MasterComponent
{
	private masterLinks: Link[];

	constructor ()
	{
		this.masterLinks = [
			{ name: 'Product', path: Pages.Product },
			{ name: 'Product Category', path: Pages.ProductCategory }
		]
	}
}
