export function authInterceptor($injector, $location, CONSTANTS, $q) {
  'ngInject';

  const interceptor = {
    request,
    response,
    responseError,
  };

  return interceptor;

  /* eslint-disable dot-notation */
  function request(config) {
    const authService = $injector.get('authService');

    if (config.url.substr(config.url.length - 5) === '.html') {
      return config;
    }
    const token = authService.getToken();

    if (token) {
      config.headers['Authorization'] = token;
    }

    return config;
  }
  /* eslint-enable dot-notation */

  function response(res) {
    // if we have error form our API show notify with error
    if (res.config.url.indexOf(CONSTANTS.API_PATH) === 0 && res.data.status === 'error') {
      // if we on login state don't show notify
      if ($injector.get('$state').current.name === 'login') {
        return res;
      }
      const $translate = $injector.get('$translate');
      const toastr = $injector.get('toastr');

      $translate(res.data.message).then((message) => {
        toastr.error(message);
      });
    }

    return res;
  }

  function responseError(res) {
    const authService = $injector.get('authService');
    const $translate = $injector.get('$translate');
    const toastr = $injector.get('toastr');

    if (res.status === 500) {
      $translate('NOTIFY.INTERNAL_SERVER_ERROR').then((message) => {
        toastr.error(message);
      });
    }

    if ($injector.get('$state').current.name !== 'login' && res.status === 401) {
      authService.logout();
      $translate('NOTIFY.AUTHORIZATION_ERROR').then((message) => {
        toastr.error(message);
      });
      $location.path(`${CONSTANTS.BASE_PATH}/`);
    }

    return $q.reject(res);
  }
}
