import SmolHttp, { Req, Res } from "../SmolHttp";

const server: SmolHttp = new SmolHttp(1939, "*", undefined, true);

server.get("/exp", (req: Req): Res => {
	return {
		statusCode: 200,
		json: {
			query: req.query("test")
		}
	};
});

server.post("/test_post", (req: Req): Res => {
	return {
		statusCode: 201,
		json: {
			log:  "hey is a post request",
			body: req.body
		}
	};
});

