import { envs } from "../../config";

export class DiscordService {

    private readonly discordWebhookUrl = envs.DISCORD_WEBHOOK_URL;

    constructor() {

    }

    async notify(message: string) {
        const body = {
            content: message,
            embeds: [
                {
                    image: {
                        url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzV0NHVvbWl1cHlsZ3BsejYzbXN4Y2kycTZ6MmNqY29uOGllb24zayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/349qKnoIBHK1i/giphy.gif'
                    }
                }
            ]
        }

        const response = await fetch(this.discordWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            console.log("Something went wrong trying to send message to discord")
            return false;
        }
        return true;
    }


}