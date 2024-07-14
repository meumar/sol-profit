export interface Token {
    name: string;
    symbol: string;
    address: string;
    decimals: number;
    logoURI?: string;
}

export interface TokensObject {
    [key: string]: Token;
}

export interface tokenResponse {
    name: string,
    tokens: [Token],
    timestamp: string
}