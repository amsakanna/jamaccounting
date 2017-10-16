import { InjectionToken } from '@angular/core';

export interface IJamFireStoreConfig
{
    databaseMetadataPath: string;
}

export const configToken = new InjectionToken<IJamFireStoreConfig>('config');