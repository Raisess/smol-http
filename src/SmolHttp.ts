import http, { Server, IncomingMessage, ServerResponse } from "http";

import debugLog from "./utils/debugLog";

import parseUrlQuery from "./modules/parseUrlQuery";

import { IRoute } from "./interfaces/IRoute";
import { IReq } from "./interfaces/IReq";
import { IRes } from "./interfaces/IRes";

export type Route = IRoute;
export type Req   = IReq;
export type Res   = IRes;

export default class SmolHttp {
	private host:  string  = "127.0.0.1";
	private port:  number  = 0;
	private debug: boolean = false;

	private routes: Array<IRoute> = [];

	constructor(port: number | string = 8080, host?: string, debug?: boolean) {
		this.port  = typeof port == "string" ? parseInt(port) : port;
		this.host  = host ? host : this.host;
		this.debug = debug ? debug : this.debug;

		this.start();
	}

	private server: Server = http.createServer((req: IncomingMessage, res: ServerResponse): void => {
		const url: string = req.url ? req.url.split("?")[0] : "/";
		// check if have query data
		const haveQuery: boolean = req.url?.split("?")[1] ? true : false;
		// parse query data
		const query: QueryTupleArray = haveQuery ? parseUrlQuery(req.url ? req.url.split("?")[1] : "") : undefined;
	
		for (let route of this.routes) {
			if (url === route.endpoint) {
				// request data
				const reqSearch: IReq = {
					query: (idx: string): string | undefined => {
						for (let tuple of query ? query : []) {
							if (idx === tuple[0]) return tuple[1];
						}
					},
					param: undefined,
					body:  {}
				};

				// execute response callback
				const routeRes: IRes = route.res(reqSearch);

				if (this.debug) debugLog([`REQUEST [${new Date().toLocaleString()}]:`, route.method.toUpperCase(), routeRes.statusCode, `http://${this.host}:${this.port}${req.url}`]);

				res.writeHead(routeRes.statusCode, { "Content-Type": "application/json" });
				res.write(JSON.stringify(routeRes.json));

				res.end();
				return;
			}
		}
		
		res.end(`Invalid route ${url}`);
		return;
	});

	private start(): void {
		this.server.listen(this.port, this.host, (): void => console.log("running on port:", this.port));
	}

	public route(route: IRoute): void {
		this.routes.push(route);
	}
}

