import { Component, OnInit } from '@angular/core';
import { EventManager } from '../../jam-event-manager/jam-event-manager';
import { MyEvents } from '../models/event.model';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit
{
	
	constructor(private eventManager: EventManager) {}
	
	ngOnInit() {}

	private gotoRegisterPage()
	{
		this.eventManager.emitPageRequestEvent( MyEvents.RegisterPageRequested );
	}
	
}
