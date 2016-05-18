export class authService {
  constructor($window, entriesService, currentEntryService) {
    'ngInject';

    this.authentication = angular.fromJson($window.localStorage.getItem('authentication')) || false;

    this.entriesService = entriesService;
    this.currentEntryService = currentEntryService;
    this.$window = $window;
  }

  isAuthenticate() {
    return this.authentication;
  }

  login(userData) {
    const currentUser = _.find(this.entriesService.get(), {email: userData.email, password: userData.password})
    if (!currentUser) {
      return Promise.reject({message: 'Wrong email or password'});
    }

    this.authentication = true;
    this.$window.localStorage.setItem('authentication', 'true');
    this.currentEntryService.set(currentUser);

    // redirect to same /login page and actual redirection would be in .run function
    this.$window.location = '/';

    return Promise.resolve();
  }

  logout() {
    this.authentication = false;
    this.$window.localStorage.setItem('authentication', 'false');
    this.currentEntryService.delete();
    this.$window.location = '/';
  }

  register(userData) {
    if (_.find(this.entriesService.get(), {email: userData.email})) {
      return Promise.reject({message: 'User with this email already exist'});
    }

    this.entriesService.addEntry(userData);

    return Promise.resolve({message: 'User created succesfully'});
  }
}
