import { parse, resolve } from 'node:path';
import { Uri, workspace } from 'vscode';
import { AUTO_DIFF_CONFIG } from '../constants/settings';
import mm from 'micromatch';
import { existsSync } from 'node:fs';

interface MatchPattern {
    target: string,
    source: string
}

function slash(path: string): string {
    return path.replace(/\\/g, '/');
}

export function patternsNormalize(patterns: MatchPattern[]){
    const cwd = workspace.workspaceFolders![0]!.uri.fsPath;

    return patterns.map(pattern => ({
        target: pattern.target,
        source: resolve(cwd, pattern.source)
    }))
}

export function findMatchedTarget(source: Uri): Uri | undefined {
    const cwd = slash(workspace.workspaceFolders![0]!.uri.fsPath);
    const config = AUTO_DIFF_CONFIG;
    const patterns = patternsNormalize(config.get<MatchPattern[]>('patterns') || []);
    const sourcePath = source.fsPath.replace(/\\/g, '/');
    
    const pattern = patterns.find((p) => mm.isMatch(sourcePath, p.source.replace(/\\/g, '/')));
    
    if(!pattern) return;
    
    const parsed = parse(slash(sourcePath));
    
    let targetPath = pattern.target
    
    Object.entries({
        ...parsed,
        basename: parsed.base,
        dirname: parsed.dir
    }).forEach(([key, value]) => {
        targetPath = targetPath.replaceAll(`<${key}>`, value)
    })

    targetPath.replace(/\/+/g, '/');

    targetPath = resolve(cwd, targetPath);
    
    if(existsSync(targetPath)) return Uri.file(targetPath);
}