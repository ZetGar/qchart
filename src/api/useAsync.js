import { useReducer, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { networkErrorMsgState } from "../recoil/atoms/networkError";
import { internalCoreErrorMsgState } from "../recoil/atoms/internalCoreError";

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return {
        loading: true,
        data: null,
        interError: null,
        error: null,
      };
    case "SUCCESS":
      return {
        loading: false,
        data: action.data,
        interError: null,
        error: null,
      };
    case "INTERNAL_ERROR":
      return {
        loading: false,
        data: null,
        interError: true,
        error: null,
      };
    case "ERROR":
      return {
        loading: false,
        data: null,
        interError: null,
        error: true, //action.error
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
function useAsync(callback, deps, skip = false) {
  const setNetErrorMsg = useSetRecoilState(networkErrorMsgState);
  const setCoreServerError = useSetRecoilState(internalCoreErrorMsgState);
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    interError: false,
    error: false,
  });

  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    try {
      const data = await callback();
      if (data.Header.resultCode === "0000") {
        dispatch({ type: "SUCCESS", data: data.dataBody });
        setCoreServerError({ showMessage: false, message: "" });
      } else if (data.Header.resultCode !== "0000") {
        dispatch({ type: "INTERNAL_ERROR" });
        setCoreServerError({ showMessage: true, message: data.Header.message });
      }
    } catch (e) {
      dispatch({ type: "ERROR", error: e });
      setNetErrorMsg(true);
    }
  };

  useEffect(() => {
    if (skip) return;
    fetchData();
  }, deps);

  return [state, fetchData];
}

export default useAsync;
