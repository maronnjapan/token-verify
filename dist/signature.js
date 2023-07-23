"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwsSignatureValidate = exports.checkAlgorithm = exports.setAlgorithm = exports.getKeyObject = exports.getVerifyKeyFromJwks = void 0;
const jwks_rsa_1 = __importDefault(require("jwks-rsa"));
const crypto_1 = require("crypto");
const jws_1 = __importDefault(require("jws"));
const getVerifyKeyFromJwks = (jwksUri, kid) => __awaiter(void 0, void 0, void 0, function* () {
    const client = (0, jwks_rsa_1.default)({
        jwksUri: jwksUri
    });
    const key = yield client.getSigningKey(kid);
    return key.getPublicKey();
});
exports.getVerifyKeyFromJwks = getVerifyKeyFromJwks;
const getKeyObject = (secret) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return (0, crypto_1.createPublicKey)(secret);
    }
    catch (_) {
        try {
            return (0, crypto_1.createSecretKey)(Buffer.from(secret));
        }
        catch (_) {
            return null;
        }
    }
});
exports.getKeyObject = getKeyObject;
const EC_KEY_ALGS = ['ES256', 'ES384', 'ES512'];
const RSA_KEY_ALGS = ['RS256', 'RS384', 'RS512'];
const HS_ALGS = ['HS256', 'HS384', 'HS512'];
const setAlgorithm = (keyObject) => {
    if (keyObject.type === 'secret') {
        return HS_ALGS;
    }
    else if (keyObject.asymmetricKeyType === 'ec') {
        return EC_KEY_ALGS;
    }
    return RSA_KEY_ALGS;
};
exports.setAlgorithm = setAlgorithm;
const checkAlgorithm = (algorithms, alg, keyObject) => {
    if (algorithms.indexOf(alg) === -1) {
        return false;
    }
    if (alg.startsWith('HS') && keyObject.type !== 'secret') {
        return false;
    }
    else if (/^(?:RS|PS|ES)/.test(alg) && keyObject.type !== 'public') {
        return false;
    }
    return true;
};
exports.checkAlgorithm = checkAlgorithm;
const checkJwsSignatureValidate = (token, algorithm, secret) => {
    try {
        return jws_1.default.verify(token, algorithm, secret);
    }
    catch (_) {
        return false;
    }
};
exports.checkJwsSignatureValidate = checkJwsSignatureValidate;
//# sourceMappingURL=signature.js.map