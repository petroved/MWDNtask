export function routerConfig($stateProvider, $urlRouterProvider, $httpProvider) {
  'ngInject';

  $httpProvider.interceptors.push('authInterceptor');
  $urlRouterProvider.otherwise('/login');

  $stateProvider
    .state('login', {
      url: '/login',
      data: {
        noLogin: true,
        title: 'Login page',
      },
      templateUrl: 'src/app/main/login/login.html',
      controller: 'LoginController',
      controllerAs: 'vm',
    })
    .state('register', {
      url: '/register',
      data: {
        noLogin: true,
        title: 'Registration page',
      },
      // templateUrl: 'app/main/qa-login/qaLogin.html',
      // controller: 'QaLoginController',
      // controllerAs: 'vm',
    })
    .state('index', {
      url: '/',
      abstract: true,
      templateUrl: 'src/app/main/layout/content.html',
      controller: 'MainController',
      controllerAs: 'main',
    });
}
