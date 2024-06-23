class RouteManager {
  routes = {};
  prefix = '';
  setPrefix(prefix) {
    this.prefix = prefix;
    return this;
  }

  addRoute(name, properties) {
    properties.uri = this.prefix + properties.uri;
    this.routes[name] = properties;

    return this;
  }

  getRoute(name) {
    if (!this.routes[name]) {
      return null;
    }

    return this.routes[name];
  }

  getRoutes() {
    return this.routes;
  }
}

const routeManager = new RouteManager();
export default routeManager;
