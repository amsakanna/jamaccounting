import { Subject } from "rxjs/Subject";
import { EventTypes } from "../enums/event-types.enum";
import { Events } from "../enums/events.enum";
import { KeyValue } from '../../jam-model-library/jam-model-library';
import { EventStatus } from "../enums/event-status.enum";

export interface IEvent
{
    name: string;
    type: string;
    status: EventStatus;
    triggerEvents: Array<Subject<Event>>;
}

export class Event implements IEvent
{
    public name: string;
    public type: string;
    public status: EventStatus;
    public triggerEvents: Array<Subject<Event>>;
    public static IFS = '-';

    constructor ( name: string, type: string, status: EventStatus )
    {
        this.name = name || '';
        this.type = type || EventTypes.None.toString();
        this.status = status || EventStatus.None;
        this.triggerEvents = [];
    }

    public static createId ( type?: string, name?: string, status?: string )
    {
        return ( type || '' ) + Event.IFS
            + ( name || '' ) + Event.IFS
            + status;
    }

    public get id (): string
    {
        return this.type + Event.IFS
            + this.name + Event.IFS
            + this.status;
    }
}

export class AuthEvent extends Event
{
    public user: any;
    public errorCode: string;
    public returnUrl: string;

    constructor ( name: string, status: EventStatus, user?: any, errorCode?: string, returnUrl?: string )
    {
        super( name, EventTypes.AuthEvent.toString(), status );
        this.user = user;
        this.errorCode = errorCode || '';
        this.returnUrl = returnUrl || '/';
    }
}

export class NavigationEvent extends Event
{
    public urlParams: Array<KeyValue>;
    public errorCode: string;

    constructor ( name: string, status: EventStatus, urlParams?: Array<KeyValue>, errorCode?: string )
    {
        super( name, EventTypes.NavigationEvent.toString(), status );
        this.urlParams = urlParams;
        this.errorCode = errorCode;
    }
}

export class PageRequestEvent extends Event
{
    public urlParams: Array<KeyValue>;

    constructor ( name: string, status: EventStatus, urlParams?: Array<KeyValue> )
    {
        super( name, EventTypes.PageRequestEvent.toString(), status );
        this.urlParams = urlParams;
    }
}

export class DatabaseEvent extends Event
{
    public tableName: string;
    public data: any;
    public errorCode: string;

    constructor ( name: string, status: EventStatus, tableName: string, data: any, errorCode?: string )
    {
        super( name, EventTypes.DatabaseEvent.toString(), status );
        this.tableName = tableName;
        this.data = data;
        this.errorCode = errorCode;
    }
}
