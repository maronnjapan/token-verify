import jwksClient from "jwks-rsa";
import { createPublicKey, createSecretKey, KeyObject } from 'crypto';
import jws, { Algorithm } from "jws";

export const getVerifyKeyFromJwks = async (jwksUri: string, kid?: string): Promise<string> => {
    const client = jwksClient({
        jwksUri: jwksUri
    });
    const key = await client.getSigningKey(kid)
    return key.getPublicKey();
}

export const getKeyObject = async (secret: string): Promise<KeyObject | null> => {
    try {
        return createPublicKey(secret);
    } catch (_) {
        try {
            return createSecretKey(Buffer.from(secret));
        } catch (_) {
            return null
        }
    }
}

const EC_KEY_ALGS = ['ES256', 'ES384', 'ES512'];
const RSA_KEY_ALGS = ['RS256', 'RS384', 'RS512'];
const HS_ALGS = ['HS256', 'HS384', 'HS512'];
export const setAlgorithm = (keyObject: KeyObject): string[] => {
    if (keyObject.type === 'secret') {
        return HS_ALGS;
    } else if (keyObject.asymmetricKeyType === 'ec') {
        return EC_KEY_ALGS
    }
    return RSA_KEY_ALGS;
}

export const checkAlgorithm = (algorithms: string[], alg: string, keyObject: KeyObject): boolean => {
    if (algorithms.indexOf(alg) === -1) {
        return false;
    }

    if (alg.startsWith('HS') && keyObject.type !== 'secret') {
        return false;
    } else if (/^(?:RS|PS|ES)/.test(alg) && keyObject.type !== 'public') {
        return false
    }
    return true;
}

export const checkJwsSignatureValidate = (token: string, algorithm: Algorithm, secret: string): boolean => {
    try {
        return jws.verify(token, algorithm, secret);
    } catch (_) {
        return false;
    }
}

