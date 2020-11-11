import { IncomingMessage } from "http";

export default function getReqBody(req: IncomingMessage, callback: Function): void {
	let body: any = "";

	req.on("data", (chunk: Buffer): void => {
		if (chunk.length > 1e6) req.connection.destroy();

		body = chunk.toString();

		return callback(JSON.parse(body));
	});

	return;
}

