// runtime-types/src/types.ts

import { RuntimeAgent } from "./agent";

export interface Action<Input = any, Output = any> {
  (agent: RuntimeAgent, input: Input): Promise<Output>;
}


export interface EventHandler<Payload = any> {
  (agent: RuntimeAgent, payload: Payload): Promise<void>;
}


export interface Trigger<Output = any> {
  (agent: RuntimeAgent, params?: Record<string, any>): Promise<Output[]>;
}
