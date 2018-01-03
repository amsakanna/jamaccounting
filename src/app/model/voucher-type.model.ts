import { Data } from "../../jam/model-library";
import { SerialNumber } from "./serial-number.model";

export interface VoucherType extends Data
{
    parentKey: string;
    serialNumber: SerialNumber;
}