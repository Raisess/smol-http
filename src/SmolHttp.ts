import http, { Server, IncomingMessage, ServerResponse } from "http";

import debugLog from "./utils/debugLog";

import parseUrlQuery from "./modules/parseUrlQuery";
import getReqQuery from "./modules/getReqQuery";
import getReqBody from "./modules/getReqBody";

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
	
		for (let i: number = 0; i < this.routes.length; i++) {
			if (url === this.routes[i].endpoint && req.method === this.routes[i].method.toUpperCase()) {
				const route: IRoute = this.routes[i];

				getReqBody(req, (body: any) => {
					// request data
					const reqSearch: IReq = {
						query: (idx: string): string | undefined => getReqQuery(idx, query),
						param: undefined,
						body:  body
					};

					// execute response callback
					const routeRes: IRes = route.res(reqSearch);

					if (this.debug) debugLog([`REQUEST [${new Date().toLocaleString()}]:`, route.method.toUpperCase(), routeRes.statusCode, `http://${this.host}:${this.port}${req.url}`]);

					res.writeHead(routeRes.statusCode, { "Content-Type": "application/json" });
					res.write(JSON.stringify(routeRes.json));

					res.end();
					return;
				});
			}

			setTimeout(() => {
				if (i === this.routes.length - 1) {
					res.end(`Invalid route: ${req.method} 404 ${url}`);
					return;
				}
			}, 50);
		}
		
		return;
	});

	private start(): void {
		this.server.listen(this.port, this.host, (): void => console.log("running on port:", this.port));
	}

	public route(route: IRoute): void {
		this.routes.push(route);
	}
}

