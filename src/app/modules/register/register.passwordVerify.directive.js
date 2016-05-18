export function passwordVerify() {
  'ngInject';

  const directive = {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      passwordVerify: '=',
    },
    link: linkFunc,
  };

  return directive;

  function linkFunc(scope, element, attrs, ctrl) {
    scope.$watch(function() {
      let combined;

      if (scope.passwordVerify || ctrl.$viewValue) {
         combined = scope.passwordVerify + '_' + ctrl.$viewValue;
      }

      return combined;
    }, function(value) {
      if (value) {
        ctrl.$parsers.unshift(function(viewValue) {
          const origin = scope.passwordVerify;

          if (origin !== viewValue) {
            ctrl.$setValidity("passwordVerify", false);

            return undefined;
          } else {
            ctrl.$setValidity("passwordVerify", true);

            return viewValue;
          }
        });
      }
    });
  }
}
