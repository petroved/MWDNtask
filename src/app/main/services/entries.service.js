export class entriesService {
  constructor($window, currentEntryService) {
    'ngInject';

    this.entries = angular.fromJson($window.localStorage.getItem('entries')) || [];

    this.currentEntryService = currentEntryService;
    this.$window = $window;
  }

  get() {
    return this.entries;
  }

  getEntries(page) {
    const perPage = 5;
    const tmpArr = angular.copy(this.entries);
    const start = (page - 1) * perPage;

    for(let i = this.entries.length; i--;) {
      tmpArr[i].id = i + 1;
    }

    tmpArr.splice(_.findIndex(tmpArr, this.currentEntryService.get()), 1)

    return Promise.resolve({
      totalEntries: tmpArr.length,
      entries: tmpArr.slice(start, start + perPage),
    });
  }

  getEntriesById(id) {
    return Promise.resolve(this.entries[id - 1]);
  }

  updateEntry(id, newEntry) {
    this.entries.splice(id - 1, 1, newEntry);
    this.$window.localStorage.setItem('entries', angular.toJson(this.entries));

    return Promise.resolve();
  }

  addEntry(newEntry) {
    this.entries.push(newEntry);
    this.$window.localStorage.setItem('entries', angular.toJson(this.entries));

    return Promise.resolve();
  }

  deleteEntry(index) {
    this.entries.splice(index, 1);
    this.$window.localStorage.setItem('entries', angular.toJson(this.entries));

    return Promise.resolve();
  }
}
