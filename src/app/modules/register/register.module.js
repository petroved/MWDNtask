import { RegisterController } from './register.controller';
import { passwordVerify } from './register.passwordVerify.directive';

export default angular.module('register', [])
  .directive('passwordVerify', passwordVerify)
  .controller('RegisterController', RegisterController);
