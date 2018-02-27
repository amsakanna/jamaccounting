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

    Master = '/company/master',

    Accounts = '/company/:company/account',
    CreateAccount = '/company/:company/account/@create',
    Account = '/company/:company/account/:account',
    EditAccount = '/company/:company/account/:account/edit',

    Product = '/company/:company/product',
    ProductCategory = '/company/:company/product-category',
    Brand = '/company/:company/brand',
    Tax = '/company/:company/tax',
    TaxGroup = '/company/:company/tax-group',
    Party = '/company/:company/party',
    Inventory = '/company/:company/inventory',
    Invoice = '/company/:company/invoice'

}
