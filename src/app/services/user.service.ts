import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EventManager, Events, AuthEvent } from '../../jam-event-manager/jam-event-manager';
import { DatabaseService } from './database.service';
import { User, AuthService } from '../../jam-auth/jam-auth';
import { UserAccount } from '../models/user-account.model';

@Injectable()
export class UserService
{

	public user: User;
	public userAccount: UserAccount;
	public loadStatus: Observable<boolean>;

	constructor(private eventManager: EventManager,
				private db: DatabaseService,
				private authService: AuthService)
	{
		this.loadStatus = new Observable<boolean>();

		this.loadStatus = this.authService.auth
		.switchMap( ( auth ) : Observable<User> => {
			return auth.authenticated
				? ( this.user && this.user.key && this.user.email == auth.user.email )
					? Observable.of( this.user )
					: Observable.fromPromise( this.db.tables.User.forceLookup( auth.user, auth.user.email, 'email' ) )
				: Observable.of( null );
		})
		.switchMap( ( user ) : Observable<UserAccount> => {
			this.user = user;
			return user
				? Observable.fromPromise( this.db.tables.UserAccount.forceLookup( new UserAccount( { key: user.key, email: user.email } ), user.key ) )
				: Observable.of( null );
		})
		.map( userAccount => {
			this.userAccount = userAccount;
			return !! userAccount
		})
	}

}
