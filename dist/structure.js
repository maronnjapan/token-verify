"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isJwsSignature = void 0;
const isJwsSignature = (accessToken) => {
    if (accessToken.split('.').length !== 3) {
        return false;
    }
    return true;
};
exports.isJwsSignature = isJwsSignature;
//# sourceMappingURL=structure.js.map