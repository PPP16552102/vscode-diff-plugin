import { window } from 'vscode';
import { initRegister } from './commands/init-register-command';
import registerController from './controller';
import { EXT_NAME } from './constants/settings';

initRegister();

export function activate(){
    window.showInformationMessage(`${EXT_NAME} initialized`);
    registerController();
}

export function deactivate() {
    
}