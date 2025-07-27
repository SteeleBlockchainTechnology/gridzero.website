// Environment variables with proper typing
interface ViteImportMeta {
  env: Record<string, string>;
}

const API_BASE_URL = ((import.meta as unknown) as ViteImportMeta).env?.VITE_API_URL || 'http://localhost:8000';

export interface AnalysisRequest {
  tickers: string[];
  start_date: string;
  end_date: string;
  indicators: string[];
}

export interface PriceMetrics {
  current_price: number;
  price_change: number;
  price_change_percentage: number;
  high_52w: number;
  low_52w: number;
  volume: number;
  market_cap?: number;
  period_days?: number;
  period_label?: string;
}

export interface JustificationDetails {
  reasoning: string;
}

export interface AnalysisResult {
  action: string;
  justification: JustificationDetails;
}

export interface TickerAnalysis {
  ticker: string;
  price_metrics: PriceMetrics;
  chart_data: any;
  analysis: AnalysisResult;
  is_crypto: boolean;
}

export interface TickerData {
  price_metrics: PriceMetrics;
  recommendation: string;
  confidence?: number;
  justification_details?: JustificationDetails;
  chart_data?: any;
}

export interface AnalysisResponse {
  overall_summary: Array<{ Stock: string; Recommendation: string }>;
  ticker_analyses: TickerAnalysis[];
  ticker_data: Record<string, TickerData>;
  settings: {
    crypto_symbols: string[];
    technical_indicators: string[];
  };
}

export interface ConfigResponse {
  default_tickers: string[];
  default_lookback_days: number;
  crypto_symbols: string[];
  technical_indicators: string[];
  recommendation_options: string[];
}

export interface ApiError {
  detail: string;
  status_code: number;
}

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData: ApiError = await response.json().catch(() => ({
          detail: `HTTP ${response.status}: ${response.statusText}`,
          status_code: response.status,
        }));
        throw new Error(errorData.detail);
      }

      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  }

  async getAnalysis(request: AnalysisRequest): Promise<AnalysisResponse> {
    return this.request<AnalysisResponse>('/analyze', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async getHealthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.request<{ status: string; timestamp: string }>('/health');
  }

  async getConfig(): Promise<ConfigResponse> {
    return this.request<ConfigResponse>('/config');
  }

  async getIndicators(): Promise<{ indicators: string[] }> {
    return this.request<{ indicators: string[] }>('/indicators');
  }

  async getCryptoSymbols(): Promise<{ crypto_symbols: string[] }> {
    return this.request<{ crypto_symbols: string[] }>('/crypto-symbols');
  }
}

export const analysisApi = new ApiClient();
