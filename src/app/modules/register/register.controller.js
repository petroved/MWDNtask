export class RegisterController {
  constructor(authService, $timeout) {
    'ngInject';

    this.RegisterForm = {};
    this.message = false;
    this.userData = {
      email: '',
      name: '',
      password: '',
      dateOfBirth: ''
    };
    this.rePassword = '';
    this.submitted = false;

    this.authService = authService;
    this.$timeout = $timeout;

    this.activate();
  }

  activate() {
  }

  register() {
    this.message = false;

    if (this.RegisterForm.$invalid) {
      this.submitted = true;

      return false;
    }

    this.authService.register(this.userData)
      .then((response) => {
        this.userData = {
          email: '',
          name: '',
          password: '',
          dateOfBirth: '',
        };
        this.rePassword = '';

        this.$timeout(() => {
          this.message = response.message;
        });
      }, (response) => {
        this.$timeout(() => {
          this.message = response.message;
        });
      });

    return false;
  }
}
