export class CreateEntryController {
  constructor(entriesService, $timeout) {
    'ngInject';

    this.CreateEntryForm = {};
    this.entry = {
      email: '',
      name: '',
      dateOfBirth: '',
    };
    this.successMessage = false;
    this.errorMessage = false;
    this.datepickerOpened = false;
    this.submitted = false;

    this.entriesService = entriesService;
    this.$timeout = $timeout;
  }

  openDatepicker() {
    this.datepickerOpened = true;
  }

  create() {
    this.successMessage = false;
    this.errorMessage = false;

    if (this.CreateEntryForm.$invalid) {
      this.submitted = true;

      return false;
    }

    return this.entriesService.createEntry(this.entry)
      .then((response) => {
        this.$timeout(() => {
          this.entry = {
            email: '',
            name: '',
            dateOfBirth: '',
          };
          this.submitted = false;
          this.successMessage = response.message;
        });
      }, (response) => {
        this.$timeout(() => {
          this.errorMessage = response.message;
        });
      });
  }

}
