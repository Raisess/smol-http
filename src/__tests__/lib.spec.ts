import SmolHttp from "../SmolHttp";

const server: SmolHttp = new SmolHttp(1939, undefined, true);

server.route({
	endpoint: "/",
	method:   "get",
	callback: (req: any) => console.log("ping pong!", req.query("b")),
	res: {
		statusCode: 201,
		json: {
			ping: "pong!"
		}
	}
});

server.route({
	endpoint: "/test",
	method:   "get",
	callback: () => null,
	res: {
		statusCode: 201,
		json: {
			hello: "world!"
		}
	}
});

