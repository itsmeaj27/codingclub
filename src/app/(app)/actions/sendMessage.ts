"use server";
import { Telegraf } from "telegraf";

export interface SendMessageState {
  sent?: boolean;
  message: string;
}

export async function sendMessageAction(
  prevState: SendMessageState,
  formData: FormData
): Promise<SendMessageState> {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return { sent: false, message: "Messaging service is not configured." };
    }

    const name = formData.get("name")?.toString() || "Anonymous";
    const company = formData.get("company")?.toString();
    const description = formData.get("description")?.toString() || "";

    const bot = new Telegraf(botToken);
    await bot.telegram.sendMessage(
      chatId,
      `\n🤖 NEW CONTACT FORM SUBMISSION 🤖\n\nName: ${name}${company ? `\nOrganization: ${company}` : ""}\nDescription: ${description}\n`
    );
    return { sent: true, message: "Message sent successfully!" };
  } catch (error) {
    return {
      sent: false,
      message: "Failed to send message. " + (error as Error).message,
    };
  }
}
