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

    Accounts = '/company/:company/accounts',
    Account = '/company/:company/accounts/:account',
    CreateAccount = '/company/:company/accounts/@new',
    EditAccount = '/company/:company/accounts/:account/edit',

    Inventory = '/company/:company/inventory',

    Vouchers = '/company/:company/vouchers',
}