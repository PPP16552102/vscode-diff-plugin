import { ConfigurationChangeEvent } from "vscode";
import { MASTER_DIFF_CONFIG, EXT_ID } from "../constants/settings"

export const didChangeConfiguration = (e: ConfigurationChangeEvent) => {
    if(e.affectsConfiguration(`${EXT_ID}.patterns`)) MASTER_DIFF_CONFIG();
}