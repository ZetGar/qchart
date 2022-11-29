export const DEV_API_SERVER =
  "https://myanalyst.quantec.co.kr:9100/kb/common/kbcard";
export const PROD_API_SERVER =
  "https://myanalyst.quantec.co.kr:9100/tg/common/DBService";
export const TEST_API_SERVER = "https://qm.quantec.co.kr/tg/common/service";
export const API_SERVER = PROD_API_SERVER; //PROD_API_SERVER;

export const SMART_HOME_GET = "1001";
export const SMART_CHART_GET = "1002";

export const makeHeader = (tr, uid) => {
  return {
    workCode: tr,
    resultCode: "0000",
    message: "",
    uid: uid ? uid : "",
    ipAddr: "",
  };
};

export const makeFetchOption = (header, body) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Header: header,
      dataBody: body,
    }),
  };
};
