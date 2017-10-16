import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatButtonModule, MatInputModule, MatSelectModule } from '@angular/material';

import { JamEventManagerModule } from '../jam-event-manager/jam-event-manager';

import { ReadableErrorPipe } from './pipes/readable-error.pipe';
import { AuthService } from './services/auth.service';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
            MatButtonModule,
            MatInputModule,
            MatSelectModule,
        FormsModule,
            ReactiveFormsModule,
        JamEventManagerModule.forRoot()
    ],
    declarations: [
        ReadableErrorPipe,
        SignInComponent,
        RegisterComponent
    ],
    providers: [AuthService],
    exports: [
        SignInComponent,
        RegisterComponent
    ]
})
export class JamAuthModule
{
    static forRoot(): ModuleWithProviders
    {
        return {
            ngModule: JamAuthModule,
            providers: [AuthService]
        }
    }
}