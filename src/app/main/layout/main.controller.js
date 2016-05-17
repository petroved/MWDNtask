export class MainController {
  constructor(authService, menusService, $state, moment, $timeout) {
    'ngInject';

    this.menuItems = [];
    this.sidebarHover = false;
    this.sidebarDelay = true;
    this.currentYear = moment().year();
    this.$state = $state;

    this.$timeout = $timeout;
    this.authService = authService;
    this.menusService = menusService;

    this.activate();
  }

  activate() {
    this.menuItems = this.menusService.get();
  }

  setSidebarHover() {
    this.sidebarDelay = false;
    this.sidebarHover = false;

    this.$timeout(() => {
      this.sidebarDelay = true;
    }, 800);
  }

  logout() {
    this.authService.logout();
  }
}
