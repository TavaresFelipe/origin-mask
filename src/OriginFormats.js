(function(){

	angular.module("ui.origin.formats", []);

	var sizes = [];
	sizes["rg"] = 9;
	sizes["cpf"] = 11;
	sizes["cnpj"] = 14;
	sizes["tel"] = 11;
	sizes["cep"] = 8;
	sizes["date"] = 8;
	sizes["email"] = null;

	var formats = [];
	formats["rg"] = "00.000.000-0";
	formats["cpf"] = "000.000.000.00";
	formats["cnpj"] = "00.000.000/0000-00";
	formats["cep"] = "00.000-00";
	formats["date"] = "00/00/0000";

	angular.module("ui.origin.formats").constant("sizes", sizes);

	angular.module("ui.origin.formats").directive("originFormat", ['$Formatters', '$Validators', '$parse', function($Formatters, $Validators, $parse){
		return {
			restrict:"A",
			require: '?ngModel',
			link: function(scope, elm, attrs, ctrl) {
				var patternFormat = attrs.originFormat;
				var patternMask = attrs.originMask;

				elm.bind("keyup", function(){
					var value = ctrl.$viewValue;
					var validateModel = attrs.validateModel;

					//validation callbacks
					var onValid = $parse(attrs.onValid);
					var onInvalid = $parse(attrs.onInvalid);

					//it fix the error when tab pressed, focus, blur - unknow error
					if (!value) return;

					if ($Validators[patternFormat]) {
						var isValid = $Validators[patternFormat](value, sizes[patternFormat]);
						scope.$apply(function(){
							if (validateModel) {
								scope[validateModel] = isValid;
							}

							if (onValid && isValid) {
								onValid(scope);
							}

							if (onInvalid && !isValid) {
								onInvalid(scope);
							}
						});
					}

					if (formats[patternFormat]) {
						value = $Formatters.formatCustom(value, sizes[patternFormat], formats[patternFormat]);
					} else if ($Formatters[patternFormat]) {
						value = $Formatters[patternFormat](value, sizes[patternFormat]);
					} else {
						value = $Formatters.formatCustom(value, sizes[patternFormat], patternFormat);
					}

					// if originMask is set
					if (patternMask) {
						value = $Formatters.mask(value, patternMask);
					}

					ctrl.$setViewValue(value);
					ctrl.$render();
				});
			}
		};
	}]);
})();
