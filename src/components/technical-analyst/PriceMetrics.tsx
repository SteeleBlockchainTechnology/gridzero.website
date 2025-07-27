import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/landing/ui/card';
import { Badge } from '@/components/landing/ui/badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { PriceMetrics as PriceMetricsType } from '@/services/api';

interface PriceMetricsProps {
  metrics: PriceMetricsType;
  ticker: string;
}

const PriceMetrics: React.FC<PriceMetricsProps> = ({ metrics, ticker }) => {
  const isPositive = metrics.price_change > 0;
  const isNegative = metrics.price_change < 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(price);
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) {
      return `${(volume / 1e9).toFixed(1)}B`;
    } else if (volume >= 1e6) {
      return `${(volume / 1e6).toFixed(1)}M`;
    } else if (volume >= 1e3) {
      return `${(volume / 1e3).toFixed(1)}K`;
    }
    return volume.toString();
  };

  const formatMarketCap = (marketCap?: number) => {
    if (!marketCap) return 'N/A';
    if (marketCap >= 1e12) {
      return `${(marketCap / 1e12).toFixed(2)}T`;
    } else if (marketCap >= 1e9) {
      return `${(marketCap / 1e9).toFixed(1)}B`;
    } else if (marketCap >= 1e6) {
      return `${(marketCap / 1e6).toFixed(1)}M`;
    }
    return marketCap.toString();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-muted-foreground">Current Price</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-foreground">{formatPrice(metrics.current_price)}</span>
            <div className="flex items-center space-x-1">
              {isPositive && <TrendingUp className="h-4 w-4 text-primary" />}
              {isNegative && <TrendingDown className="h-4 w-4 text-destructive" />}
              {!isPositive && !isNegative && <Minus className="h-4 w-4 text-muted-foreground" />}
              <Badge 
                variant={isPositive ? 'default' : isNegative ? 'destructive' : 'secondary'}
                className={isPositive ? 'bg-primary text-primary-foreground' : ''}
              >
                {isPositive ? '+' : ''}{metrics.price_change_percentage?.toFixed(2)}%
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-muted-foreground">
            {metrics.period_label ? `${metrics.period_label} Change` : '24h Change'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <span className={`text-2xl font-bold ${
              isPositive ? 'text-primary' : isNegative ? 'text-destructive' : 'text-foreground'
            }`}>
              {formatPrice(Math.abs(metrics.price_change))}
            </span>
            <Badge 
              variant={isPositive ? 'default' : isNegative ? 'destructive' : 'secondary'}
              className={isPositive ? 'bg-primary text-primary-foreground' : ''}
            >
              {isPositive ? '+' : isNegative ? '-' : ''}{metrics.price_change_percentage?.toFixed(2)}%
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-muted-foreground">
            {metrics.period_label ? `${metrics.period_label} Range` : '52W Range'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Low:</span>
              <span className="font-medium text-foreground">{formatPrice(metrics.low_52w)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">High:</span>
              <span className="font-medium text-foreground">{formatPrice(metrics.high_52w)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-muted-foreground">Volume & Market Cap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Volume:</span>
              <span className="font-medium text-foreground">{formatVolume(metrics.volume)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Market Cap:</span>
              <span className="font-medium text-foreground">{formatMarketCap(metrics.market_cap)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default PriceMetrics;
