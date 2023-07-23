import { AccessToken, Token } from "./types";

export function decode<T extends AccessToken>(token: string): Token<T> | null {
    const [header, payload, signature] = token.split('.');

    try {
        return { header: JSON.parse(atob(header)), payload: JSON.parse(atob(payload)), signature }
    } catch (err) {
        return null;
    }
}
