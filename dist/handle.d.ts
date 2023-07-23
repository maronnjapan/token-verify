import { AccessToken, Options } from "./types";
export declare function handleToken<T extends AccessToken>(token: string, keyOrJwks: string, audiences: string[], options: Options): Promise<T>;
