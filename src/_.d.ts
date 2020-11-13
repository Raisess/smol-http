declare type ReqMethod = "get" | "post" | "put" | "delete" | "GET" | "POST" | "PUT" | "DELETE";

declare type QueryTupleArray = Array<[string, string]> | undefined;
declare type ParamTupleArray = QueryTupleArray;

declare type ReqCallback = (req: IReq) => IRes;

