
export interface MatchPattern {
    target: string | string[],
    source: string | string[]
}

export interface ResolvedMatchPattern {
    source: string[],
    target: string[]
}