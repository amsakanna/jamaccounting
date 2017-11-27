import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { DatabaseService } from '../shared/database.service';
import { UserModuleState } from './user.state';
import { User } from '../../jam-auth/jam-auth';
import { UserAccount } from './user-account.model';

@Injectable()
export class UserService
{

	public user: User;
	public userAccount: UserAccount;
	public loadStatus: Observable<boolean>;

	constructor ( private store: Store<UserModuleState>, private db: DatabaseService )
	{
		this.loadStatus = new Observable<boolean>();

		this.loadStatus = this.store.select( state => state.authState )
			.switchMap( ( authState ): Observable<User> =>
			{
				return authState.authenticated
					? ( this.user && this.user.key && this.user.email == authState.user.email )
						? Observable.of( this.user )
						: Observable.fromPromise( this.db.tables.User.forceLookup( authState.user, authState.user.email, 'email' ) )
					: Observable.of( null );
			} )
			.switchMap( ( user ): Observable<UserAccount> =>
			{
				this.user = user;
				return user
					? Observable.fromPromise( this.db.tables.UserAccount.forceLookup( new UserAccount( { key: user.key, email: user.email } ), user.key ) )
					: Observable.of( null );
			} )
			.map( userAccount =>
			{
				this.userAccount = userAccount;
				return !!userAccount
			} )
	}

}
