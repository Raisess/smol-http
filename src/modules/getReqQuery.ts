export default function getReqQuery(idx: string, query: QueryTupleArray): string | undefined {
	for (let tuple of query ? query : []) {
		if (idx === tuple[0]) return tuple[1];
	}

	return undefined;
}

