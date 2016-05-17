export class TimeTableController {
  constructor() {
    'ngInject';

    this.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    this.lessons = [
      { from: '07:50', to: '08:10' },
      { from: '08:10', to: '09:05' },
      { from: '09:05', to: '10:00' },
      { from: '00:30', to: '11:25' },
      { from: '11:25', to: '12:20' },
      { from: '12:50', to: '13:45' },
      { from: '13:45', to: '14:40' },
    ];

    this.events = [
      { day: 1,
        lesson: 4,
        title: 'Lorem ipsum dolor sit amet.',
        duration: 1,
        bgColor: '#bcbcf2',
        txtColor: 'black',
      }, {
        day: 2,
        lesson: 5,
        title: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
        duration: 2,
        bgColor: '#ffcc33',
        txtColor: 'gray',
      }, {
        day: 1,
        lesson: 7,
        title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, nostrum.',
        duration: 1,
        bgColor: '#cccc33',
        txtColor: 'gray',
      },
    ];

    this.eventsData = this.getTableData(this.days, this.lessons, this.events);
  }

  getTableData(days, lessons, events) {
    const tableData = [];

    days.forEach((day, dIndex) => {
      tableData[dIndex] = Array(this.lessons.length);
    });

    events.forEach((event) => {
      tableData[event.day - 1][event.lesson - 1] = event;

      if (event.duration > 1) {
        events.forEach((innerEvent) => {
          if (innerEvent.day === event.day &&
            (innerEvent.lesson - event.duration) === event.lesson) {
            innerEvent.lesson -= event.duration - 1;
          }
        });

        tableData[event.day - 1].splice(event.lesson, event.duration - 1);
      }
    });

    return tableData;
  }
}
