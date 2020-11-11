import SmolHttp, { Req } from "../SmolHttp";

const server: SmolHttp = new SmolHttp(1939, undefined, true);

server.route({
	endpoint: "/",
	method:   "get",
	res: () => {
		return {
			statusCode: 201,
			json: {
				ping: "pong!"
			}
		}
	}
});

server.route({
	endpoint: "/hi",
	method:   "GET",
	res: (req: Req) => {
		return {
			statusCode: 200,
			json: {
				testing: "json",
				query: req.query("query"),
				date: new Date().toLocaleString()
			}
		}
	}
});

