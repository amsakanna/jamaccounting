import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../jam-auth/jam-auth';

@Component({
	selector: 'app-profile-page',
	templateUrl: './profile-page.component.html',
	styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit
{

	private user: User;

	constructor(private authService: AuthService)
	{
		this.authService.auth.subscribe( auth => {
			this.user = auth.user;
		});
	}

	ngOnInit() {}

}
