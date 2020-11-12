interface IQueryGet {
	(idx: string): string | undefined;
}

interface IParamGet {
	(idx: string): string | undefined;
}

export interface IReq {
	query: IQueryGet;
	param: IParamGet;
	body:  any;
}

