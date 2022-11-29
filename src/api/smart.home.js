import {
  API_SERVER,
  makeHeader,
  makeFetchOption,
  SMART_HOME_GET,
} from "./api.config.js";

export const getSmartHome = async (job_kind, company, workdttm, uid) => {
  try {
    // if (uid == "") {
    //   return;
    // }
    const header = makeHeader(SMART_HOME_GET, uid);
    const body = { job_kind: job_kind, company: company, workdttm: workdttm };
    const option = makeFetchOption(header, body);
    const response = await fetch(API_SERVER, option);
    const data = await response.json();
    return data?.content;
  } catch (err) {
    console.log(err);
    throw Error("서버 장애가 생겼습니다. 재시도 바랍니다.");
  }
};
