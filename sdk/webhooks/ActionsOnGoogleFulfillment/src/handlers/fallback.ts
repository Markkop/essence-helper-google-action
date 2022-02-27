import { ConversationV3 } from "@assistant/conversation";

export function fallbackHandler(conv: ConversationV3) {
  conv.add(`I don't understand. You can ask me for equipment perk effects or cooking item locations.`);
}