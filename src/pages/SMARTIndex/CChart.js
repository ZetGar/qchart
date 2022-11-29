import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

import Chart from "chart.js";

export const SMART = 1;
export const NSMA = 2;
export const VOLA = 3;
export const HIGH = 4;
export const VIX = 5;

const CChart = forwardRef((props, ref) => {
  const chartRef = useRef(null);
  const [chart, setChart] = useState();
  const [chartType, setChartType] = useState(props.chartType);

  //#region Export
  function updateChartData(_chartType, _lxAxisData, _leftLegend) {
    if (chartType !== _chartType) return;

    if (chart !== undefined) {
      chart.config.data.datasets[0].data = _lxAxisData;
      chart.config.data.datasets[0].label = _leftLegend;
      chart.update();
    }
  }

  function initialChartData(
    _chartType,
    _yAxisData,
    _lxAxisData,
    _rxAxisData,
    _leftLegend
  ) {
    if (chartType !== _chartType) return;

    console.log(chart);

    if (chart !== undefined) {
      chart.data.labels = _yAxisData;
      chart.config.data.datasets[1].data = _rxAxisData;
      chart.config.data.datasets[0].data = _lxAxisData;
      chart.config.data.datasets[0].label = _leftLegend;

      // eslint-disable-next-line default-case
      switch (_chartType) {
        case SMART:
          chart.config.data.datasets[1].label = "125-day moving average";
          break;
        case NSMA:
          chart.config.data.datasets[1].label = "200일 이동평균선 상회 종목 수";
          break;
        case VOLA:
          chart.config.data.datasets[1].label = "변동성 군집";
          break;
        case HIGH:
          chart.config.data.datasets[1].label = "하이일드 채권 스프레드";
          break;
        case VIX:
          chart.config.data.datasets[1].label = "변동성 지수";
          break;
      }
      chart.update();
    }
  }

  useImperativeHandle(ref, () => ({
    updateChartData,
    initialChartData,
  }));
  //#endregion Export

  useEffect(() => {
    if (chartRef?.current) {
      const chartToDraw = chartRef.current.getContext("2d");

      const chart = new Chart(chartToDraw, {
        type: "line",
        data: {
          datasets: [
            {
              fill: false,
              borderColor: "#396AC1",
              yAxisID: "A",
              borderWidth: 2,
              pointRadius: 0,
              pointHoverRadius: 2,
              pointHitRadius: 5,
            },
            {
              fill: false,
              borderColor: "#ED7B2E",
              yAxisID: "B",
              borderJoinStyle: "round",
              borderWidth: 2,
              pointRadius: 0,
              pointHoverRadius: 2,
              pointHitRadius: 5,
              // paddings: {
              //   left: 20,
              // }
            },
          ],
        },
        options: {
          // maintainAspectRatio: false,
          legend: {
            align: "start",
            display: true,
            usePointStyle: true,
            labels: {
              boxWidth: 8,
              usePointStyle: true,
              pointStyle: "circle",
              pointStyleWidth: 5,
              useBorderRadius: true,
              generateLabels: function (chart) {
                const labels =
                  Chart.defaults.global.legend.labels.generateLabels(chart);
                return labels.map((property) => {
                  return { ...property, fillStyle: property.strokeStyle };
                });
              },
            },
          },
          tooltips: {
            enabled: true,
            callbacks: {
              title: function (tooltipItem, data, index) {
                return tooltipItem[0].xLabel.data;
              },
              label: function (tooltipItem, data, index) {
                return tooltipItem.value;
              },
            },
          },
          scales: {
            xAxes: [
              {
                id: "X",
                ticks: {
                  minRotation: 30, // x축 값의 회전 각도를 설정할 수 있어요.
                  autoSkip: false,
                  callback: function (value, index, values) {
                    if (value.display !== "") return value.display;
                    return undefined;
                  },
                },
              },
            ],
            yAxes: [
              {
                id: "A",
                type: "linear",
                position: "left",
                ticks: {
                  padding: 5,
                  fontColor: "#323232",
                },
              },
              {
                id: "B",
                type: "linear",
                position: "right",
                display: "auto",
                gridLines: false,
                minLabelPosition: 0,
                maxLabelPosition: 100,
                ticks: {
                  padding: 5,
                  fontColor: "#323232",
                  align: "end",
                  callback: function (value, index, values) {
                    if (chartType === SMART) {
                      if (!(value % 20)) return value + " °";
                      else return undefined;
                    }
                    return value + "";
                  },
                },
              },
            ],
          },
        },
      });

      setChart(chart);
      console.log(setChart(chart) == true);
      console.log(chart);
    }
  }, [chartRef]);

  console.log(chartRef);

  return (
    <>
      {/* <div style={{ width: "80%", height: "50%" }}>
        <canvas
          id="myChart"
          ref={chartRef}
          style={{ width: "100vw", height: "20vh" }}
        />
      </div> */}

      {chartType === SMART ? (
        <div style={{ width: "1000px", height: "380px" }}>
          <canvas
            id="myChart"
            ref={chartRef}
            style={{ width: "45vw", height: "25vh" }}
          />
        </div>
      ) : (
        <div style={{ width: "1080px", height: "400px" }}>
          <canvas
            id="myChart"
            ref={chartRef}
            style={{ width: "45vw", height: "25vh" }}
          />
        </div>
      )}
    </>
  );
});

export default CChart;
