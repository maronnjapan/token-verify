import { Algorithm } from "jws";
export type Options = {
    useRefreshToken: boolean;
    clockTimestamp?: number;
    clockTolerance?: number;
    issuer?: string;
    subject?: string;
    jwtId?: string;
    scope?: string[];
    exp?: number;
    ignoreAudience?: true;
    ignoreExpiration?: true;
    ignoreScope?: true;
    checkNotBefore?: true;
};
export interface Token<T> {
    header: JoseHeader;
    payload: T;
    signature: string;
}
type JoseHeader = {
    alg: Algorithm;
    kid?: string;
    typ?: string;
    jku?: string;
    jwk?: string;
    x5t?: string;
    x5c?: string;
};
export interface AccessToken {
    iss?: string;
    sub?: string;
    aud?: string[];
    exp?: number;
    nbf?: number;
    iat?: number;
    jti?: string;
    azp?: string;
    scope?: string;
}
export {};
