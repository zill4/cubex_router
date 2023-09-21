import { IRoute } from '../interfaces/IRoute';
import { IRouteDefinitionGroup } from '../interfaces/IRouteDefinitionGroup';
export default class RouteUtils {
    static getParameterNames(functionHandle: Function): RegExpMatchArray;
    static stringToRegex(definition: string): RegExp;
    static functionToRegex(prefix: string, enter: Function): RegExp;
    static build(definition: string | RegExp, enter: Function, exit?: (newHash: string) => void, thisArg?: any): IRoute;
    static buildFromFunction(prefix: string, enter: Function, exit?: (newHash: string) => void): IRoute;
    static buildDefinitionGroup(prefix: string, definitionGroup: IRouteDefinitionGroup, routes?: IRoute[]): IRoute[];
}
