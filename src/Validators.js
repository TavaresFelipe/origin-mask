(function(){

	angular.module("ui.origin.formats").service("$Validators", ["$Formatters", function($Formatters){
	return {
		
		 	//this cut off the most common invalid
			commonValid: function (value, size) {
				if (value.length != size) {		
					return false;
				}
				
				for (var j = 0; j < 9; j++) {
					var pattern = "";
	    			for (var i = 0; i < size; i ++) {
	    				pattern += j;
	        		}
	    			
	    			if (value == pattern) {
	    				return true;
	    			}
	    		}
	    	},
	    
	        cpf: function(documentNumber, size) {
	    	  
	        	documentNumber = $Formatters.clean(documentNumber);
	        	
	    	    if (this.commonValid(documentNumber, size)) {
	    	        return false;
	    	    }
	    	    
	    	    var cpf = [];
	    	    var resultP = 0;
	    	    var resultS = 0;
	
	    	    for (var i = 0; i < documentNumber.length; i++) {
	    	        cpf[i] = parseInt(documentNumber.substring(i, i + 1));
	    	    }
	    	    for (var i = 0; i < 9; i++) {
	    	        resultP += cpf[i] * (i + 1);
	    	    }
	    	    var divP = resultP % 11;
	    	    divP = divP > 9 ? 0 : divP;
	
	    	    if (divP != cpf[9]) {
	    	        return false;
	    	    } else {
	    	        for (var i = 0; i < 10; i++) {
	    	            resultS += cpf[i] * (i);
	    	        }
	    	        var divS = resultS % 11;
	    	        divS = divS > 9 ? 0 : divS;
	
	    	        if (divS != cpf[10]) {
	    	            return false;
	    	        }
	    	    }
	    	    return true;
	    	},
	    	
	    	cnpj: function(cnpj, size) {
	    		
	    		cnpj = $Formatters.clean(cnpj);
	    	  
	    	    if (this.commonValid(cnpj, size)) {
	    	        return false;
	    	    }
	    	    
	    	    tamanho = cnpj.length - 2;
	    	    numeros = cnpj.substring(0,tamanho);
	    	    digitos = cnpj.substring(tamanho);
	    	    soma = 0;
	    	    pos = tamanho - 7;
	    	    for (var i = tamanho; i >= 1; i--) {
	    	      soma += numeros.charAt(tamanho - i) * pos--;
	    	      if (pos < 2)
	    	            pos = 9;
	    	    }
	    	    
	    	    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
	    	    if (resultado != digitos.charAt(0))
	    	        return false;
	    	         
	    	    tamanho = tamanho + 1;
	    	    numeros = cnpj.substring(0,tamanho);
	    	    soma = 0;
	    	    pos = tamanho - 7;
	    	    
	    	    for (var i = tamanho; i >= 1; i--) {
	    	      soma += numeros.charAt(tamanho - i) * pos--;
	    	      if (pos < 2)
	    	            pos = 9;
	    	    }
	    	  	
	    	    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
	    	    if (resultado != digitos.charAt(1))
	    	          return false;
	    	           
	    	    return true;
	    	},

	     	email: function (email){
				    var exclude=/[^@\-\.\w]|^[_@\.\-]|[\._\-]{2}|[@\.]{2}|(@)[^@]*\1/;
				    var check=/@[\w\-]+\./;
				    var checkend=/\.[a-zA-Z]{2,3}$/;
				    
				    if(((email.search(exclude) != -1) 
				    		|| (email.search(check)) == -1) 
				    		|| (email.search(checkend) == -1)){
				    	
				    	return false;
				    } else return true;
			}
	    	
	    };    
	}]);
	
})();
