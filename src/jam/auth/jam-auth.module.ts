import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatButtonModule, MatInputModule, MatSelectModule } from '@angular/material';
import { ReadableErrorPipe } from './readable-error.pipe';
import { AuthGuard } from './auth-guard.service';
import { SignInComponent } from './sign-in.component';
import { RegisterComponent } from './register.component';

@NgModule( {
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule
    ],
    declarations: [ ReadableErrorPipe, SignInComponent, RegisterComponent ],
    providers: [ AuthGuard ],
    exports: [ SignInComponent, RegisterComponent ]
} )
export class JamAuthModule
{
    static forRoot (): ModuleWithProviders
    {
        return {
            ngModule: JamAuthModule,
            providers: [ AuthGuard ]
        };
    }
}