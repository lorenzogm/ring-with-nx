import { curveLinear, curveStep, curveCardinal } from '@visx/curve'
import { lightTheme, darkTheme } from '@visx/xychart'
import merge from 'lodash.merge'
import get from 'lodash.get'
import { Axis, Grid, Tooltip, XYChart } from '@visx/xychart'
import AreaSeries from './AreaSeries'
import AreaStack from './AreaStack'
import BarGroup from './BarGroup'
import BarSeries from './BarSeries'
import BarStack from './BarStack'
import LineSeries from './LineSeries'
import { useMemo } from 'react'

import ChartBackground from './ChartBackground'
import { DataPoint, XYChartProps } from './index.d'
import formatDate from '@ring/utils/formatDate'

const defaultConfig = {
  chartType: 'LineSeries',
  renderHorizontally: false,
  theme: 'dark',
  animationTrajectory: 'center',
  curveType: 'cardinal',
  grid: {
    showGridRows: true,
    showGridColumns: true,
  },
  negativeValues: false,
  numTicks: 4,
  xAxis: {
    orientation: 'bottom',
  },
  yAxis: {
    orientation: 'left',
  },
  xScale: { type: 'band', paddingInner: 0.3 },
  yScale: { type: 'linear' },
  tooltip: {
    showTooltip: true,
    showHorizontalCrosshair: true,
    showVerticalCrosshair: true,
    snapTooltipToDatumX: true,
    snapTooltipToDatumY: true,
    sharedTooltip: true,
  },
}

export default function ChartXY({
  height,
  theme = 'dark',
  data,
  config: customConfig,
}: XYChartProps) {
  const config = merge(defaultConfig, customConfig)
  const curve =
    config.curveType === 'cardinal'
      ? curveCardinal
      : config.curveType === 'step'
      ? curveStep
      : curveLinear

  const xScale = useMemo(
    () => (config.renderHorizontally ? config.yScale : config.xScale),
    [config.renderHorizontally],
  )
  const yScale = useMemo(
    () => (config.renderHorizontally ? config.xScale : config.yScale),
    [config.renderHorizontally],
  )

  return (
    <XYChart
      theme={theme === 'dark' ? darkTheme : lightTheme}
      // @ts-expect-error TODO
      xScale={xScale}
      // @ts-expect-error TODO
      yScale={yScale}
      height={Math.min(400, height)}
    >
      <ChartBackground />
      <Grid
        key={`grid-${config.animationTrajectory}`} // force animate on update
        rows={config.grid.showGridRows}
        columns={config.grid.showGridColumns}
        numTicks={config.numTicks}
      />
      {config.chartType === 'AreaSeries' ? (
        <AreaSeries curve={curve} data={data} />
      ) : config.chartType === 'AreaStack' ? (
        <AreaStack config={config} curve={curve} data={data} />
      ) : config.chartType === 'BarGroup' ? (
        <BarGroup data={data} />
      ) : config.chartType === 'BarSeries' ? (
        <BarSeries data={data} />
      ) : config.chartType === 'BarStack' ? (
        <BarStack config={config} data={data} />
      ) : config.chartType === 'LineSeries' ? (
        <LineSeries curve={curve} data={data} />
      ) : null}
      <Axis
        key={`x-axis-${config.animationTrajectory}-${config.renderHorizontally}`}
        orientation={
          config.renderHorizontally
            ? config.yAxis.orientation
            : config.xAxis.orientation
        }
        numTicks={config.numTicks}
        tickFormat={formatDate}
      />
      <Axis
        key={`y-axis-${config.animationTrajectory}-${config.renderHorizontally}`}
        label={
          config.stackOffset == null
            ? config.yAxis.label
            : config.stackOffset === 'expand'
            ? 'Fraction of total temperature'
            : ''
        }
        orientation={
          config.renderHorizontally
            ? config.xAxis.orientation
            : config.yAxis.orientation
        }
        numTicks={config.numTicks}
        // values don't make sense in stream graph
        tickFormat={config.stackOffset === 'wiggle' ? () => '' : formatNumber}
      />
      {config.tooltip.showTooltip && (
        <Tooltip<DataPoint>
          showHorizontalCrosshair={config.tooltip.showHorizontalCrosshair}
          showVerticalCrosshair={config.tooltip.showVerticalCrosshair}
          snapTooltipToDatumX={config.tooltip.snapTooltipToDatumX}
          snapTooltipToDatumY={config.tooltip.snapTooltipToDatumY}
          showDatumGlyph={
            (config.tooltip.snapTooltipToDatumX ||
              config.tooltip.snapTooltipToDatumY) &&
            config.chartType !== 'BarGroup'
          }
          showSeriesGlyphs={
            config.tooltip.sharedTooltip && config.chartType !== 'BarGroup'
          }
          renderTooltip={({ tooltipData, colorScale }) => (
            <>
              {formatDate(get(tooltipData, 'nearestDatum.datum.label'))}
              <br />
              <br />
              {(config.tooltip.sharedTooltip
                ? Object.keys(tooltipData?.datumByKey ?? {})
                : [tooltipData?.nearestDatum?.key]
              )
                .filter((key) => !!key)
                .map((key: string) => {
                  const value = tooltipData?.nearestDatum?.datum[key]
                  return (
                    <div key={key}>
                      <em
                        style={{
                          color: colorScale?.(key),
                          textDecoration:
                            tooltipData?.nearestDatum?.key === key
                              ? 'underline'
                              : undefined,
                        }}
                      >
                        {key}
                      </em>{' '}
                      {typeof value === 'number' ? formatNumber(value) : value}
                    </div>
                  )
                })}
            </>
          )}
        />
      )}
    </XYChart>
  )
}

function formatNumber(number: number) {
  // @ts-expect-error maybe one day
  const o = Intl.NumberFormat('en', { notation: 'compact' })
  return o.format(number)
}
