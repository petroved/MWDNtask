export class LoginController {
  constructor($timeout, authService) {
    'ngInject';

    this.LoginForm = {};
    this.message = false;
    this.userData = {
      email: '',
      password: '',
    };
    this.submitted = false;

    this.$timeout = $timeout;
    this.authService = authService;

    this.activate();
  }

  activate() {
  }

  login() {
    this.message = false;

    if (this.LoginForm.$invalid) {
      this.submitted = true;

      return false;
    }

    return this.authService.login(this.userData)
      .then(() => {}, (response) => {
        this.$timeout(() => {
          this.message = response.message;
        });
      });
  }
}
