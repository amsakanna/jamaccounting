import { InjectionToken } from '@angular/core';
import { DatabaseConfig } from "./database-config.model";

export const configToken = new InjectionToken<DatabaseConfig>( 'config' );

export const defaults = {
    databaseMetadataPath: 'Metadata/Database/'
}