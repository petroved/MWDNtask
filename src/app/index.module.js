import { routerConfig } from './index.routes';
import { config } from './index.config';
import { runBlock } from './index.run';

import { authInterceptor } from './main/services/auth.interceptor';
import { authService } from './main/services/auth.service';

import { MainController } from './main/layout/main.controller.js';

/* eslint-disable no-unused-vars */
// import { register } from 'main/qa-login/qaLogin.module';
import { login } from './main/login/login.module';
/* eslint-enable no-unused-vars */

const app = angular.module(
  'test', [
    'ui.router',
    // 'ui.bootstrap',
    'oc.lazyLoad',

    // features
    'edAdmin.login',
  ]);

app
  .constant('CONSTANTS', {
    BASE_PATH: '',
    API_PATH: '/api',
  })
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .factory('authService', authService)
  .factory('authInterceptor', authInterceptor)
  .controller('MainController', MainController);

export default app;
