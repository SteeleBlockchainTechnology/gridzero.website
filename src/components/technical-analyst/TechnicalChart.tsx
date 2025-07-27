import React from 'react';
import Plot from 'react-plotly.js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/landing/ui/card';

interface TechnicalChartProps {
  data: any[];
  layout: any;
  ticker?: string;
}

const TechnicalChart: React.FC<TechnicalChartProps> = ({ data, layout, ticker }) => {
  // Default layout with dark theme
  const defaultLayout = {
    autosize: true,
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: {
      color: '#ffffff',
      family: 'Geist, sans-serif'
    },
    xaxis: {
      gridcolor: '#374151',
      zerolinecolor: '#374151',
      color: '#9CA3AF'
    },
    yaxis: {
      gridcolor: '#374151',
      zerolinecolor: '#374151',
      color: '#9CA3AF'
    },
    margin: {
      l: 50,
      r: 50,
      t: 50,
      b: 50
    },
    hovermode: 'x unified',
    showlegend: true,
    legend: {
      orientation: 'h',
      y: -0.2
    },
    ...layout
  };

  const config = {
    displayModeBar: true,
    modeBarButtonsToRemove: [
      'pan2d' as const,
      'lasso2d' as const,
      'select2d' as const,
      'autoScale2d' as const,
      'hoverClosestCartesian' as const,
      'hoverCompareCartesian' as const,
      'toggleSpikelines' as const
    ],
    displaylogo: false,
    responsive: true
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {ticker ? `${ticker} Technical Chart` : 'Technical Chart'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[400px] md:h-[500px]">
          <Plot
            data={data}
            layout={defaultLayout}
            config={config}
            style={{ width: '100%', height: '100%' }}
            useResizeHandler={true}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TechnicalChart;
