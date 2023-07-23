export const isNotBefore = (clockTimestamp: number, clockTolerance: number, nbf?: number, checkNotBefore?: true): boolean => {
    if (!checkNotBefore) {
        return true;
    }
    if (!nbf) {
        return false;
    }
    if (nbf > clockTimestamp + clockTolerance) {
        return false;
    }
    return true;
}

export const isNotExpired = (clockTimestamp: number, clockTolerance: number, exp?: number, ignoreAudience?: true): boolean => {
    if (ignoreAudience) {
        return true;
    }
    if (!exp) {
        return false;
    }
    if (exp < clockTimestamp - clockTolerance) {
        return false;
    }
    return true;
}

export const matchAudience = (audiences: string[], aud?: string[], ignoreAudience?: true): boolean => {
    if (ignoreAudience) {
        return true;
    }
    if (!aud) {
        return false;
    }
    return aud.some((targetAudience) => {
        return audiences.some((audience) =>
            audience === targetAudience
        );
    });
}

export const matchIssuer = (issuer?: string, iss?: string): boolean => {
    if (!issuer) {
        return true;
    }
    if (!iss) {
        return false;
    }
    return iss === issuer;
}

export const matchSubject = (subject?: string, sub?: string): boolean => {
    if (!subject) {
        return true;
    }
    if (!sub) {
        return false;
    }
    return sub === subject;
}

export const matchJwtId = (jwtId?: string, jti?: string): boolean => {
    if (!jwtId) {
        return true;
    }
    if (!jti) {
        return false;
    }
    return jti === jwtId;
}

export const matchScope = (checkScopes: string[], scopes?: string, ignoreScope?: true): boolean => {
    if (ignoreScope) {
        return true;
    }
    if (!scopes) {
        return false;
    }
    return scopes.split(' ').every((scope) => checkScopes.includes(scope));
}






