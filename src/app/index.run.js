export function runBlock($rootScope, authService, $state) {
  'ngInject';

  $rootScope.$on('$stateChangeStart', (e, to, params) => {
    if (!to.data.noLogin && !authService.getToken()) {
      e.preventDefault();
      $state.go('login');
    }

    // when we have already logged in but going on login page - redirect
    if ((to.name === 'login' || to.name === 'register') && !!authService.getToken()) {
      e.preventDefault();
      $state.go('index.dashboard');
    }

    // Redirect when redirectTo
    if (to.redirectTo) {
      e.preventDefault();
      $state.go(to.redirectTo, params);
    }
  });
}
