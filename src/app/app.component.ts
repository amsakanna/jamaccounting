import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	template: `
		<div class="container">
			<router-outlet>
			</router-outlet>
		</div>
	`,
	styles: [`
		.container {
			width: 100%;
			height: 100%;
		}
	`]
})
export class AppComponent {}
