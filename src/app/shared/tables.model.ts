import { Data } from "../../jam/model-library";
import { Table } from "../../jam/firestore";
import { User } from '../../jam/auth';
import
{
	UserAccount,
	Company,
	Account,
	Product,
	ProductCategory,
	Inventory,
	TaxType,
	Tax,
	TaxGroup,
	Brand,
	Party,
	Invoice
} from '../model';
import { AddressClass } from '../model/address-class.model';

export class Tables
{
	public Temp: Table<Data>;
	public User: Table<User>;
	public UserAccount: Table<UserAccount>;
	public PresetAccount: Table<Account>;
	public Company: Table<Company>;
	public Address: Table<AddressClass>;
	public Account: Table<Account>;
	public Product: Table<Product>;
	public ProductCategory: Table<ProductCategory>;
	public Brand: Table<Brand>;
	public Inventory: Table<Inventory>;
	public Tax: Table<Tax>;
	public TaxType: Table<TaxType>;
	public TaxGroup: Table<TaxGroup>;
	public Party: Table<Party>;
	public Invoice: Table<Invoice>;

	constructor () { }

}
