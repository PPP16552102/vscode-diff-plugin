import { workspace } from "vscode";

export const EXT_ID = 'master-diff';
export const EXT_NAME = 'Master Diff';

export const MASTER_DIFF_CONFIG = () => {
    return workspace.getConfiguration(EXT_ID);
}