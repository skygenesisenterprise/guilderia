import { ApplicationCommandType } from "discord-api-types/v10";

export const PolicyCommand = {
  type: ApplicationCommandType.ChatInput,
  name: "policy",
  description: "Show the link to the privacy policy",
  options: [],
} as const;
