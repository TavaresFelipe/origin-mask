(function(){

	angular.module("ui.origin.formats").service("$Formatters", function(){
	    return {
	    	clean: function(value) {
	            return value.replace(/[^0-9]/g, "");
	        },

	        mask: function (value, mask){
	        	//implement
                // ###.##X.XXX-#
                // Where # represent visible numbers
                // in 4444444444 out 444.44X.XXX-4

                var output = "";
                for (var i = 0; i < value.length; i++) {
                    var valueChar = value.charAt(i);
                    var maskChar = mask.charAt(i);

                    if (maskChar === "#") {
                        output += valueChar;
                    } else {
                        output += maskChar;
                    }
                }

                return output;
            },
	        
	        formatCustom: function (value, size, format) {
	        	value = this.clean(value);
	        	value = this.trimSize(value, size);
	        	
	        	return this.format(value, format);
	        },
	        
	        format: function (value, format) {
	        	value = this.clean(value);

	        	var output = "";
	        	var valueCont = 0;
	        	var formatCont = 0;
	        	
	        	for (valueCont = 0; valueCont < value.length; valueCont++) {
	        		var formatChar = format.charAt(formatCont);
	        		var valChar = value.charAt(valueCont);
	        		
	        		if (isNaN(formatChar) || formatChar == " ") {
	        			formatCont++;
	        			
	        			var formatOn = true;
	        			var hasAccr = false;
	        			while (formatOn) {
	        				var formatChar2 = format.charAt(formatCont);
	        				if (isNaN(formatChar2) || formatChar2 == " ") {
	        					output += ((hasAccr) ? "" : formatChar) + formatChar2;
	        					
	        					hasAccr = true;
	    	        			formatCont++;
	        				} else {
	        					formatOn = false;
	        				}
	        			}
	        			
	        			if (hasAccr) {
	        				output += valChar;
	        			} else output += formatChar + valChar;
	        			
	        		} else {
	        			output += valChar;
	        		}
	        		
	        		formatCont++;
	        	}
	        	
	        	return output;
	        },
	        
	        trimSize: function (number, size) {
	        	//it will fix the error when the user holds number key, and the browser prints out 14 numbers.
	        	// it, turns in just 11 numbers again, because the maxlength is 14 WITH dots.
	        	if (number.length > size) {
	        		number = number.substring(0,size);
	        	}
	        	
	        	return number;
	        },
	        
	        email: function (number, size) {
	        	//this doesn't has a way to format
	        	return number;
	        },
	        
	        tel: function (number, size) {
	        	//(19) 7854-9584
	        	//or
	        	//(19) 9 7854-9584
	        	
	        	number = this.clean(number);
	        	number = this.trimSize(number, size);
	        	
	        	var ddd = number.substring(0,2);
	        	var tel = number.substring(2);
	        
	        	if (ddd.length > 1) {
	        		ddd = ddd.replace(/(\d{0})(\d)/,"$1($2") + ") ";
	        	}
	        	
	        	if (number.length == 11) {
	        		tel = tel.replace(/(\d{5})(\d)/,"$1-$2");
	        		tel = tel.replace(/(\d{1})(\d)/,"$1 $2");
	        	} else {
	        		tel = tel.replace(/(\d{4})(\d)/,"$1-$2");
	        	}
	        
	            return ddd+tel;
	        },
	        
	        real: function (number) {
	        	return this.brazilianPattern(number);
	        },

	        euro: function (number) {
	        	return this.americanPattern(number, "€");
	        },
	        
	        dolar: function (number) {
	        	return this.americanPattern(number, "$");
	        },
	        
	        putsZeros: function (number) {
	        	var intg = parseInt(number);

	        	//puts 0,0
	        	if (intg < 9) {
	        		return "00"+intg;
	        	} else if (intg < 99) {
	        		return "0"+intg;
	        	}
	        	
	        	if (number.substring(0,2) === "00") {
	        		return number.substring(2);
	        	}
	        	
	        	if (number.substring(0,1) === "0") {
	        		return number.substring(1);
	        	}
	        	
	        	return number;
	        },
	        
	        brazilianPattern: function (number) {
	        	//R$ 1.222,00
	        	
	        	//checks if it is negative
	        	var prefix = (number.substring(0,1) == "-") ? "R$ -" : "R$ ";
	        	
	        	number = this.clean(number);
	        	number = this.putsZeros(number);
	        	
	        	number = number.replace(/(\d{2})$/,",$1"); //Coloca a virgula
	        	number = number.replace(/(\d+)(\d{3},\d{2})$/g,"$1.$2"); //Coloca o primeiro ponto
	        	var qtdLoop = (number.length-3) / 3;
	        	var count = 0;
	        	while (qtdLoop > count) {
		        	number = number.replace(/(\d+)(\d{3}.*)/,"$1.$2"); //Coloca o resto dos pontos
		        	count++;
	        	}
	        	
	        	return prefix + number;
	        },
	        
	        americanPattern: function (number, simbol) {
	        	//R$ 1.222,00
	        	
	        	//checks if it is negative
	        	var prefix = (number.substring(0,1) == "-") ? simbol+" -" : simbol+" ";
	        	
	        	number = this.clean(number);
	        	number = this.putsZeros(number);
	        	
	        	number = number.replace(/(\d{2})$/,".$1"); //Coloca a virgula
	        	number = number.replace(/(\d+)(\d{3},\d{2})$/g,"$1,$2"); //Coloca o primeiro ponto
	        	var qtdLoop = (number.length-3) / 3;
	        	var count = 0;
	        	while (qtdLoop > count) {
		        	number = number.replace(/(\d+)(\d{3}.*)/,"$1,$2"); //Coloca o resto dos pontos
		        	count++;
	        	}
	        	
	        	return prefix + number;
	        }
	        
	    };
	                 
	});
	
})();
