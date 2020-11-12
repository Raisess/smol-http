export default function getReqParam(idx: string, param: ParamTupleArray): string | undefined {
	for (let tuple of param ? param : []) {
		if (idx === tuple[0]) return tuple[1];
	}

	return undefined;
}

