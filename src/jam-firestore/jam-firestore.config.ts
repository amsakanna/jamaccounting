import { InjectionToken } from '@angular/core';
import { IJamFirestoreConfig } from "./models/i-jam-firestore-config.model";

export const configToken = new InjectionToken<IJamFirestoreConfig>('config');

export const defaults = {
    databaseMetadataPath: 'Metadata/database/Table'
}