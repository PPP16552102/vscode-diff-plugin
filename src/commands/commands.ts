import { commands, window } from "vscode"
import { findMatchedTarget } from "../utils/helper";
import { basename } from "path";

export const RegisterCommands = [
    {
        name: 'auto-diff.open',
        behaviour: () => {
            const uri = window.activeTextEditor?.document.uri;
            if(!uri) return;

            const target = findMatchedTarget(uri);

            if(!target) return;

            commands.executeCommand('vscode.diff', uri, target, `Auto Diff: ${basename(uri.fsPath)} <-> ${basename(target.fsPath)}`);
        }
    }
]