import "./../../style/main.css";

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import useAsync from "../../api/useAsync";
import { getSmartHome } from "../../api/smart.home.js";
import Loading from "./components/Loading";

// 차트
import Chart from "chart.js";

const Main = () => {
  const chartRef = useRef(null);

  //서버 데이터 가져오기
  const [state] = useAsync(() => getSmartHome("1", "1", ""), [], false);

  const [smtintNum, setSmt_idx] = useState(0);
  const [bef_day, setBef_day] = useState();
  const [bef_week, setBef_week] = useState();
  const [bef_month, setBef_month] = useState();
  const [workdttm, setWorkdttm] = useState();
  const [temperature, setTemperature] = useState("#F0F0F0");

  const setColor = (temp) => {
    if (temp >= 0 && temp <= 20) {
      setTemperature("#1B7CD4");
    } else if (temp >= 21 && temp <= 40) {
      setTemperature("#4BC2C2");
    } else if (temp >= 41 && temp <= 60) {
      setTemperature("#679A40");
    } else if (temp >= 61 && temp <= 80) {
      setTemperature("#F49864");
    } else if (temp >= 81 && temp <= 100) {
      setTemperature("#C94F4F");
    }
  };

  const getContext = (temp) => {
    if (temp >= 21 && temp <= 40) {
      return {
        image: "./image/feer.png",
        context: (
          <>
            <h4>공포</h4>
            <p>
              기대수익률을 낮추고
              <br />
              변동성 관리를 우선시하세요.
            </p>
          </>
        ),
      };
    } else if (temp >= 41 && temp <= 60) {
      return {
        image: "./image/stability.png",
        context: (
          <>
            <h4>안정</h4>
            <p>
              현재 포트폴리오를 유지하면서
              <br />
              시장의 추세 전환에 주목하세요
            </p>
          </>
        ),
      };
    } else if (temp >= 61 && temp <= 80) {
      return {
        image: "./image/increase.png",
        context: (
          <>
            <h4>상승</h4>
            <p>
              위험자산의 비중 확대를 <br /> 고려해 보세요.
            </p>
          </>
        ),
      };
    } else if (temp >= 81 && temp <= 100) {
      return {
        image: "./image/overhit.png",
        context: (
          <>
            <h4>과열</h4>
            <p>
              시장의 과열에
              <br />
              주의해 주세요!
            </p>
          </>
        ),
      };
    } else {
      return {
        image: "./image/freeze.png",
        context: (
          <>
            <h4>냉각</h4>
            <p>
              시장이 얼어붙어 있습니다.
              <br />
              급락에 유의하세요!
            </p>
          </>
        ),
      };
    }
  };

  useEffect(() => {
    // 데이터 넣기
    if (state.data !== null) {
      const temp = Number(state.data.smt_idx);
      setSmt_idx(temp);
      setBef_day(state.data.bef_day);
      setBef_week(state.data.bef_week);
      setBef_month(state.data.bef_month);
      setWorkdttm(state.data.workdttm);

      setColor(temp);
    }
  }, [state.data]);

  useEffect(() => {
    // 차트그리기
    if (chartRef?.current) {
      const chartToDraw = chartRef.current.getContext("2d");
      new Chart(chartToDraw, {
        type: "bar",
        data: {
          labels: ["오늘의 투자온도"],
          datasets: [
            {
              label: "",
              barThickness: 40,
              data: [smtintNum],
              backgroundColor: temperature,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                display: false,
              },
            ],
            yAxes: [
              {
                display: false,
                ticks: {
                  beginAtZero: true,
                  max: 100,
                  steps: 10,
                  stepValue: 1,
                },
              },
            ],
          },
          annotation: {
            drawTime: "afterDatasetsDraw", // (default)
            events: ["click"],
            dblClickSpeed: 350, // ms (default)
            annotations: [
              {
                drawTime: "afterDraw",
                id: "a-line-1",
                type: "line",
                mode: "horizontal",
                scaleID: "y-axis-0",
                value: "25",
                borderColor: "red",
                borderWidth: 2,
              },
            ],
          },
        },
      });
    }
  }, [chartRef, smtintNum]);

  // 냉각단계
  function stepTemper() {
    const con = getContext(smtintNum);
    return (
      <>
        <div>
          <img src={con.image} />
        </div>
        <div>{con.context}</div>
      </>
    );
  }

  // 전일, 전월, 전년 대비
  function prepare(cts) {
    if (cts > 0) {
      return (
        <div style={{ color: "#c94f4f", fontWeight: "700" }}>
          <p style={{ fontSize: "24px" }}>+{cts}°</p>
          <p style={{ fontSize: "14px" }}>상승</p>
        </div>
      );
    } else if (cts < 0) {
      <div style={{ color: "#4492fb", fontWeight: "700" }}>
        <p style={{ fontSize: "24px" }}>{cts}°</p>
        <p style={{ fontSize: "14px" }}>하락</p>
      </div>;
    } else {
      <div style={{ color: "#8e8e8e", fontWeight: "700" }}>
        <p style={{ fontSize: "24px" }}>{cts}°</p>
        {/* <p style={{ fontSize: "14px" }}>동일</p> */}
      </div>;
    }
  }

  // 온도계 원형 색상
  function circleTemper() {
    return (
      <div style={{ background: temperature }}>
        <span>{smtintNum}°</span>
      </div>
    );
  }

  // 업데이트 날짜 구분
  function dateToString(cts) {
    let str = cts + "";

    let year = str.substr(0, 4);
    let month = str.substr(4, 2);
    let day = str.substr(6, 2);
    let hour = str.substr(8, 2);
    let min = str.substr(10, 2);
    let sec = str.substr(12, 2);

    return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
  }
  // alert(workdttm);

  return (
    <div>
      {state.data == null ? (
        <Loading />
      ) : (
        <>
          <div className="thermometer">
            <h3>오늘의 투자 온도</h3>
            <div className="thermometer_bg">
              <span />
              <span />
            </div>

            <div className="chartWrap">
              <canvas id="myChart" ref={chartRef} height="80%" width="100%" />
            </div>
            {circleTemper()}
          </div>
          <div className="thermometerCts">
            <img src="./image/thermometerCts.png" alt="" />
          </div>

          <div className="cts">
            <div className="btn">
              <Link to="smartindex">시계열 차트 보기</Link>
            </div>

            <div className="temperatureStep">
              <div className="tit">
                <h3>냉각단계</h3>

                <div className="btn stepbtn">
                  <Link to="manual">단계별 설명 보기</Link>
                </div>
              </div>

              {/* 단계별 변경되는 부분 */}
              <div className="titcts">{stepTemper()}</div>
            </div>

            <div className="compare">
              <div>
                <p>전일</p>
                {prepare(bef_day)}
              </div>
              <div>
                <p>전주</p>
                {prepare(bef_week)}
              </div>
              <div>
                <p>전월</p>
                {prepare(bef_month)}
              </div>
            </div>

            <div className="footer">
              <span>Last updated {dateToString(workdttm)}</span>
              <Link to="manual">
                <img
                  src="./image/management_en_h_c.svg"
                  alt="콴텍투자일임 주식회사"
                />
              </Link>
            </div>

            <div className="copyright">
              <span>COPYRIGHT (C) (주)콴텍투자일임 ALL RIGHTS RESERVED.</span>
              <span>
                투자온도계에 제공하는 정보는 참고용이며, 이용자의 판단에 따른
                투자 수익 및 정보의 오류 등에 따른 손익에 대해서는 책임지지
                않습니다.
              </span>
              {/* <img src="./image/copyright.png" /> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Main;
