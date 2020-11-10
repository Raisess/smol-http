export interface IRoute {
	method:    string;
	endpoint:  string;
	callback?: Function;
	res: {
		statusCode: number;
		json:       any;
	};
}

