import { atom } from "recoil";

export const internalCoreErrorMsgState = atom({
	key: "internalCoreErrorMsgState",
	default: {
		showMessage: false,
		message: ""
	}
});
