
type ApiResponse<T> = {
    queryCount?: number; // Optional, as it only appears in the second response
    resultsCount?: number; // Optional, as it only appears in the second response
    adjusted?: boolean; // Optional, as it only appears in the second response
    results: T[]; // Generic results array
    status: string;
    request_id: string;
    count: number;
    next_url?: string; // Optional, as it only appears in the first response
};

export type StockPriceResult = {
    v: number; // Volume
    vw: number; // Volume-weighted average price
    o: number; // Open price
    c: number; // Close price
    h: number; // High price
    l: number; // Low price
    t: number; // Timestamp (in milliseconds)
    n: number; // Number of transactions
};

export type StockPriceResponse = ApiResponse<StockPriceResult>;