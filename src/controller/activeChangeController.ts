import { commands, TextEditor } from "vscode";
import { findMatchedTarget } from "../utils/helper";

export const changeActiveTextEditor = (editor: TextEditor | undefined) => {
    const uri = editor?.document.uri;
            
    const target = uri && findMatchedTarget(uri);
    commands.executeCommand('setContext', 'auto-diff.available', !!target);
}