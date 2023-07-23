import { AccessToken, Token } from "./types";
export declare function decode<T extends AccessToken>(token: string): Token<T> | null;
