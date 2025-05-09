import { window } from 'vscode';
import { initRegister } from './commands/init-register-command';
import registerController from './controller';

initRegister();

export function activate(){
    window.showInformationMessage('initialized');
    registerController();
}

export function deactivate() {
    
}