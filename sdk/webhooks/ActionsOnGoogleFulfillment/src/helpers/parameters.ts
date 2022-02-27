import { ConversationV3 } from "@assistant/conversation";

export function getIntentParameter(conv: ConversationV3, parameterName: string) {
  return conv.intent.params[parameterName]? conv.intent.params[parameterName].resolved : null;
}