import { ConversationV3 } from "@assistant/conversation";

export function welcomeHandler(conv: ConversationV3) {
  conv.add('Hello Zenithian. I can get you the effects of an equipment perk or the location of a cooking ingredient. Which one would you like to know?');
}