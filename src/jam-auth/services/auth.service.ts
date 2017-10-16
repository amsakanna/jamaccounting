import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import { EventManager, Event, EventTypes, Events } from '../../jam-event-manager/jam-event-manager';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';

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
		.filter( event => event.name == Events.SignOutRequested )
		.subscribe( event => {
			this.signOut();			
		});
	}

	public register( user )
	{
		console.log( 'user', user );
		this.eventManager.emitAuthEvent( Events.RegisterInitiated );
		this.angularFireAuth.auth
		.createUserWithEmailAndPassword( user.email, user.password )
		.then( authState => {
			this.eventManager.emitAuthEvent( Events.Registered );
		})
		.catch( ( error: any ) => {
			if( error.code == 'auth/email-already-in-use' ) {
				alert( 'This email id already exists. You cannot register again.' );
			} else {
				alert( error.code + '\n' + error.message );
			}
			this.eventManager.emitAuthEvent( Events.RegisterFailed );
		});
	}

	public signIn( user: User )
	{
		this.eventManager.emitAuthEvent( Events.SignInInitiated );
		this.angularFireAuth.auth
		.signInWithEmailAndPassword( user.email, user.password )
		.then( authState => {
			this.eventManager.emitAuthEvent( Events.SignedIn );
		})
		.catch( ( error: any ) => {
			if( error.code == 'auth/user-not-found' ) {
				alert( 'You do not have an account. Please register.' );
			} else {
				alert( error.code + '\n' + error.message );
			}
			this.eventManager.emitAuthEvent( Events.SignInFailed );
		});
	}

	public signOut()
	{
		this.eventManager.emitAuthEvent( Events.SignOutInitiated );
		this.angularFireAuth.auth.signOut()
		.then( () => this.eventManager.emitAuthEvent( Events.SignedOut ) )
		.catch( () => this.eventManager.emitAuthEvent( Events.SignOutFailed ) );
	}

}