import { window, workspace } from 'vscode';
import { changeActiveTextEditor } from './activeChangeController';
import { didChangeConfiguration } from './workspaceCOntoller';

export default () => {
    window.onDidChangeActiveTextEditor(changeActiveTextEditor);
    workspace.onDidChangeConfiguration(didChangeConfiguration);
};