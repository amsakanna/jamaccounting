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

    Product = '/company/:company/product',

    ProductCategory = '/company/:company/product-category',
    ProductCategoryDetail = '/company/:company/product-category/:product-category',

    Brand = '/company/:company/brand',
    BrandDetail = '/company/:company/brand/:brand',

    Inventory = '/company/:company/inventory',
    InventoryDetail = '/company/:company/inventory/:inventory',

    Voucher = '/company/:company/voucher',
    VoucherDetail = '/company/:company/voucher/:voucher',

    Tax = '/company/:company/tax',
    TaxDetail = '/company/:company/tax/:tax',

    TaxType = '/company/:company/tax-type',
    TaxTypeDetail = '/company/:company/tax-type/:tax-type'

}
