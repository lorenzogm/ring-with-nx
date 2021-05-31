import { curveLinear, curveStep, curveCardinal } from '@visx/curve'

export type XYChartProps = {
  width: number
  height: number
  theme: 'dark' | 'light'
  data: Array<DataPoint>
  config: {
    chartType:
      | 'BarStack'
      | 'BarGroup'
      | 'BarSeries'
      | 'AreaStack'
      | 'AreaSeries'
      | 'LineSeries'
    theme: 'dark' | 'light'
    animationTrajectory: 'center'
    curveType: 'linear' | 'cardinal' | 'step'
    stackOffset?: 'wiggle' | 'expand' | 'diverging' | 'silhouette'
    renderHorizontally: boolean
    numTicks: number
    negativeValues: boolean
    grid: {
      showGridRows: boolean
      showGridColumns: boolean
    }
    xAxis: {
      label: string
      orientation?: 'top' | 'bottom'
    }
    yAxis: {
      label: string
      orientation?: 'right' | 'left'
    }
    tooltip: {
      showTooltip: boolean
      showHorizontalCrosshair: boolean
      showVerticalCrosshair: boolean
      snapTooltipToDatumX: boolean
      snapTooltipToDatumY: boolean
      sharedTooltip: boolean
    }
  }
}

export type AreaSeriesProps = {
  curve: typeof curveLinear | typeof curveCardinal | typeof curveStep
  data: XYChartProps['data']
}
export type AreaStackProps = {
  config: XYChartProps['config']
  curve: typeof curveLinear | typeof curveCardinal | typeof curveStep
  data: XYChartProps['data']
}
export type BarGroupProps = {
  data: XYChartProps['data']
}
export type BarSeriesProps = {
  data: XYChartProps['data']
}
export type BarStackProps = {
  config: XYChartProps['config']
  data: XYChartProps['data']
}
export type LineSeriesProps = {
  curve: typeof curveLinear | typeof curveCardinal | typeof curveStep
  data: XYChartProps['data']
}

export type DataPoint<T> = { label: string } & T
