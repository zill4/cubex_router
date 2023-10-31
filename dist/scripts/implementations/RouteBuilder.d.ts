export default class RouteBuilder {
    parent: RouteBuilder;
    entries: Function[];
    constructor(parent?: RouteBuilder);
    static getRoutebuilder(target: any): any;
}
