import {
  API_SERVER,
  makeHeader,
  makeFetchOption,
  SMART_CHART_GET,
} from "./api.config.js";

export const getSmartChart = async (job_kind, company, uid) => {
  try {
    const header = makeHeader(SMART_CHART_GET, uid);
    const body = { job_kind: job_kind, company: company };
    const option = makeFetchOption(header, body);
    console.log("option", option);
    const response = await fetch(API_SERVER, option);
    const data = await response.json();
    console.log("data", data);
    return data?.content;
  } catch (err) {
    console.log(err);
    throw Error("서버 장애가 생겼습니다. 재시도 바랍니다.");
  }
};
