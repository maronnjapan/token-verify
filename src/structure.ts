export const isJwsSignature = (accessToken: string): boolean => {
    if (accessToken.split('.').length !== 3) {
        return false;
    }
    return true;
}