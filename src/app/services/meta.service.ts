import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class InterfaceMetaService
{
	public loadStatus: ReplaySubject<boolean>;

	constructor()
	{
		this.loadStatus = new ReplaySubject<boolean>();

		/* TO BE COMPLETED */
		// this.loadStatus.next( true );
	}

}