import { IRoute } from '../interfaces/IRoute';
import { IRouteGroup } from '../interfaces/IRouteGroup';
import RouteListener from './RouteListener';
export default class Router {
    routeListener: RouteListener;
    defaultRoute: IRoute;
    errorRoute: IRoute;
    routes: IRoute[];
    routeHash: {
        [index: string]: IRoute;
    };
    currentRoute: IRoute;
    previousRoute: IRoute;
    changedRouteGroup: boolean;
    beforeMatch: (hash: string, previousRoute: IRoute) => string | false;
    beforeChange: (hash: string, currentRoute: IRoute, previousRoute: IRoute) => void;
    afterChange: (hash: string, currentRoute: IRoute, previousRoute: IRoute) => void;
    constructor();
    addRoute(route: IRoute): IRoute;
    addRegex(definition: string | RegExp, enter: Function, exit?: (newHash: string) => void): IRoute;
    addFunction(prefix: string, enter: Function, exit?: (newHash: string) => void): IRoute;
    addFunctionGroup(prefix: string, enterFunctions: Function[], exit?: (newHash: string) => void): IRouteGroup;
    removeRoute(route: IRoute): IRoute[];
    setDefaultRoute(enter: Function, exit?: (newHash: string) => void): void;
    setErrorRoute(enter: Function, exit?: (newHash: string) => void): void;
    setBeforeMatch(beforeMatch: (hash: string, previousRoute: IRoute) => string | false): void;
    setBeforeChange(beforeChange: (hash: string, currentRoute: IRoute, previousRoute: IRoute) => void): void;
    setAfterChange(afterChange: (hash: string, currentRoute: IRoute, previousRoute: IRoute) => void): void;
    start(defer?: boolean): void;
    stop(): void;
    static goToRoute(...args: string[]): void;
    static goToPage(href: string): void;
}
