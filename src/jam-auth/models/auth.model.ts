import * as firebase from 'firebase/app'
import { User } from "./user.model";

export class Auth
{

	authenticated: boolean;
	user: User;

    constructor( firebaseUser: firebase.User )
    {
        this.authenticated = !! firebaseUser;
        this.user = this.createUser( firebaseUser );
    }

	public createUser( firebaseUser: firebase.User ) : User
	{
		return new User({
			firstName: firebaseUser ? firebaseUser.displayName : '',
			email: firebaseUser ? firebaseUser.email : '',
			photo: firebaseUser ? firebaseUser.photoURL : '',
		});
	}

}
