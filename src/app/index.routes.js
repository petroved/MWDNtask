export function routerConfig($stateProvider, $urlRouterProvider) {
  'ngInject';

  $urlRouterProvider.otherwise('/login');

  $stateProvider
    .state('login', {
      url: '/login',
      data: {
        noLogin: true,
      },
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
          }),
      },
    })
    .state('register', {
      url: '/register',
      data: {
        noLogin: true,
      },
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
          }),
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
        loadEntriesController: ($q, $ocLazyLoad) =>
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
    })
    .state('index.edit', {
      url: '/{entryId:int}',
      templateUrl: 'src/app/modules/editEntry/editEntry.html',
      controller: 'EditEntryController as vm',
      resolve: {
        entryId: ($stateParams) =>
          $stateParams.entryId,
        loadEditEntryController: ($q, $ocLazyLoad) =>
          $q((resolve) => {
            require.ensure([], () => {
              // load whole module
              const module = require('./modules/editEntry/editEntry.module');
              $ocLazyLoad.load([
                { name: module.name },
              ]);
              resolve(module.controller);
            }, 'editEntry');
          }),
      },
    })
    .state('index.create', {
      url: '/create',
      templateUrl: 'src/app/modules/createEntry/createEntry.html',
      controller: 'CreateEntryController as vm',
      resolve: {
        loadCreateEntryController: ($q, $ocLazyLoad) =>
          $q((resolve) => {
            require.ensure([], () => {
              // load whole module
              const module = require('./modules/createEntry/createEntry.module');
              $ocLazyLoad.load([
                { name: module.name },
              ]);
              resolve(module.controller);
            }, 'createEntry');
          }),
      },
    });
}
