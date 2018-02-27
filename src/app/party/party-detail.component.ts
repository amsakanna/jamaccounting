import { Component } from "@angular/core";
import { PartyService } from "./party.service";

@Component( {
	selector: 'app-party-detail',
	templateUrl: './party-detail.component.html',
	styleUrls: [ './party-detail.component.css' ]
} )
export class PartyDetailComponent
{
	constructor ( private $: PartyService ) { }
}
