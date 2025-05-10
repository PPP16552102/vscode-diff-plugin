import { commands, Uri, window } from "vscode"
import { findMatchedTarget } from "../utils/helper";
import { basename } from "path";

export const RegisterCommands = [
    {
        name: 'auto-diff.open',
        behaviour: async () => {
            const uri = window.activeTextEditor?.document.uri;
            if(!uri) return;

            const targets = findMatchedTarget(uri);

            if(!targets) return;

            let target: Uri | undefined;
            if(targets.length === 1){
                target = targets[0];
            }else{
                const result = await window.showQuickPick(targets.map(i => ({
                    label: i.fsPath,
                    iconPath: i,
                    tag: i
                })));
                if(result?.tag) target = result.tag;
            }

            if(target) commands.executeCommand('vscode.diff', uri, target, `Auto Diff: ${basename(uri.fsPath)} <-> ${basename(target.fsPath)}`);
        }
    }
]