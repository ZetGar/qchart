import { atom } from "recoil";

export const networkErrorMsgState = atom({
	key: "networkErrorMsgState",
	default: {
		showMessage: false,
		message: "네트워크 문제 혹은 일시적인 오류로 페이지를 불러올 수 없습니다.",
	},
});
