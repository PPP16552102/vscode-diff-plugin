import { commands, TextEditor, window } from "vscode";
import { findMatchedTarget } from "../utils/helper";

export const changeActiveTextEditor = (editor: TextEditor | undefined) => {
    const uri = editor?.document.uri;
            
    const targets = uri && findMatchedTarget(uri);
    commands.executeCommand('setContext', 'auto-diff.available', !!targets?.length);
    if(targets?.length) window.showInformationMessage('Matched:' + targets.map(i => i.fsPath).join(','));
}