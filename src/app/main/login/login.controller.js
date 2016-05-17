export class LoginController {
  constructor(authService) {
    'ngInject';

    this.LoginForm = {};
    this.message = false;
    this.userData = {
      username: '',
      password: '',
    };
    this.submitted = false;

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

    this.authService.login(this.userData)
      .then(() => {}, (response) => {
        if (response.data.message) {
        }
      });

    return false;
  }
}
