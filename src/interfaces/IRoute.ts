export interface IRoute {
	endpoint:  string;
	method:    ReqMethod;
	callback?: Function;
	res: {
		statusCode: number;
		json:       any;
	};
}

