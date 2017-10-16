import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Event, AuthEvent, PageRequestEvent, NavigationEvent } from '../models/event.model';

@Injectable()
export class EventManager
{

    public triggerEvents: Array<Array<Subject<Event>>>;

    public allEvents: Subject<Event>;
    public authEvents: Subject<Event>;
    public pageRequestEvents: Subject<Event>;
    public navigationEvents: Subject<Event>;
    public logEvents: Subject<Event>;

	constructor()
	{
        this.triggerEvents = new Array<Array<Subject<Event>>>();
        this.allEvents = new Subject<Event>();
        this.authEvents = new Subject<Event>();
        this.pageRequestEvents = new Subject<Event>();
        this.navigationEvents = new Subject<Event>();
        this.logEvents = new Subject<Event>();
    }

    public addTriggerEvents( triggerEvents: Array<Array<Subject<Event>>> )
    {
        // Loop through keys of events to be added
        Object.keys( triggerEvents ).forEach( key => {

            // Ensure existing events for the key
            this.triggerEvents[key] = this.triggerEvents[key] || [];

            // Add new events for the key            
            this.triggerEvents[key] = [ ...this.triggerEvents[key], ...triggerEvents[key] ];

            // Remove duplicate events
            var uniqueEvents = new Set<Subject<Event>>( this.triggerEvents[key] );
            this.triggerEvents[key] = [ ...Array.from( uniqueEvents ) ];

        });

        console.log( 'triggerEvents', this.triggerEvents );
    }
    
	public emit( event: Event )
	{
        // Add trigger events to existing array
        event.triggerEvents = [ ...event.triggerEvents, ...this.triggerEvents[event.type] || [], ...this.triggerEvents[event.id] || [] ];

        // Remove duplicate events
        var uniqueEvents = new Set<Subject<Event>>( event.triggerEvents );
        event.triggerEvents = [ ...Array.from( uniqueEvents ) ];

        // Loop through the list and trigger each event
        event.triggerEvents.forEach( triggerEvent =>
        {
            console.log( 'emitting', event.id );
            triggerEvent.next( event );
        });
        // this.allEvents.next( event );
    }
    
    public emitAuthEvent( name: string, errorCode?: string, returnUrl?: string )
    {
        const event = new AuthEvent( name, errorCode, returnUrl );
        this.emit( event );
    }
    
    public emitPageRequestEvent( name: string )
    {
        const event = new PageRequestEvent( name );        
        this.emit( event );
    }
    
    public emitNavigationEvent( name: string, errorCode?: string )
    {
        const event = new NavigationEvent( name, errorCode );
        this.emit( event );
    }

}