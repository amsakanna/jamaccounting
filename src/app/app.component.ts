import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AngularFirestore } from 'angularfire2/firestore';
import { IJamXboxMenuItem } from './jam-xbox-menu/jam-xbox-menu.component';
import { AuthService } from '../jam-auth/services/auth.service';
import { Navigator } from './services/navigator.service';
import { Auth } from '../jam-auth/models/auth.model';
import { Event, Events, EventTypes, EventManager } from '../jam-event-manager/jam-event-manager';
import { MyEvents } from './models/event.model';
import { DatabaseOperations } from '../jam-firestore/jam-firestore';
import { EventStatus } from '../jam-event-manager/jam-event-manager';
import { Pages } from './enums/pages.enum';

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
				private navigator: Navigator,
				private authService: AuthService)
	{
		this.eventManager.addTriggerEvents( this.triggerEvents );
		this.authService.auth.subscribe( auth => this.auth = auth );
	}

	ngOnInit() {}

	private goto( page: string )
	{
		switch ( page ) {
			case 'home':
				this.eventManager.emitPageRequestEvent( Pages.Home, EventStatus.Requested );
				break;
			case 'user':
				this.eventManager.emitPageRequestEvent( Pages.User, EventStatus.Requested );
				break;
			default:
				break;
		}
	}

	private select( menuItem: IJamXboxMenuItem )
	{
		if( menuItem.$key == Events.SignOut ) {
			this.eventManager.emitAuthEvent( Events.SignOut, EventStatus.Requested );
		} else {
			const token = this.eventManager.emitPageRequestEvent( menuItem.$key, EventStatus.Requested );
		}
	}

	private get triggerEvents() : Array<Array<Subject<Event>>>
	{
		var t = new Array<Array<Subject<Event>>>();

		t[Event.createId( EventTypes.AuthEvent, Events.Register, EventStatus.Requested )] = [ this.eventManager.authEvents ];
		t[Event.createId( EventTypes.AuthEvent, Events.SignOut, EventStatus.Requested )] = [ this.eventManager.authEvents ];

		t[Event.createId( EventTypes.AuthEvent, Events.Register, EventStatus.Succeeded )] = [ this.eventManager.databaseEvents, this.eventManager.navigationEvents ];
		t[Event.createId( EventTypes.AuthEvent, Events.SignIn, EventStatus.Succeeded )] = [ this.eventManager.databaseEvents, this.eventManager.navigationEvents ];
		t[Event.createId( EventTypes.AuthEvent, Events.SignOut, EventStatus.Succeeded )] = [ this.eventManager.navigationEvents ];

		t[EventTypes.PageRequestEvent] = [ this.eventManager.navigationEvents ];
		t[Event.createId( EventTypes.DatabaseEvent, DatabaseOperations.Insert, EventStatus.Succeeded )] = [ this.eventManager.navigationEvents ];

		return t;
	}

}

