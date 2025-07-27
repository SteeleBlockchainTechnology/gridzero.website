import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/landing/ui/card';
import { Button } from '@/components/landing/ui/button';
import { Badge } from '@/components/landing/ui/badge';
import { Input } from '@/components/landing/ui/input';
import { Label } from '@/components/landing/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/landing/ui/tabs';
import { Loader2, TrendingUp, TrendingDown, Minus, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PriceMetrics from './PriceMetrics';
import {
  AnalysisRequest,
  AnalysisResponse,
  ConfigResponse,
  TickerAnalysis,
  TickerData,
  PriceMetrics as PriceMetricsType,
  JustificationDetails,
  analysisApi
} from '@/services/api';

interface AnalysisPageState {
  // Configuration
  availableTickers: string[];
  availableIndicators: string[];
  selectedTickers: string[];
  selectedIndicators: string[];
  startDate: string;
  endDate: string;
  
  // Analysis state
  isLoading: boolean;
  analysisResults: AnalysisResponse | null;
  error: string | null;
}

const AnalysisPage: React.FC = () => {
  const { toast } = useToast();
  const [state, setState] = useState<AnalysisPageState>({
    availableTickers: [],
    availableIndicators: [],
    selectedTickers: ['BTC', 'ETH', 'ADA'],
    selectedIndicators: ['20-Day SMA'],
    startDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 year ago
    endDate: new Date().toISOString().split('T')[0], // today
    isLoading: false,
    analysisResults: null,
    error: null
  });

  // Load configuration on component mount
  useEffect(() => {
    loadConfiguration();
  }, []);

  const loadConfiguration = async () => {
    try {
      const config = await analysisApi.getConfig();
      setState(prev => ({
        ...prev,
        availableTickers: config.crypto_symbols,
        availableIndicators: config.technical_indicators,
        selectedTickers: config.default_tickers || ['BTC', 'ETH', 'ADA'],
        selectedIndicators: config.technical_indicators.slice(0, 1) || ['20-Day SMA']
      }));
    } catch (error) {
      toast({
        title: "Configuration Error",
        description: "Failed to load application configuration",
        variant: "destructive"
      });
    }
  };

  const handleIndicatorToggle = (indicator: string) => {
    setState(prev => ({
      ...prev,
      selectedIndicators: prev.selectedIndicators.includes(indicator)
        ? prev.selectedIndicators.filter(i => i !== indicator)
        : [...prev.selectedIndicators, indicator]
    }));
  };

  const handleDateChange = (field: 'startDate' | 'endDate', value: string) => {
    setState(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTickersChange = (value: string) => {
    const tickers = value.split(',').map(t => t.trim().toUpperCase()).filter(Boolean);
    setState(prev => ({ ...prev, selectedTickers: tickers }));
  };

  const handleAnalyze = async () => {
    if (state.selectedTickers.length === 0) {
      toast({
        title: "Selection Required",
        description: "Please select at least one ticker to analyze",
        variant: "destructive"
      });
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const request: AnalysisRequest = {
        tickers: state.selectedTickers,
        start_date: state.startDate,
        end_date: state.endDate,
        indicators: state.selectedIndicators
      };

      const results = await analysisApi.getAnalysis(request);
      setState(prev => ({
        ...prev,
        analysisResults: results,
        isLoading: false
      }));

      toast({
        title: "Analysis Complete",
        description: `Successfully analyzed ${state.selectedTickers.length} ticker(s)`,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Analysis failed',
        isLoading: false
      }));

      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: "destructive"
      });
    }
  };

  const renderSidebar = () => (
    <div className="w-80 bg-card border-r border-border p-6 space-y-6 h-full overflow-y-auto">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-6">Configuration</h2>
        
        {/* Ticker Input - matching Streamlit exactly */}
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-foreground mb-2 block">
              Enter Tickers (comma-separated):
            </Label>
            <Input
              placeholder="BTC, ETH, ADA"
              value={state.selectedTickers.join(', ')}
              onChange={(e) => handleTickersChange(e.target.value)}
              className="bg-background border-border text-foreground focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        {/* Date Range - matching Streamlit */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="start-date" className="text-sm font-medium text-foreground">Start Date</Label>
            <Input
              id="start-date"
              type="date"
              value={state.startDate}
              onChange={(e) => handleDateChange('startDate', e.target.value)}
              className="bg-background border-border text-foreground focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <Label htmlFor="end-date" className="text-sm font-medium text-foreground">End Date</Label>
            <Input
              id="end-date"
              type="date"
              value={state.endDate}
              onChange={(e) => handleDateChange('endDate', e.target.value)}
              className="bg-background border-border text-foreground focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        {/* Technical Indicators - matching Streamlit */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-foreground">Technical Indicators</h3>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Select Indicators:</Label>
            <div className="space-y-2">
              {state.availableIndicators.map(indicator => (
                <label key={indicator} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={state.selectedIndicators.includes(indicator)}
                    onChange={() => handleIndicatorToggle(indicator)}
                    className="rounded border-border text-primary focus:ring-primary focus:ring-offset-0 bg-background"
                  />
                  <span className="text-sm text-foreground">{indicator}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Fetch Data Button - matching Streamlit */}
        <Button
          onClick={handleAnalyze}
          disabled={state.isLoading || state.selectedTickers.length === 0}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
        >
          {state.isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            'Fetch Data'
          )}
        </Button>
      </div>
    </div>
  );

  const renderMainContent = () => {
    if (state.error) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <Card className="max-w-md mx-auto bg-card border-border">
            <CardContent className="p-6 text-center">
              <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Analysis Error</h3>
              <p className="text-muted-foreground mb-4">{state.error}</p>
              <Button onClick={() => setState(prev => ({ ...prev, error: null }))} className="bg-primary hover:bg-primary/90">
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (!state.analysisResults) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <Card className="max-w-md mx-auto bg-card border-border">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Ready for Analysis</h3>
              <p className="text-muted-foreground">
                Configure your parameters and click "Fetch Data" to begin technical analysis.
              </p>
            </CardContent>
          </Card>
        </div>
      );
    }

    // Matching Streamlit tab structure: "Overall Summary" + individual ticker tabs
    const tabValues = ['overall', ...state.selectedTickers.map(ticker => ticker.toLowerCase())];

    return (
      <div className="flex-1 p-6 overflow-y-auto">
        <Tabs defaultValue="overall" className="w-full">
          <TabsList className="grid w-full bg-muted" style={{ gridTemplateColumns: `repeat(${tabValues.length}, 1fr)` }}>
            <TabsTrigger value="overall" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Overall Summary
            </TabsTrigger>
            {state.selectedTickers.map(ticker => (
              <TabsTrigger 
                key={ticker} 
                value={ticker.toLowerCase()}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {ticker}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Overall Summary Tab */}
          <TabsContent value="overall" className="space-y-6 mt-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Market Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {/* Overall recommendations summary */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['BUY', 'HOLD', 'SELL'].map(recommendation => {
                      const count = Object.values(state.analysisResults.ticker_data || {})
                        .filter(data => data.recommendation === recommendation).length;
                      const percentage = state.selectedTickers.length > 0 
                        ? ((count / state.selectedTickers.length) * 100).toFixed(1) 
                        : 0;
                      
                      return (
                        <Card key={recommendation} className="bg-background border-border">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-muted-foreground">{recommendation}</p>
                                <p className="text-2xl font-bold text-foreground">{count}</p>
                              </div>
                              <div className="text-right">
                                <Badge 
                                  variant={recommendation === 'BUY' ? 'default' : 'secondary'}
                                  className={recommendation === 'BUY' ? 'bg-primary text-primary-foreground' : ''}
                                >
                                  {percentage}%
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  {/* Market sentiment */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-background border-border">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-foreground mb-2">Top Performers</h4>
                        <div className="space-y-2">
                          {Object.entries(state.analysisResults.ticker_data || {})
                            .sort(([,a], [,b]) => (b.price_metrics?.price_change_percentage || 0) - (a.price_metrics?.price_change_percentage || 0))
                            .slice(0, 3)
                            .map(([ticker, data]) => (
                              <div key={ticker} className="flex justify-between items-center">
                                <span className="text-sm text-foreground">{ticker}</span>
                                <Badge variant="default" className="bg-primary text-primary-foreground">
                                  +{data.price_metrics?.price_change_percentage?.toFixed(2)}%
                                </Badge>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-background border-border">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-foreground mb-2">Analysis Period</h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div>Start: {state.startDate}</div>
                          <div>End: {state.endDate}</div>
                          <div>Indicators: {state.selectedIndicators.join(', ')}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Individual Ticker Tabs */}
          {state.selectedTickers.map(ticker => {
            const tickerData = state.analysisResults?.ticker_data?.[ticker];
            if (!tickerData) return null;

            return (
              <TabsContent key={ticker} value={ticker.toLowerCase()} className="space-y-6 mt-6">
                <div className="grid gap-6">
                  {/* Price Metrics */}
                  <PriceMetrics 
                    metrics={tickerData.price_metrics} 
                    ticker={ticker}
                  />

                  {/* Charts */}
                  {tickerData.chart_data && (
                    <Card className="bg-card border-border">
                      <CardHeader>
                        <CardTitle className="text-foreground">{ticker} Price Chart</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-96 bg-background rounded border border-border flex items-center justify-center">
                          <p className="text-muted-foreground">Chart visualization will be implemented here</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Recommendation */}
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-foreground">
                        Recommendation
                        {tickerData.recommendation === 'BUY' && <TrendingUp className="h-5 w-5 text-primary" />}
                        {tickerData.recommendation === 'SELL' && <TrendingDown className="h-5 w-5 text-destructive" />}
                        {tickerData.recommendation === 'HOLD' && <Minus className="h-5 w-5 text-muted-foreground" />}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={tickerData.recommendation === 'BUY' ? 'default' : 'secondary'}
                            className={`text-lg px-4 py-2 ${
                              tickerData.recommendation === 'BUY' 
                                ? 'bg-primary text-primary-foreground' 
                                : tickerData.recommendation === 'SELL'
                                ? 'bg-destructive text-destructive-foreground'
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            {tickerData.recommendation}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            Confidence: {tickerData.confidence ? `${(tickerData.confidence * 100).toFixed(1)}%` : 'N/A'}
                          </span>
                        </div>
                        
                        {tickerData.justification_details && (
                          <div className="space-y-2">
                            <h4 className="font-medium text-foreground">Justification:</h4>
                            <div className="bg-background rounded p-4 border border-border">
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {tickerData.justification_details.reasoning || 'No detailed reasoning provided.'}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Main Layout */}
      <div className="flex h-screen">
        {/* Sidebar - matching Streamlit layout */}
        {renderSidebar()}
        
        {/* Main Content Area */}
        {renderMainContent()}
      </div>
    </div>
  );
};

export default AnalysisPage;
