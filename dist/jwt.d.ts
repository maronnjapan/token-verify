export declare const isNotBefore: (clockTimestamp: number, clockTolerance: number, nbf?: number, checkNotBefore?: true) => boolean;
export declare const isNotExpired: (clockTimestamp: number, clockTolerance: number, exp?: number, ignoreAudience?: true) => boolean;
export declare const matchAudience: (audiences: string[], aud?: string[], ignoreAudience?: true) => boolean;
export declare const matchIssuer: (issuer?: string, iss?: string) => boolean;
export declare const matchSubject: (subject?: string, sub?: string) => boolean;
export declare const matchJwtId: (jwtId?: string, jti?: string) => boolean;
export declare const matchScope: (checkScopes: string[], scopes?: string, ignoreScope?: true) => boolean;
