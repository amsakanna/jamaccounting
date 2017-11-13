import { Roles } from "../enums/roles.enum";

export class User
{

	key: string;
    email: string;
    password: string;
	firstName: string;
	lastName: string;
	photo: string;

    constructor( object?: any )
    {
        object = object || {};
        this.key = object.key || '';
        this.email = object.email || '';
        this.password = object.password || '';
        this.firstName = object.firstName || '';
        this.lastName = object.lastName || '';
        this.photo = object.photo || 'https://firebasestorage.googleapis.com/v0/b/firebase-jamdeck.appspot.com/o/guest-account.jpg?alt=media&token=21649e0f-55c3-4d35-ba22-abd9cb100774';
    }

    public toObject() {
        return {
            key: this.key,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            photo: this.photo
        }
    }

    public setLoading()
    {
        if( ! this.photo )
            this.photo = 'https://firebasestorage.googleapis.com/v0/b/firebase-jamdeck.appspot.com/o/loading.gif?alt=media&token=bad2f529-3519-4120-935b-8a94c699c5f2';
    }

}
