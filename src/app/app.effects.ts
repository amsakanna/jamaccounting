import { CoreEffects } from "./core/core.store";
import { NavigatorEffects } from "../jam/navigator";
import { DatabaseEffects } from "../jam/firestore";
import { AuthEffects } from "../jam/auth";

export const appEffects = [
	CoreEffects,
	NavigatorEffects,
	DatabaseEffects,
	AuthEffects
]