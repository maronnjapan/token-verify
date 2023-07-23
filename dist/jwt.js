"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchScope = exports.matchJwtId = exports.matchSubject = exports.matchIssuer = exports.matchAudience = exports.isNotExpired = exports.isNotBefore = void 0;
const isNotBefore = (clockTimestamp, clockTolerance, nbf, checkNotBefore) => {
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
};
exports.isNotBefore = isNotBefore;
const isNotExpired = (clockTimestamp, clockTolerance, exp, ignoreAudience) => {
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
};
exports.isNotExpired = isNotExpired;
const matchAudience = (audiences, aud, ignoreAudience) => {
    if (ignoreAudience) {
        return true;
    }
    if (!aud) {
        return false;
    }
    return aud.some((targetAudience) => {
        return audiences.some((audience) => audience === targetAudience);
    });
};
exports.matchAudience = matchAudience;
const matchIssuer = (issuer, iss) => {
    if (!issuer) {
        return true;
    }
    if (!iss) {
        return false;
    }
    return iss === issuer;
};
exports.matchIssuer = matchIssuer;
const matchSubject = (subject, sub) => {
    if (!subject) {
        return true;
    }
    if (!sub) {
        return false;
    }
    return sub === subject;
};
exports.matchSubject = matchSubject;
const matchJwtId = (jwtId, jti) => {
    if (!jwtId) {
        return true;
    }
    if (!jti) {
        return false;
    }
    return jti === jwtId;
};
exports.matchJwtId = matchJwtId;
const matchScope = (checkScopes, scopes, ignoreScope) => {
    if (ignoreScope) {
        return true;
    }
    if (!scopes) {
        return false;
    }
    return scopes.split(' ').every((scope) => checkScopes.includes(scope));
};
exports.matchScope = matchScope;
//# sourceMappingURL=jwt.js.map