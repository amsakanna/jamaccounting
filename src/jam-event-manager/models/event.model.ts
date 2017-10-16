import { Subject } from "rxjs/Subject";
import { EventTypes } from "../enums/event-types.enum";
import { Events } from "../enums/events.enum";

export interface IEvent
{
    name: string;
    type: string;
    triggerEvents: Array<Subject<Event>>;
}

export class Event implements IEvent
{
    public name: string;
    public type: string;
    public triggerEvents: Array<Subject<Event>>;
    public get id(): string
    {
        return this.type + '-' + this.name;
    }

    constructor( name: string )
    {
        this.name = name;
        this.type = EventTypes.None.toString();
        this.triggerEvents = [];
    }
}

export class AuthEvent extends Event
{
    public errorCode: string;
    public returnUrl: string;

    constructor( name: string, errorCode?: string, returnUrl?: string )
    {
        super( name );
        this.type = EventTypes.AuthEvent.toString();
        this.errorCode = errorCode || '';
        this.returnUrl = returnUrl || '/';
    }
}

export class NavigationEvent extends Event
{
    public errorCode: string;

    constructor( name: string, errorCode?: string )
    {
        super( name );
        this.type = EventTypes.NavigationEvent.toString();
    }
}

export class PageRequestEvent extends Event
{
    constructor( name: string )
    {
        super( name );
        this.type = EventTypes.PageRequestEvent.toString();
    }
}
