import { routerConfig } from './index.routes';
import { runBlock } from './index.run';

import { authService } from './main/services/auth.service';
import { entriesService } from './main/services/entries.service';
import { currentEntryService } from './main/services/currentEntry.service';

import { MainController } from './main/layout/main.controller.js';

import './index.scss';

const app = angular.module(
  'MWDNtask', [
    'ui.router',
    'ui.bootstrap',
    'oc.lazyLoad',
    'angularUtils.directives.dirPagination',
    'angularMoment',
  ]);

app
  .config(routerConfig)
  .run(runBlock)
  .service('authService', authService)
  .service('entriesService', entriesService)
  .service('currentEntryService', currentEntryService)
  .controller('MainController', MainController);

export default app;
