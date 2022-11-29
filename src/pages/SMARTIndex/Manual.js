const Manual = () => {
  return (
    <div className="manual">
      <div className="thermometerManual">
        <h3>투자온도계 사용 설명서</h3>
        <p>
          ‘SMART’는 각 단계에 따라 위험자산과 안전자산 비중을 조절함으로써,
          포트폴리오의 변동성을 줄이는 것을 목적으로 설계하였습니다.
          <br />
          예를 들면
        </p>

        <div className="graybox">
          <h4>1. Trend Following (추세추종 스타일)</h4>
          <p>
            시장에 형성된 추세는 일정기간 유지되는 경향이 있습니다. 따라서
            추세추종 스타일의 경우, 과열에 해당하는 국면으로 갈수록 주식 비중을
            늘리고 냉각 상태로 갈수록 현금비중을 늘리는 방식으로 포트폴리오를
            운용할 수 있습니다.
            {/* <span className="graytext">예 : -10°c에서 주식 비중 100%</span> */}
          </p>
        </div>

        <div className="graybox">
          <h4>2. Counter Trend (역추세매매 스타일)</h4>
          <p>
            역추세매매의 경우, 앞으로 추세가 반전될 것을 기대하고 시장의
            방향과는 반대로 투자합니다. 흔히 말하는 가치투자에 가까운 스타일로
            이 경우에는 과열 상태로 향할 수록 현금의 비중을 줄이고 냉각 상태로
            갈 수록 주식의 비중을 늘리는 방향으로 투자하는 것이 적합할 수
            있습니다.
            {/* <span className="graytext">예 : -10°c에서 주식 비중 100%</span> */}
          </p>
        </div>

        <div>
          <img src="./image/stepByTemperature.png" />
        </div>
      </div>

      <div className="quantecCts">
        <h3>콴텍 자세히 알아보기​</h3>
        <p>
          오직 숫자로 이기는 투자, 콴텍!
          <br />
          콴텍은 빅데이터와 인공지능을 활용한 디지털 자산관리 서비스를 제공하는
          로보어드바이저입니다. <br />
          금융시장의 데이터 분석을 통해 최적의 포트폴리오를 제공하는 투자엔진,
          Q-Engine과 24시간 시장의 위험지표를 관찰해 포트폴리오의 변동성을
          관리하는 위험관리모델, Q-Crisis index의 성과를 기반으로 증권사, 은행,
          자산운용사 등 10여 개의 금융기관과 협업하여 서비스를 제공하고
          있습니다.
        </p>

        <div>
          <div>
            <h4>고객사소개</h4>
            <p>콴텍의 Digital solution을 도입한 고객들입니다.</p>

            <ul>
              <li className="box">
                <div>
                  <img src="./image/securities_1.png" />
                </div>
                <h4>KB증권</h4>
                <p>
                  국내 최초​ 하이브리드
                  <br /> 로보어드바이저​ 독점 계약​
                </p>
              </li>
              <li className="box">
                <div>
                  <img src="./image/securities_2.png" />
                </div>
                <h4>IBK자산운용</h4>
                <p>
                  자문형 공모펀드 출시
                  <br /> ‘IBK 콴텍 디지털포트 EMP'
                </p>
              </li>
              <li className="box">
                <div>
                  <img src="./image/securities_3.png" />
                </div>
                <h4>신한은행​</h4>
                <p>
                  신한은행 GMS 자문
                  <br /> (고유자금운용)
                </p>
              </li>
              <li className="box">
                <div>
                  <img src="./image/securities_4.png" />
                </div>
                <h4>KB국민카드</h4>
                <p>
                  오늘의 AI 투자 날씨​ 서비스 <br />
                  제공​ 자산관리 영역으로​ <br />
                  확대 예정​
                </p>
              </li>
              <li className="box">
                <div>
                  <img src="./image/securities_5.png" />
                </div>
                <h4>한화투자증권​</h4>
                <p>
                  AI 자문형 Wrap <br />
                  account 출시 및 <br />
                  테마포트폴리오 서비스 <br />
                  개발 진행 중​
                </p>
              </li>
              <li className="box">
                <div>
                  <img src="./image/securities_6.png" />
                </div>
                <h4>하나은행​</h4>
                <p>
                  하나은행​ 최초​ <br />
                  로보어드바이저 신탁 <br />
                  상품 출시​
                </p>
              </li>
              <li className="box">
                <div>
                  <img src="./image/securities_7.png" />
                </div>
                <h4>DB금융투자</h4>
                <p>
                  국내 로보어드바이저 최초 <br />
                  1~3호 랩 어카운트 출시 및 <br />
                  IRA 서비스 도입​
                </p>
              </li>
              <li className="box">
                <div>
                  <img src="./image/securities_8.png" />
                </div>
                <h4>신한투자증권​</h4>
                <p>
                  해외 주식형 및​ EMP <br />
                  랩어카운트​ 상품 출시​
                </p>
              </li>
              <li className="box">
                <div>
                  <img src="./image/securities_9.png" />
                </div>
                <h4>SK증권</h4>
                <p>
                  RA 자산배분 <br />
                  자문형 Wrap 출시 및​ <br />
                  주식형 Wrap 출시 예정​​
                </p>
              </li>
              <li className="box">
                <div>
                  <img src="./image/securities_10.png" />
                </div>
                <h4>흥국자산운용​</h4>
                <p>
                  공모펀드 위험관리​ <br />
                  자문 중​ ‘Q-Crisis index’
                </p>
              </li>
            </ul>
          </div>

          <div className="crowns">
            <h4>콴텍은 3관왕입니다!</h4>
            <ul>
              <li className="box">
                <img src="./image/cw_1.png" />
                <h4>수익률 1등</h4>
                <p>
                  2년 6개월 연속 로보어드바이저 테스트베드 수익률 1위 기록! 누적
                  수익률 202.51%를 기록했습니다.
                </p>
                <span>
                  (22년 9월 기준, 코스콤 RA테스트베드 콴텍 가치투자 주식형 2호)
                </span>
              </li>
              <li className="box">
                <img src="./image/cw_2.png" />
                <h4>알고리즘 1등</h4>
                <p>
                  전체 45% 알고리즘 차지 ! 금융위원회가 인정한 전체 81개의
                  상용가능한 알고리즘 중 37개가 등록되어있습니다.
                </p>
                <span>(22년 9월 기준, 코스콤 RA테스트베드)</span>
              </li>
              <li className="box">
                <img src="./image/cw_3.png" />
                <h4>관리자산 1등</h4>
                <p>
                  AUM 3조 5,703억원으로 로보어드바이저 업계 1위를 달성했습니다.
                </p>
                <span>(22년 2분기 기준, 금융투자협회공시)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Manual;
