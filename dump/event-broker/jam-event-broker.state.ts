import { EventPair } from "./event-pair.model";

export interface EventBrokerModuleState
{
	eventBrokerState: EventBrokerState
}

export interface EventBrokerState
{
	eventPairs: EventPair[];
}
