export class RegisterController {
  constructor(authService, $timeout) {
    'ngInject';

    this.RegisterForm = {};
    this.userData = {
      email: '',
      name: '',
      password: '',
      dateOfBirth: '',
    };
    this.rePassword = '';
    this.dateOptions = {
      dateDisabled: true,
      startingDay: 1,
    };
    this.datepickerOpened = false;

    this.successMessage = false;
    this.errorMessage = false;
    this.submitted = false;

    this.authService = authService;
    this.$timeout = $timeout;
  }

  openDatepicker() {
    this.datepickerOpened = true;
  }

  register() {
    this.successMessage = false;
    this.errorMessage = false;

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
        this.submitted = false;

        this.$timeout(() => {
          this.successMessage = response.message;
        });
      }, (response) => {
        this.$timeout(() => {
          this.errorMessage = response.message;
        });
      });

    return false;
  }
}
