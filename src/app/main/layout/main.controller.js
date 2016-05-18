export class MainController {
  constructor(authService, $state) {
    'ngInject';

    this.$state = $state;

    this.authService = authService;
  }

  logout() {
    this.authService.logout();
  }
}
