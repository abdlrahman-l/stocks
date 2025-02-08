export async function fetcher<T>(url: string, options: RequestInit = {}): Promise<T> {
    const combinedUrl = `${url}&apiKey=${process.env.STOCK_API_KEY}`;
    try {
      const response = await fetch(`${url}&apiKey=${process.env.STOCK_API_KEY}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status} url: ${combinedUrl}`);
      }
  
      return await response.json() as T;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }
  
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildQueryParams(params: Record<string, any>): string {
    const queryString = new URLSearchParams(params).toString();
    return queryString ? `?${queryString}` : '';
  }

interface RequestOptions {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params?: Record<string, any>;
    body?: unknown;
    headers?: HeadersInit;
    nextOptions?: RequestInit;
  }
  
  export function get<T>(url: string, {  params = {}, headers = {}, nextOptions }: RequestOptions): Promise<T> {
    const queryString = buildQueryParams(params);
    return fetcher<T>(`${url}${queryString}`, { method: 'GET', headers, ...nextOptions });
  }
  