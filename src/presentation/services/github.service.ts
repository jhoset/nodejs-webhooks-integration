import { GitHubIssue, GitHubStart } from "../../interfaces";

export class GitHubService {


    constructor() {

    }

    onStar(payload: GitHubStart): string {
        let message: string = '';
        const { starred_at, action, sender, repository } = payload;
        return `User ${sender.login} ${action} star on ${repository.full_name}`
    }

    onIssue(payload: GitHubIssue): string {
        let message: string = '';
        const { action, issue } = payload;

        if (action === 'opened') {
            message = `An issue was ${action} with this title: "${issue?.title}"`;
        } else {
            message = `Àn issue was ${action} by ${issue?.user?.login}`;
        }
        // else if (action === 'closed') {
        //     message = `Àn issue was ${action} by ${issue.user.login}`;
        // } else if (action === 'reopened'){
        //     message = `Àn issue was ${action} by ${issue.user.login}`;
        // } else {
        //     message = `Àn issue was ${action} by ${issue.user.login}`;
        // }

        return message;
    }



}