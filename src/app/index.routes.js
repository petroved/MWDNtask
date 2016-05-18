export function routerConfig($stateProvider, $urlRouterProvider, $httpProvider) {
  'ngInject';

  $urlRouterProvider.otherwise('/login');

  $stateProvider
    .state('login', {
      url: '/login',
      data: {
        noLogin: true,
      },
      // templateProvider: ($q) => {
      //   return $q((resolve) => {
      //     // lazy load the view
      //     require.ensure([], () => resolve(require('./modules/login/login.html')), 'login');
      //   });
      // },
      templateUrl: 'src/app/modules/login/login.html',
      controller: 'LoginController as vm',
      resolve: {
        loadEnquiryController: ($q, $ocLazyLoad) =>
          $q((resolve) => {
            require.ensure([], () => {
              // load whole module
              const module = require('./modules/login/login.module');
              $ocLazyLoad.load({ name: module.name });
              resolve(module.controller);
            }, 'login');
          })
      },
    })
    .state('register', {
      url: '/register',
      data: {
        noLogin: true,
      },
      // templateProvider: ($q) => {
      //   return $q((resolve) => {
      //     // lazy load the view
      //     require.ensure([], () => resolve(require('./modules/register/register.html')), 'register');
      //   });
      // },
      templateUrl: 'src/app/modules/register/register.html',
      controller: 'RegisterController as vm',
      resolve: {
        loadEnquiryController: ($q, $ocLazyLoad) =>
          $q((resolve) => {
            require.ensure([], () => {
              // load whole module
              const module = require('./modules/register/register.module');
              $ocLazyLoad.load({ name: module.name });
              resolve(module.controller);
            }, 'register');
          })
      },
    })
    .state('index', {
      url: '',
      abstract: true,
      templateUrl: 'src/app/main/layout/content.html',
      controller: 'MainController as main',
    })
    .state('index.all', {
      url: '/all/{page:int}',
      templateUrl: 'src/app/modules/entries/entries.html',
      controller: 'EntriesController as vm',
      resolve: {
        page: ($stateParams) =>
          $stateParams.page,
        loadEnquiryController: ($q, $ocLazyLoad) =>
          $q((resolve) => {
            require.ensure([], () => {
              // load whole module
              const module = require('./modules/entries/entries.module');
              $ocLazyLoad.load([
                { name: module.name },
              ]);
              resolve(module.controller);
            }, 'entries');
          }),
      },
    });
}
