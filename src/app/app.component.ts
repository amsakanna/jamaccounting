import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AngularFirestore } from 'angularfire2/firestore';
import { IJamXboxMenuItem } from './jam-xbox-menu/jam-xbox-menu.component';
import { AuthService } from '../jam-auth/services/auth.service';
import { Auth } from '../jam-auth/models/auth.model';
import { Navigator } from './services/navigator.service';
import { Event, Events, EventTypes, EventManager } from '../jam-event-manager/jam-event-manager';
import { MyEvents } from './models/event.model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent
{
	private auth: Auth;
	
	constructor(private db: AngularFirestore,
				private eventManager: EventManager,
				private authService: AuthService,
				private navigator: Navigator)
	{
		this.eventManager.addTriggerEvents( this.triggerEvents );
		this.authService.auth.subscribe( auth => this.auth = auth );
	}
	
	ngOnInit() {}

	private goto( page: string )
	{
		switch ( page ) {
			case 'home':
				this.eventManager.emitPageRequestEvent( MyEvents.HomeRequested );
				break;
			case 'user':
				this.eventManager.emitPageRequestEvent( MyEvents.UserRequested );
				break;
			default:
				break;
		}		
	}

	private select( menuItem: IJamXboxMenuItem )
	{
		if( menuItem.$key == Events.SignOutRequested ) {
			this.eventManager.emitAuthEvent( Events.SignOutRequested );
		} else {
			const token = this.eventManager.emitPageRequestEvent( menuItem.$key );
		}
	}	

	private get triggerEvents() : Array<Array<Subject<Event>>>
	{
		var triggerEvents = new Array<Array<Subject<Event>>>();
		triggerEvents[EventTypes.AuthEvent + '-' + Events.Registered] = [ this.eventManager.navigationEvents ];
		triggerEvents[EventTypes.AuthEvent + '-' + Events.SignedIn] = [ this.eventManager.navigationEvents ];
		triggerEvents[EventTypes.AuthEvent + '-' + Events.SignOutRequested] = [ this.eventManager.authEvents ];
		triggerEvents[EventTypes.AuthEvent + '-' + Events.SignedOut] = [ this.eventManager.navigationEvents ];
		triggerEvents[EventTypes.PageRequestEvent] = [ this.eventManager.navigationEvents ];
		return triggerEvents;
	}
	
}

