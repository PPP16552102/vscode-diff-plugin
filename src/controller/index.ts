import { window } from 'vscode';
import { changeActiveTextEditor } from './activeChangeController';

export default () => {
    window.onDidChangeActiveTextEditor(changeActiveTextEditor);
};