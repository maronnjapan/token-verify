import { decode } from "./decode";
import { isNotBefore, isNotExpired, matchAudience, matchIssuer, matchJwtId, matchScope, matchSubject } from "./jwt";
import { checkAlgorithm, checkJwsSignatureValidate, getKeyObject, getVerifyKeyFromJwks, setAlgorithm } from "./signature";
import { AccessToken, Options } from "./types";
import { isJwsSignature } from "./structure";


export async function handleToken<T extends AccessToken>(token: string, keyOrJwks: string, audiences: string[], options: Options): Promise<T> {

    const clockTimestamp = options.clockTimestamp || Math.floor(Date.now() / 1000);

    if (!token) {
        throw new Error('Token is required')
    }


    const isJws = isJwsSignature(token);
    if (!isJws) {
        throw new Error('Token must be a JWS signature')
    }

    const decodedToken = decode<T>(token);
    if (!decodedToken) {
        throw new Error('Token is invalid')
    }

    const header = decodedToken.header;

    let getSecret = keyOrJwks;
    const jwksKey = await getVerifyKeyFromJwks(keyOrJwks, header.kid)
    if (jwksKey.length > 0) {
        getSecret = jwksKey
    }

    const keyObject = await getKeyObject(getSecret);
    if (!keyObject) {
        throw new Error('Invalid key')
    }

    const algorithms = setAlgorithm(keyObject);
    if (!checkAlgorithm(algorithms, header.alg, keyObject)) {
        throw new Error('Invalid algorithm')
    }


    const valid = checkJwsSignatureValidate(token, header.alg, getSecret);
    if (!valid) {
        throw new Error('Invalid signature')
    }

    const payload = decodedToken.payload;

    const notExpired = isNotExpired(options.exp ?? clockTimestamp, options.clockTolerance ?? 0, payload.exp, options.ignoreExpiration)
    if (!notExpired) {
        throw new Error('Token expired');
    }

    const isMatchAudience = matchAudience(audiences, payload.aud, options.ignoreAudience);
    if (!isMatchAudience) {
        throw new Error('Invalid audience');
    }

    const checkToken = options.scope ? options.scope : ['openid', 'profile', 'email'];
    if (options.useRefreshToken) {
        checkToken.push('offline_access');
    }
    const isMatchScope = matchScope(checkToken, payload.scope, options.ignoreScope);
    if (!isMatchScope) {
        throw new Error('Invalid scope');
    }

    const notBefore = isNotBefore(clockTimestamp, options.clockTolerance ?? 0, payload.nbf, options.checkNotBefore)
    if (!notBefore) {
        throw new Error('Token not active');
    }

    const isMatchIssuer = matchIssuer(options.issuer, payload.iss);
    if (!isMatchIssuer) {
        throw new Error('Invalid issuer');
    }

    const isMatchSubject = matchSubject(options.subject, payload.sub);
    if (!isMatchSubject) {
        throw new Error('Invalid subject');
    }

    const isMatchJwtId = matchJwtId(options.jwtId, payload.jti);
    if (!isMatchJwtId) {
        throw new Error('Invalid jwt id');
    }

    return decodedToken.payload;
}



