import { IRouteCallback } from '../interfaces/IRouteCallback';
export default class RouteListener {
    callback: IRouteCallback;
    constructor(callback?: IRouteCallback);
    start(defer?: boolean): void;
    stop(): void;
    private handler;
    private getHash;
}
