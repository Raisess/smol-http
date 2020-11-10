export default function parseUrlQuery(query: string): QueryTupleArray {
	const splitedQuerys: Array<string> = query.split("&");

	const queryTuples: QueryTupleArray = [];

	for (let splitedQuery of splitedQuerys) {
		const queryTuple: Array<string> = splitedQuery.split("=");

		queryTuples.push([queryTuple[0], queryTuple[1]]);
	}

	return queryTuples;
}

