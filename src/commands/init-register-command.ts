import { commands } from "vscode";
import { RegisterCommands } from './commands';

export const initRegister = () => {
    RegisterCommands.forEach(command => {
        commands.registerCommand(command.name, command.behaviour);
    });
}
