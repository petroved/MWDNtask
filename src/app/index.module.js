import { routerConfig } from './index.routes';
import { config } from './index.config';
import { runBlock } from './index.run';

import { authService } from './main/services/auth.service';
import { entriesService } from './main/services/entries.service';
import { currentEntryService } from './main/services/currentEntry.service';

import { MainController } from './main/layout/main.controller.js';

import './index.scss';

/* eslint-disable no-unused-vars */
// import { register } from 'main/qa-login/qaLogin.module';
/* eslint-enable no-unused-vars */

const app = angular.module(
  'test', [
    'ui.router',
    'ui.bootstrap',
    'oc.lazyLoad',
    'angularUtils.directives.dirPagination',
  ]);

app
  .constant('CONSTANTS', {
    BASE_PATH: '',
    API_PATH: '/api',
  })
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .service('authService', authService)
  .service('entriesService', entriesService)
  .service('currentEntryService', currentEntryService)
  .controller('MainController', MainController);

export default app;
