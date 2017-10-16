import { Roles } from '../app.enum';

export class User
{

	$key: string;
	firstName: string;
	lastName: string;
	email: string;
	photo: string;
    gender: string;
    role: Roles;

    constructor(object?: any)
    {
        object = object ? object : {};
        this.$key = object.$key ? object.$key : '';
        this.firstName = object.firstName ? object.firstName : '';
        this.lastName = object.lastName ? object.lastName : '';
        this.email = object.email ? object.email : '';
        this.photo = object.photo ? object.photo : 'https://firebasestorage.googleapis.com/v0/b/firebase-jamdeck.appspot.com/o/guest-account.jpg?alt=media&token=21649e0f-55c3-4d35-ba22-abd9cb100774';
        this.gender = object.gender ? object.gender : '';
        this.role = object.role ? object.role : Roles.unknown;
    }

    public setLoading()
    {
        if( ! this.photo )
            this.photo = 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif';
    }

}
