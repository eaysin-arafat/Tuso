import { MessageByKey } from "@/constants/api-interface";
import dayjs from "dayjs";

export const transformMessage = (messages: MessageByKey[]) => {
  if (!Array.isArray(messages)) return {};

  return messages.reduce((acc, cur) => {
    const messageDate = dayjs(cur?.result?.dateCreated)?.format("YYYY-MM-DD");

    if (acc[messageDate]) acc[messageDate]?.push(cur);
    else acc[messageDate] = [cur];

    return acc;
  }, {});
};
