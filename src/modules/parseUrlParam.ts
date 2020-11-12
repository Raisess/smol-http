export default function parseUrlParam(reqUrl: string, url: string): ParamTupleArray {
	const splitedUrl:    Array<string> = reqUrl.split("/").slice(2);
	const splitedParams: Array<string> = url.split("/:").slice(1);

	// tuples storage
	/**
	 * param: [index, value]
	 */
	let paramTuples: Array<[string, string]> | undefined = [];

	for (let i: number = 0; i < splitedParams.length; i++) {
		paramTuples.push([splitedParams[i], splitedUrl[i]]);
	}

	return paramTuples;
}

