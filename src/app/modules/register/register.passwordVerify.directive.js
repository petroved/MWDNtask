export function passwordVerify() {
  'ngInject';

  const directive = {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      passwordVerify: '=',
    },
    link: function linkFunc(scope, element, attrs, ctrl) {
      scope.$watch(() => {
        let combined;

        if (scope.passwordVerify || ctrl.$viewValue) {
          combined = `${scope.passwordVerify}_${ctrl.$viewValue}`;
        }

        return combined;
      }, (value) => {
        if (value) {
          ctrl.$parsers.unshift((viewValue) => {
            const origin = scope.passwordVerify;

            if (origin !== viewValue) {
              ctrl.$setValidity('passwordVerify', false);

              return undefined;
            }

            ctrl.$setValidity('passwordVerify', true);

            return viewValue;
          });
        }
      });
    },
  };

  return directive;
}
