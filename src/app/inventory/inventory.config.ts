import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FeatureModule } from '../../jam/model-library';
import { Inventory, SupplyTypes } from "../model";

export const moduleName = 'Inventory';
export const actionPrefix = '[Inventory]';
export const urlParamKey = 'inventory';

export const emptyItem: Inventory = {
	supplyType: SupplyTypes.Goods,
	productKey: null,
	product: null,
	units: null,
	buyingPrice: null,
	sellingPrice: null,
	taxGroupKey: null,
	taxGroup: null
};

export const form = new FormGroup( {
	units: new FormControl( '', Validators.required ),
	buyingPrice: new FormControl( '' ),
	sellingPrice: new FormControl( '' )
} );

export const additionalStates = {
	emptyItem: emptyItem,
	form: form
}
