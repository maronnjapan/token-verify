import { KeyObject } from 'crypto';
import { Algorithm } from "jws";
export declare const getVerifyKeyFromJwks: (jwksUri: string, kid?: string) => Promise<string>;
export declare const getKeyObject: (secret: string) => Promise<KeyObject | null>;
export declare const setAlgorithm: (keyObject: KeyObject) => string[];
export declare const checkAlgorithm: (algorithms: string[], alg: string, keyObject: KeyObject) => boolean;
export declare const checkJwsSignatureValidate: (token: string, algorithm: Algorithm, secret: string) => boolean;
