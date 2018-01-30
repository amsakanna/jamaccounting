import { NgModule, ModuleWithProviders } from '@angular/core';
import { MatSnackBarModule } from '@angular/material';
import { NotificationService } from './jam-notification.service';

@NgModule( {
	imports: [ MatSnackBarModule ],
	providers: [ NotificationService ]
} )
export class JamNotificationModule
{
	static forRoot (): ModuleWithProviders
	{
		return {
			ngModule: JamNotificationModule,
			providers: [
				NotificationService
			]
		};
	}
}
