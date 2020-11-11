import { IReq } from "./IReq";

interface IRes {
	(req: IReq): {
		statusCode: number;
		json:       any;
	};
}

export interface IRoute {
	endpoint:  string;
	method:    ReqMethod;
	res:       IRes;
}

