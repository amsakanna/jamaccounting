import { Table } from "../../jam-firestore/jam-firestore";
import { Address } from "./address.model";
import { Company } from "./company.model";

export class Tables
{
	public Temp: Table<any>;
	public Address: Table<Address>;
	public Company: Table<Company>;
}