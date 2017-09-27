import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Menu } from "../models/menu.model";

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	private menu: Menu;

	ngOnInit() {}

	constructor(private router: Router)
	{
		this.menu = new Menu( { text: 'root' } );
		var submenu = new Menu( { text: 'Masters', children: [
			new Menu( { text: 'Accounts' } ),
			new Menu( { text: 'Ledgers' } ),			
			new Menu( { text: 'Tags' } ),
			new Menu( { text: 'Unit of Measures' } ),
		] } );
		this.menu.children.push( submenu );

	}

	public selectMenuItem( menuItem: Menu )
	{
		this.router.navigateByUrl( menuItem.text );
	}

	goto( page: string )
	{
		this.router.navigateByUrl( page );
	}

}
