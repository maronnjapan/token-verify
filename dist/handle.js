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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleToken = void 0;
const decode_1 = require("./decode");
const jwt_1 = require("./jwt");
const signature_1 = require("./signature");
const structure_1 = require("./structure");
function handleToken(token, keyOrJwks, audiences, options) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const clockTimestamp = options.clockTimestamp || Math.floor(Date.now() / 1000);
        if (!token) {
            throw new Error('Token is required');
        }
        const isJws = (0, structure_1.isJwsSignature)(token);
        if (!isJws) {
            throw new Error('Token must be a JWS signature');
        }
        const decodedToken = (0, decode_1.decode)(token);
        if (!decodedToken) {
            throw new Error('Token is invalid');
        }
        const header = decodedToken.header;
        let getSecret = keyOrJwks;
        const jwksKey = yield (0, signature_1.getVerifyKeyFromJwks)(keyOrJwks, header.kid);
        if (jwksKey.length > 0) {
            getSecret = jwksKey;
        }
        const keyObject = yield (0, signature_1.getKeyObject)(getSecret);
        if (!keyObject) {
            throw new Error('Invalid key');
        }
        const algorithms = (0, signature_1.setAlgorithm)(keyObject);
        if (!(0, signature_1.checkAlgorithm)(algorithms, header.alg, keyObject)) {
            throw new Error('Invalid algorithm');
        }
        const valid = (0, signature_1.checkJwsSignatureValidate)(token, header.alg, getSecret);
        if (!valid) {
            throw new Error('Invalid signature');
        }
        const payload = decodedToken.payload;
        const notExpired = (0, jwt_1.isNotExpired)((_a = options.exp) !== null && _a !== void 0 ? _a : clockTimestamp, (_b = options.clockTolerance) !== null && _b !== void 0 ? _b : 0, payload.exp, options.ignoreExpiration);
        if (!notExpired) {
            throw new Error('Token expired');
        }
        const isMatchAudience = (0, jwt_1.matchAudience)(audiences, payload.aud, options.ignoreAudience);
        if (!isMatchAudience) {
            throw new Error('Invalid audience');
        }
        const checkToken = options.scope ? options.scope : ['openid', 'profile', 'email'];
        if (options.useRefreshToken) {
            checkToken.push('offline_access');
        }
        const isMatchScope = (0, jwt_1.matchScope)(checkToken, payload.scope, options.ignoreScope);
        if (!isMatchScope) {
            throw new Error('Invalid scope');
        }
        const notBefore = (0, jwt_1.isNotBefore)(clockTimestamp, (_c = options.clockTolerance) !== null && _c !== void 0 ? _c : 0, payload.nbf, options.checkNotBefore);
        if (!notBefore) {
            throw new Error('Token not active');
        }
        const isMatchIssuer = (0, jwt_1.matchIssuer)(options.issuer, payload.iss);
        if (!isMatchIssuer) {
            throw new Error('Invalid issuer');
        }
        const isMatchSubject = (0, jwt_1.matchSubject)(options.subject, payload.sub);
        if (!isMatchSubject) {
            throw new Error('Invalid subject');
        }
        const isMatchJwtId = (0, jwt_1.matchJwtId)(options.jwtId, payload.jti);
        if (!isMatchJwtId) {
            throw new Error('Invalid jwt id');
        }
        return decodedToken.payload;
    });
}
exports.handleToken = handleToken;
//# sourceMappingURL=handle.js.map