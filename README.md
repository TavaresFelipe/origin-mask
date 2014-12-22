
# origin-mask
Validation and formatter component based in angular directives/filters/services.

## Features

$Formatters - Provides needed methods for formatting data with default format or custom format.

$Validators - Provides methods with validation algorithms.

Filters - originFilter - Does models formatting.

Input directive - originFormat - Does validation and formatting on user input.

### Suported:

| Data Format | Formatter | Validator | Filter |
|-------------|-----------|-----------|--------|
| CustomFormat| Yes       | No        | Yes     |
| BR CPF      | Yes       | Yes       | Yes     |
| BR RG       | Yes       | No        | Yes     |
| BR CNPJ     | Yes       | Yes       | Yes     |
| Tel 8 ddd   | Yes       | No        | Yes     |
| Tel 9 ddd   | Yes       | No        | Yes     |
| Date        | Yes       | No        | Yes     |
| Real        | Yes       | No        | Yes     |
| Dolar       | Yes       | No        | Yes     |
| Euro        | Yes       | No        | Yes     |
| E-mail      | No        | Yes       | No      |

### Usage:

```html
<div class="login-area" ng-controller="LoginController">
    <label class="{{ isValidCpf ? 'ok' : 'nok' }}">
       CPF: <input 
       
       origin-format="cpf" 
       type="tel" 
       ng-model="username"  
       validate-model="isValidCpf" 
       on-valid="onValid();"
       on-invalid="onInvalid();" 
       
       />
    </label>

    <label ng-show="isValidCpf">
        SENHA: <input  type="tel" ng-model="password"/>
    </label>
    </div>
```
### origin-format="cpf"
Declare the format and validation, if it available. 
If set a format that is not implemented, a custom format like a "4444-4444_44", then it will be use to format.

### validate-model="isValidaCpf"
A model in controller scope, that will be updated when validation ends

It uses $scope.$eval(); to evaluate the model within scope

### on-valid="function()"
A callback function that will be called when validation return true

It uses $parser(func)(scope); to evaluate the func within scope

Still not possible to set arguments in the function

### on-invalid="function()"
A callback function that will be called when validation return false

It uses $parser(func)(scope); to evaluate the func within scope

Still not possible to set arguments in the function

### Filter
Using origin filters to format data as input do. 

The < pattern > argument is equal to format pattern as 'cpf', 'cnpj', 'tel'... etc

```html

{{cpfModel | originFilter:'< pattern >'}}

```

### $Formatters

```js

if ($Formatters["cpf"]) {
$Formatters.cpf(value, 11);

or 

$Formatters["cpf"](value, 11);

}

$Formatters.formatCustom(value, size, pattern);

```

### $Validators

```js

if ($Validators["cpf"]) {
    var isValid = $Validators["cpf"](value, 11);
    
    or 
    
    var isValid = $Validators.cpf(value, 11);
}

```
