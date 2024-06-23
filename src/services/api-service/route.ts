import routeManager from './routeManager';

const routes = routeManager.setPrefix('');

routes.addRoute('campaigns-data', {
  method: 'get',
  uri: '/api/popups',
});

routes.addRoute(`single-campaign`, {
  method: 'get',
  uri: '/api/popups/:popId:',
});

routes.addRoute(`status-toggle`, {
  method: 'put',
  uri: '/api/popups/:popId:/status-toggle',
});

routes.addRoute(`update-campaign`, {
  method: 'put',
  uri: '/api/popups/:popId:',
});

routes.addRoute('user-info', {
  method: 'get',
  uri: '/posts',
});

export default routes;
