import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import { EventManager, EventTypes, Events, AuthEvent } from '../../jam-event-manager/jam-event-manager';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { EventStatus } from '../../jam-event-manager/jam-event-manager';

@Injectable()
export class AuthService
{

	public auth: Observable<Auth>;

	constructor(private angularFireAuth: AngularFireAuth,
				private eventManager: EventManager)
	{

		this.auth = this.angularFireAuth.authState
		.map( firebaseUser => {
			return new Auth( firebaseUser );
		});

		this.eventManager.authEvents
		.filter( event => event.status == EventStatus.Requested )
		.subscribe( ( event: AuthEvent ) => {
			switch ( event.name ) {
				// case Events.RegisterRequested:
				// 	this.register( event.user as User );
				// 	break;
				// case Events.SignInRequested:
				// 	this.signIn( event.user as User );
				// 	break;
				case Events.SignOut:
					this.signOut();
					break;
				default:
					break;
			}
		});
	}

	public register( user )
	{
		console.log( 'registering user', user );
		this.eventManager.emitAuthEvent( Events.Register, EventStatus.Started );
		this.angularFireAuth.auth
		.createUserWithEmailAndPassword( user.email, user.password )
		.then( authState => {
			this.eventManager.emitAuthEvent( Events.Register, EventStatus.Succeeded, user );
		})
		.catch( ( error: any ) => {
			if( error.code == 'auth/email-already-in-use' ) {
				alert( 'This email id already exists. You cannot register again.' );
			} else {
				alert( error.code + '\n' + error.message );
			}
			this.eventManager.emitAuthEvent( Events.Register, EventStatus.Failed );
		});
	}

	public signIn( user: User )
	{
		this.eventManager.emitAuthEvent( Events.SignIn, EventStatus.Started );
		this.angularFireAuth.auth
		.signInWithEmailAndPassword( user.email, user.password )
		.then( authState => {
			this.eventManager.emitAuthEvent( Events.SignIn, EventStatus.Succeeded );
		})
		.catch( ( error: any ) => {
			if( error.code == 'auth/user-not-found' ) {
				alert( 'You do not have an account. Please register.' );
			} else {
				alert( error.code + '\n' + error.message );
			}
			this.eventManager.emitAuthEvent( Events.SignIn, EventStatus.Failed );
		});
	}

	public signOut()
	{
		this.eventManager.emitAuthEvent( Events.SignOut, EventStatus.Started );
		this.angularFireAuth.auth.signOut()
		.then( () => this.eventManager.emitAuthEvent( Events.SignOut, EventStatus.Succeeded ) )
		.catch( () => this.eventManager.emitAuthEvent( Events.SignOut, EventStatus.Failed ) );
	}

	public deleteAccount() : Promise<any>
	{
		return this.angularFireAuth.auth.currentUser.delete();
	}

}