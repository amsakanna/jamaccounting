import { InjectionToken } from '@angular/core';
import { JamFirestoreConfig } from "./jam-firestore-config.model";

export const configToken = new InjectionToken<JamFirestoreConfig>( 'config' );

export const defaults = {
    databaseMetadataPath: 'Metadata/Database/'
}