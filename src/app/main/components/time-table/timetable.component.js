import { TimeTableController } from 'main/components/time-table/timetable.controller';

export default angular.module('timeTable', [])
  .controller('TimeTableController', TimeTableController)
  .component('timeTable', {
    bindings: {
      extraValues: '=',
    },
    templateUrl: 'app/main/components/time-table/timetable.html',
    controller: TimeTableController,
    controllerAs: 'vm',
  });
