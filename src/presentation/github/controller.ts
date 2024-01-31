import { Request, Response } from "express";
import { GitHubService } from "../services/github.service";
import { DiscordService } from "../services/discord.service";

export class GithubController {

    constructor(
        private readonly githubService = new GitHubService(),
        private readonly discordService = new DiscordService()) {

    }

    webhookHandler = (req: Request, res: Response) => {
        const githubEvent = req.header('x-github-event') ?? 'Unknown';
        const signature = req.header('x-hub-signature-256') ?? 'Unknown';
        const payload = req.body;
        let message = ''

        switch (githubEvent) {

            case 'star':
                message = this.githubService.onStar(payload)
                break;
            case 'issues':
                message = this.githubService.onIssue(payload)
                break;
            default:
                message = `Unknown Event: ${githubEvent}`
                break;
        }
        // console.log('>>> x-hub-signature:', signature)
        this.discordService.notify(message)
            .then(() => res.status(202).send("Accepted"))
            .catch(() => res.status(500).json({ error: 'Internal Server Error' }));
    }
}   