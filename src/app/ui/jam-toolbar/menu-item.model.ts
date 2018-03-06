import { Tooltip } from "./tooltip.model";

export interface MenuItem
{
	text: string;
	icon?: string;
	link?: string;
	selected?: boolean;
	subMenu?: MenuItem[];
	tooltip?: Tooltip;
}
