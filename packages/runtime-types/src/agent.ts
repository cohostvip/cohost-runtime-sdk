// @cohost/runtime-types/src/agent.ts

/**
 * RuntimeAgent is the interface provided by the Cohost runtime to all developer-built apps.
 * It contains methods for interacting with the platform — such as logging, storing events,
 * requesting secrets, and making HTTP requests.
 *
 * This object is passed as the first argument to all actions, event handlers, and triggers.
 */
export interface RuntimeAgent {
  /**
   * Persist an event to the platform's internal log.
   *
   * @param event - A string identifier for the event (e.g. "ticket.scanned")
   * @param payload - Arbitrary JSON-serializable data to associate with the event
   * @example
   * await agent.saveEvent("order.completed", { orderId: "abc123" });
   */
  saveEvent(event: string, payload: any): Promise<void>;



  /**
   * Emit an event that can be picked up by other apps or flows.
   *
   * @param event - The event name to emit (e.g. "user.updated")
   * @param payload - The payload to send with the event
   * @example
   * agent.emit("user.updated", { userId: "u_001", changes: { email: "new@example.com" } });
   */
  emit(event: string, payload: any): void;

  /**
   * Retrieve a secret or API key securely stored for the app.
   *
   * @param key - The secret key name (e.g. "SENDGRID_API_KEY")
   * @returns The value of the secret as a string
   * @example
   * const key = await agent.getSecret("STRIPE_SECRET_KEY");
   */
  getSecret(key: string): Promise<string>;

  /**
   * Perform an outbound HTTP request (wrapper around `fetch` or Axios).
   *
   * @param input - The request URL or Request object
   * @param init - Optional request options (method, headers, body, etc.)
   * @returns The response object
   * @example
   * const res = await agent.request("https://api.example.com/items", { method: "GET" });
   * const data = await res.json();
   */
  request(input: RequestInfo, init?: RequestInit): Promise<Response>;

  /**
   * Write a message to the platform's centralized log system.
   *
   * @param message - A log message (e.g. "action executed")
   * @param meta - Optional structured metadata
   * @example
   * agent.log("Sending email", { to: "user@example.com", type: "welcome" });
   */
  log(message: string, meta?: Record<string, any>): void;
}
