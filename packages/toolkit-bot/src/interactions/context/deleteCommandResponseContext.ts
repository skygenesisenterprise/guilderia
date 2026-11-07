import { ApplicationCommandType } from "discord-api-types/v10";

export const DeleteCommandResponseContextCommand = {
  name: "Delete Command Response",
  type: ApplicationCommandType.Message,
} as const;
