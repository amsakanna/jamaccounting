import { Error } from './error.model';
import { Status, DatabaseOperation } from '../app.enum';

export class DataServiceObject
{

    operation: DatabaseOperation;
    status: Status;
    oldObject: any;
    object: any;
    readonly objectWithoutKey: any;
    error: Error;
    isValidKey: boolean;

    constructor({operation, object}) 
    {
        this.operation = operation;
        this.object = object;
        this.objectWithoutKey = Object.assign({}, object);
        if (this.objectWithoutKey != null && this.objectWithoutKey.$key != undefined)
            delete this.objectWithoutKey.$key;
    }

}
