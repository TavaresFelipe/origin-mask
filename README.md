
# origin-mask
Validation and formatter component based in angular directives/services.

### Suported:

| Data Format | Formatter | Validator | Filter |
|-------------|-----------|-----------|--------|
| CustomFormat| Yes       | No        | No     |
| BR CPF      | Yes       | Yes       | No     |
| BR RG       | Yes       | No        | No     |
| BR CNPJ     | Yes       | Yes       | No     |
| E-mail      | No        | Yes       | No     |
| Tel 8 ddd   | Yes       | No        | No     |
| Tel 9 ddd   | Yes       | No        | No     |
| Date        | Yes       | No        | No     |
| Real        | Yes       | No        | No     |
| Dolar       | Yes       | No        | No     |
| Euro        | Yes       | No        | No     |

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
If set a format that is not implemented, a custom format like a "4444-4444_44", then it will use to format.

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
