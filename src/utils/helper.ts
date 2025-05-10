import { parse, resolve } from 'node:path';
import { Uri, workspace } from 'vscode';
import { MASTER_DIFF_CONFIG } from '../constants/settings';
import mm from 'micromatch';
import { existsSync } from 'node:fs';
import { MatchPattern, ResolvedMatchPattern } from './interface';
import { slash, toArray } from './shared';

export function patternsNormalize(patterns: MatchPattern[]): ResolvedMatchPattern[]{
    const cwd = workspace.workspaceFolders![0]!.uri.fsPath;

    return patterns.map(pattern => ({
        target: toArray(pattern.target),
        source: toArray(pattern.source).map(item => resolve(cwd, item))
    }))
}

export function findMatchedTarget(source: Uri): Uri[] | undefined {
    const cwd = slash(workspace.workspaceFolders![0]!.uri.fsPath);
    const config = MASTER_DIFF_CONFIG();
    const patterns = patternsNormalize(config.get<MatchPattern[]>('patterns') || []);
    const sourcePath = source.fsPath.replace(/\\/g, '/');
    
    const pattern = patterns.find((p) => mm.isMatch(sourcePath, p.source[0].replace(/\\/g, '/')));
    if(!pattern) return;
    
    const parsed = parse(slash(sourcePath));
    const targets: Uri[] = [];

    for(const target of pattern.target){
        let targetPath = target
    
        Object.entries({
            ...parsed,
            basename: parsed.base,
            dirname: parsed.dir
        }).forEach(([key, value]) => {
            targetPath = targetPath.replaceAll(`<${key}>`, value)
        })
    
        targetPath.replace(/\/+/g, '/');
        targetPath = resolve(cwd, targetPath);
        
        if(existsSync(targetPath)) targets.push(Uri.file(targetPath));
    }

    if(targets.length) return targets
}