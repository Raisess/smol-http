interface IQueryGet {
	(idx: string): string | undefined;
}

export interface IReq {
	query: IQueryGet;
	param: Array<string> | undefined;
	body:  any;
}

