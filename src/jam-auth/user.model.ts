import { IData } from './../jam-firestore/models/i-data.model';

export class User implements IData
{

    key: string;
    email: string;
    firstName: string;
    lastName: string;
    displayName: string;
    photoURL: string;

    constructor ( object?: any )
    {
        object = object || {};
        this.key = object.key || '';
        this.email = object.email || '';
        this.firstName = object.firstName || '';
        this.lastName = object.lastName || '';
        this.displayName = object.displayName || '';
        this.photoURL = object.photoURL || 'https://firebasestorage.googleapis.com/v0/b/firebase-jamdeck.appspot.com/o/guest-account.jpg?alt=media&token=21649e0f-55c3-4d35-ba22-abd9cb100774';
    }

    public toObject ()
    {
        return {
            key: this.key,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            displayName: this.displayName,
            photoURL: this.photoURL
        }
    }

}