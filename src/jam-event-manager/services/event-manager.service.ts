import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Event, AuthEvent, PageRequestEvent, NavigationEvent, DatabaseEvent } from '../models/event.model';
import { EventStatus } from '../enums/event-status.enum';
import { KeyValue } from '../../jam-model-library/jam-model-library';

@Injectable()
export class EventManager
{

    public triggerEvents: Array<Array<Subject<Event>>>;

    public allEvents: Subject<Event>;
    public authEvents: Subject<Event>;
    public pageRequestEvents: Subject<Event>;
    public navigationEvents: Subject<Event>;
    public databaseEvents: Subject<Event>;
    public logEvents: Subject<Event>;

    constructor ()
    {
        this.triggerEvents = new Array<Array<Subject<Event>>>();
        this.allEvents = new Subject<Event>();
        this.authEvents = new Subject<Event>();
        this.pageRequestEvents = new Subject<Event>();
        this.navigationEvents = new Subject<Event>();
        this.databaseEvents = new Subject<Event>();
        this.logEvents = new Subject<Event>();
    }

    public addTriggerEvents ( triggerEvents: Array<Array<Subject<Event>>> )
    {
        console.log( 'adding-trigger-events', triggerEvents );
        // Loop through keys of events to be added
        Object.keys( triggerEvents ).forEach( key =>
        {

            // Ensure existing events for the key
            this.triggerEvents[ key ] = this.triggerEvents[ key ] || [];

            // Add new events for the key
            this.triggerEvents[ key ] = [ ...this.triggerEvents[ key ], ...triggerEvents[ key ] ];

            // Remove duplicate events
            var uniqueEvents = new Set<Subject<Event>>( this.triggerEvents[ key ] );
            this.triggerEvents[ key ] = [ ...Array.from( uniqueEvents ) ];

        } );
    }

    public triggerSubsequentEvents ( event: Event )
    {
        // Add trigger events to existing array
        event.triggerEvents = [
            ...event.triggerEvents,
            ...this.triggerEvents[ event.type ] || [],
            ...this.triggerEvents[ event.type + '-' + event.name ] || [],
            ...this.triggerEvents[ event.id ] || []
        ];

        console.log( this.triggerEvents );
        // Remove duplicate events
        var uniqueEvents = new Set<Subject<Event>>( event.triggerEvents );
        event.triggerEvents = [ ...Array.from( uniqueEvents ) ];

        // Loop through the list and trigger each event
        event.triggerEvents.forEach( triggerEvent =>
        {
            console.log( 'triggering', event.id );
            triggerEvent.next( event );
        } );
        // this.allEvents.next( event );
    }

    public emitAuthEvent ( name: string, status: EventStatus, user?: any, errorCode?: string, returnUrl?: string )
    {
        const event = new AuthEvent( name, status, user, errorCode, returnUrl );
        console.log( 'emitting', event.id );
        this.triggerSubsequentEvents( event );
    }

    public emitPageRequestEvent ( name: string, status: EventStatus, urlParams?: Array<KeyValue> )
    {
        const event = new PageRequestEvent( name, status, urlParams );
        console.log( 'emitting', event.id );
        this.triggerSubsequentEvents( event );
    }

    public emitNavigationEvent ( name: string, status: EventStatus, urlParams?: Array<KeyValue>, errorCode?: string )
    {
        const event = new NavigationEvent( name, status, urlParams, errorCode );
        console.log( 'emitting', event.id );
        this.triggerSubsequentEvents( event );
    }

    public emitDatabaseEvent ( name: string, status: EventStatus, tableName: string, data: any, errorCode?: string )
    {
        const event = new DatabaseEvent( name, status, tableName, data, errorCode );
        console.log( 'emitting', event.id );
        this.triggerSubsequentEvents( event );
    }

}