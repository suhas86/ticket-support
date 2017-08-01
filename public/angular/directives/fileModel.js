angular.module('fileModelDirective', [])
    .directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var parseFile = $parse(attrs.fileModel);
                var parseFileSetter = parseFile.assign;

                element.bind('change', function () {
                    scope.$apply(function () {
                        parseFileSetter(scope, element[0].files[0]);
                    })
                });
            }
        }
    }]);
