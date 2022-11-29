import React, { useRef, useState } from "react";
import useAsync from "../../api/useAsync";
import { getSmartChart } from "../../api/smart.chart.js";
import CChart, { SMART, NSMA, VOLA, HIGH, VIX } from "./CChart.js";
import { useEffect } from "react";
import Loading from "./components/Loading";

const ChartJs = () => {
  const chart1 = useRef({});
  const chart2 = useRef({});
  const chart3 = useRef({});
  const chart4 = useRef({});
  const chart5 = useRef({});

  const [state] = useAsync(() => getSmartChart("1", "1", ""), [], false);

  const snpData = [];
  const naqData = [];
  // const kosData = [];
  // const koqData = [];

  const monthEng = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    // eslint-disable-next-line no-extend-native
    String.prototype.insertAt = function (index, str) {
      return this.slice(0, index) + str + this.slice(index);
    };

    if (state.data !== null) {
      const smtData = [];
      const maData = [];
      const vcData = [];
      const hyData = [];
      const vixData = [];
      const yAxisData = [];

      const years = [];
      const months = [];

      let idx = 0;

      // eslint-disable-next-line array-callback-return
      state.data.map((src, index) => {
        smtData.push(src.smt);
        snpData.push(src.snp);
        naqData.push(src.naq);
        maData.push(src.ma);
        vcData.push(src.vc);
        hyData.push(src.hy);
        vixData.push(src.vix);

        const dateConv = src.date.insertAt(6, "-").insertAt(4, "-");

        const date = new Date(dateConv);
        const year = date.getFullYear();
        const month = date.getMonth();

        idx += 1;
        index += 1;

        if (!years.includes(year)) {
          if (!(years.length > 0 && idx < 15)) {
            const display = monthEng[month] + " " + year;
            yAxisData.push({ data: dateConv, display: display });
          }

          years.push(year);
          months.push(month);
          months.length = 0;

          idx = 0;
        } else if (
          index >= state.data.length ||
          (!months.includes(month) && (month === 0 || (month + 1) % 3 === 0))
        ) {
          if (!(years.length > 0 && idx < 15)) {
            yAxisData.push({ data: dateConv, display: monthEng[month] });
          }

          months.push(month);

          idx = 0;
        } else {
          yAxisData.push({ data: dateConv, display: "" });
        }
      });

      chart1.current.initialChartData(
        SMART,
        yAxisData,
        snpData,
        smtData,
        "S&P 500"
      );
      chart2.current.initialChartData(
        NSMA,
        yAxisData,
        snpData,
        maData,
        "S&P 500"
      );
      chart3.current.initialChartData(
        VOLA,
        yAxisData,
        snpData,
        vcData,
        "S&P 500"
      );
      chart4.current.initialChartData(
        HIGH,
        yAxisData,
        snpData,
        hyData,
        "S&P 500"
      );
      chart5.current.initialChartData(
        VIX,
        yAxisData,
        snpData,
        vixData,
        "S&P 500"
      );
    }
  }, [state.data]);

  function changedCombo(e) {
    if (e.target.value === "snp") {
      chart1.current.updateChartData(SMART, snpData, "S&P 500");
      chart2.current.updateChartData(NSMA, snpData, "S&P 500");
      chart3.current.updateChartData(VOLA, snpData, "S&P 500");
      chart4.current.updateChartData(HIGH, snpData, "S&P 500");
      chart5.current.updateChartData(VIX, snpData, "S&P 500");
    } else {
      chart1.current.updateChartData(SMART, naqData, "NASDAQ");
      chart2.current.updateChartData(NSMA, naqData, "NASDAQ");
      chart3.current.updateChartData(VOLA, naqData, "NASDAQ");
      chart4.current.updateChartData(HIGH, naqData, "NASDAQ");
      chart5.current.updateChartData(VIX, naqData, "NASDAQ");
    }
  }

  return (
    <div className="chartWrapper">
      {state.data == null ? (
        <Loading />
      ) : (
        <div>
          <div className="SelectBox" onChange={changedCombo}>
            <input
              type="radio"
              name="select"
              id="snp"
              value="snp"
              defaultChecked
            />
            <label htmlFor="snp">S&#38;P</label>

            <input type="radio" name="select" id="nasdaq" value="nasdaq" />
            <label htmlFor="nasdaq">NASDAQ</label>

            {/* <input type="radio" name="select" id="kospi" value="kospi" />
            <label for="kospi">KOSPI</label>

            <input type="radio" name="select" id="kosdaq" value="kosdaq" />
            <label for="kosdaq">KOSDAQ</label> */}
          </div>

          <div>
            <div className="smart">
              <CChart ref={chart1} chartType={SMART} />
              <img src="./image/chartStep.png" alt="" />
            </div>
            <p>
              투자온도계(SMART Index)는 빠르게 변화하는 시장의 국면을 판단하는
              기준으로 삼기 위해 만들어졌습니다. 시장의 위험도를 파악하는 다양한
              지표들의 통계적 분포 파악 및 통계적 확률을 고려하여 최적의 비중을
              할당하고 하나의 INDEX로 결합합니다. 결과값은 온도계의 형태로
              제공되어 온도에 따라 5단계 (과열,상승,안정,공포,냉각) 로 구분되며,
              각 단계에 따라 포트폴리오의 현금비중을 조절하여 장기투자에서
              포트폴리오의 변동성을 줄이는 방식으로 활용합니다.
            </p>
          </div>

          <div className="eachChart">
            <h4>
              200일 이동평균선 상회 종목 수
              <span>Number of Stocks above the Moving Average</span>
            </h4>
            <div className="Cartt">
              <CChart ref={chart2} chartType={NSMA} />
            </div>
            <p>
              일반적으로 주가지수는 시가총액 비중으로 구해진 일정 개수의
              종목들로 구성되어 있습니다. 이 때문에 지수의 움직임이 소수의
              시가총액이 큰 대형주에 영향을 크게 받아 투자자의 인식과는 다른
              시장상황을 보여주기도 합니다. SMART는 현재 시장상황 파악이 쉽도록
              주가지수 구성 전종목에 동일한 비중을 할당합니다. 그리고 각 종목의
              투자자 평균진입시점인 이동평균선과의 비교를 통해 종목의 상황을
              도출합니다. 이는 구성종목 전체의 비율을 통해 대다수의 투자자가
              느끼는 시장에 대한 감정을 수치화한 방법론입니다.
            </p>
          </div>

          <div className="eachChart">
            <h4>
              변동성 군집
              <span>Volatility Clustering Index</span>
            </h4>

            <div className="Cartt">
              <CChart ref={chart3} chartType={VOLA} />
            </div>

            <p>
              변동성은 일정 기간 시장 움직임의 크기를 뜻하며 상호 간 영향을 끼쳐
              군집성을 띄는 특징이 있습니다. 변동성 군집은 형성된 변동성 간
              상호작용으로 시장의 불확실성이 확대되며 폭등과 폭락을 반복되는
              현상을 말합니다. 해당 기간에는 손실의 크기 또한 커질 수 있어
              장기투자를 어렵게 하기 때문에 주의깊게 관찰합니다.
            </p>
          </div>

          <div className="eachChart">
            <h4>
              하이일드 채권 스프레드
              <span>High Yield Bond Spread</span>
            </h4>

            <div className="Cartt">
              <CChart ref={chart4} chartType={HIGH} />
            </div>

            <p>
              시장의 자금 이동은 일반적으로 규모가 더 큰 채권시장의 변화에
              영향을 받습니다.. 하이일드 채권 스프레드는 특정 등급의 하이일드
              채권 수익률과 안전자산으로 분류되는 국채 수익률의 차이를 말합니다.
              신용도가 낮은 기업들이 발행한 채권인 하이일드 채권 금리와 국채
              금리의 격차가 벌어질수록 안전자산 대비 위험자산에 대한 선호도가
              낮아집니다. 디폴트 위험이 증가할수록 투자자들은 하이일드 채권에 더
              높은 금리를 요구하기 때문에 하이일드 스프레드가 증가하는 것은
              경기침체의 신호로 여겨집니다.
            </p>
          </div>

          <div className="eachChart">
            {/* <p className="CHART">Chart 5</p> */}
            <h4>
              변동성 지수 <span>VIX Index</span>
            </h4>

            <div className="Cartt">
              <CChart ref={chart5} chartType={VIX} />
            </div>

            <p>
              VIX 지수는 S&#38;P 500 지수 옵션의 향후 30일간의 변동성에 대한
              시장의 기대를 나타내는 수치입니다. 미래의 여러 기간과 가격대에
              걸친 옵션의 변동성을 파악하기에 주가지수가 폭락할 때 급등하는
              경향이 있습니다. VIX 지수가 상승할수록 시장 참여자들은 향후 시장
              방향이 불확실할 것을 기대하므로, VIX 지수가 높을 때는 위험자산에
              대한 회피 심리가 강해집니다. 시장변화에 민감한 스마트머니가 많은
              파생상품 시장이 시장 움직임을 가장 빠르게 반영하기에 이를
              활용합니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default ChartJs;
