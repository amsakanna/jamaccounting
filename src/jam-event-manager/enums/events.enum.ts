export const enum Events
{
    None = '',

    RegisterRequested = 'RegisterRequested',
    RegisterInitiated = 'RegisterInitiated',
    Registered = 'Registered',
    RegisterFailed = 'RegisterFailed',

    SignInRequested = 'SignInRequested',
    SignInInitiated = 'SignInInitiated',
    SignedIn = 'SignedIn',
    SignInFailed = 'SignInFailed',

    SignOutRequested = 'SignOutRequested',
    SignOutInitiated = 'SignOutInitiated',
    SignedOut = 'SignedOut',
    SignOutFailed = 'SignOutFailed'
}