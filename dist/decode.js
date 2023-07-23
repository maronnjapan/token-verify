"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = void 0;
function decode(token) {
    const [header, payload, signature] = token.split('.');
    try {
        return { header: JSON.parse(atob(header)), payload: JSON.parse(atob(payload)), signature };
    }
    catch (err) {
        return null;
    }
}
exports.decode = decode;
//# sourceMappingURL=decode.js.map