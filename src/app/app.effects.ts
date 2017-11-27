import { CoreEffects } from "./core/core.store";
import { NavigatorEffects } from "../jam-navigator/jam-navigator";
import { AuthEffects } from "../jam-auth/jam-auth";

export const appEffects = [
	CoreEffects,
	NavigatorEffects,
	AuthEffects
]