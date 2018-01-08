export enum Pages
{
    Home = '/',
    Register = '/register',
    SignIn = '/sign-in',
    Pricing = '/pricing',

    Profile = '/user',
    MyPlan = '/user/my-plan',
    Settings = '/user/settings',
    User = '/user/companies',

    Companies = '/user/companies',
    CreateCompany = '/user/companies/@create',
    Company = '/company/:company',

    Accounts = '/company/:company/account',
    CreateAccount = '/company/:company/account/@create',
    Account = '/company/:company/account/:account',
    EditAccount = '/company/:company/account/:account/edit',

    Products = '/company/:company/product',
    Product = '/company/:company/product/:product',

    ProductCategories = '/company/:company/product-category',
    ProductCategory = '/company/:company/product-category/:product-category',

    Inventory = '/company/:company/inventory',
    InventoryItem = '/company/:company/inventory/:inventory',

    Vouchers = '/company/:company/voucher',
    Voucher = '/company/:company/voucher/:voucher',

    Taxes = '/company/:company/tax',
    Tax = '/company/:company/tax/:tax'

}