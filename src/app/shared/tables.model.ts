import { Data } from "../../jam/model-library";
import { Table } from "../../jam/firestore";
import { User } from '../../jam/auth';
import
{
	UserAccount,
	Company,
	Address,
	Account,
	Product,
	ProductCategory,
	Inventory,
	Tax
} from '../model';

export class Tables
{
	public Temp: Table<Data>;
	public User: Table<User>;
	public UserAccount: Table<UserAccount>;
	public PresetAccount: Table<Account>;
	public Company: Table<Company>;
	public Address: Table<Address>;
	public Account: Table<Account>;
	public Product: Table<Product>;
	public ProductCategory: Table<ProductCategory>;
	public Inventory: Table<Inventory>;
	public Tax: Table<Tax>;

	constructor () { }

}