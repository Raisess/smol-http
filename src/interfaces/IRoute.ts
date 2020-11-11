import { IReq } from "./IReq";
import { IRes } from "./IRes";

interface IResFunction {
	(req: IReq): IRes;
}

export interface IRoute {
	endpoint:  string;
	method:    ReqMethod;
	res:       IResFunction;
}

