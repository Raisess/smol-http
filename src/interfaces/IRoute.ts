export interface IRoute {
	method:    string;
	endpoint:  string;
	body?:     string;
	callback?: Function;
	res: {
		statusCode: number;
		json:       any;
	};
}

