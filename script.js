var vendorName;
var vendorId;

$(function() {
	if (isIos() && isRunningStandalone()) {
		/*
		 * Initialize Fast Click. Even with the latest webkit updates,
		 * unfortunatley iOS standalone apps still have the 350ms click delay,
		 * so we need to bring in fastclick to alleviate this. See
		 * https://stackoverflow.com/questions/39951945/ios-standalone-app-300ms-click-delay
		 */
		FastClick.attach(document.body);
	}

	vendorName = localStorage.getItem('vendor_name');
	//console.log(vendorName);
	if (vendorName == null) {
		vendorName = randomElement(prenoms);
		localStorage.setItem('vendor_name', vendorName);
	}
	vendorId = localStorage.getItem('vendor_id');
	//console.log(vendorId);
	if (vendorId == null) {
		vendorId = self.crypto.randomUUID();
		localStorage.setItem('vendor_id', vendorId);
	}
});

var randomElement = function(array) {
	return array[Math.floor(Math.random() * array.length)];
  };
  

isIos = function() {
	// Reference:
	// https://stackoverflow.com/questions/9038625/detect-if-device-is-ios#answer-9039885
	return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
};

isRunningStandalone = function() {
	// Bullet proof way to check if iOS standalone
	var isRunningiOSStandalone = window.navigator.standalone;

	// Reliable way (in newer browsers) to check if Android standalone.
	// https://stackoverflow.com/questions/21125337/how-to-detect-if-web-app-running-standalone-on-chrome-mobile#answer-34516083
	var isRunningAndroidStandalone = window
			.matchMedia('(display-mode: standalone)').matches;

	return isRunningiOSStandalone || isRunningAndroidStandalone;
};

barModel = {
	conso : {
		kroDemi : {
			prix : 3,
			nb : 0,
			name: "Demi Blonde",
			code: "KRO25"
		},
		kroPinte : {
			prix : 5.5,
			nb : 0,
			name: "Pinte Blonde",
			code: "KRO50"
		},
		kroCarafe : {
			prix : 16,
			nb : 0,
			name: "Carafe Blonde",
			code: "KRO150"
		},
		abnDemi : {
			prix : 4,
			nb : 0,
			name: "Demi Blanche / Ambré",
			code: "ABN25"
		},
		abnPinte : {
			prix : 7.5,
			nb : 0,
			name: "Pinte Blanche / Ambré",
			code: "ABN50"
		},
		abnCarafe : {
			prix : 22,
			nb : 0,
			name: "Carafe Blanche / Ambré",
			code: "ABN150"
		},
		kroSiropDemi : {
			prix : 3.5,
			nb : 0,
			name: "Demi Panaché / Twist / Monaco / Pêche",
			code: "PAN25"
		},
		kroSiropPinte : {
			prix : 6.5,
			nb : 0,
			name: "Pinte Panaché / Twist / Monaco / Pêche",
			code: "PAN50"
		},
		kroSiropCarafe : {
			prix : 19,
			nb : 0,
			name: "Carafe Panaché / Twist / Monaco / Pêche",
			code: "PAN150"
		},
		/*kroMateDemi : {
			prix : 3,
			nb : 0
		},
		kroMatePinte : {
			prix : 5,
			nb : 0
		},*/
		vin12 : {
			prix : 3,
			nb : 0,
			name: "12cl vin",
			code: "VIN25"
		},
		vin24 : {
			prix : 5.5,
			nb : 0,
			name: "24cl vin",
			code: "VIN24"
		},
		vin48 : {
			prix : 10.5,
			nb : 0,
			name: "48cl vin",
			code: "VIN48"
		},
		vinCarafe : {
			prix : 31,
			nb : 0,
			name: "Carafe vin",
			code: "VIN150"
		},
		softDemi : {
			prix : 1.5,
			nb : 0,
			name: "Demi Soft",
			code: "SOFT25"
		},
		softPinte : {
			prix : 2.5,
			nb : 0,
			name: "Pinte Soft",
			code: "SOFT50"
		},
		eau : {
			prix : 1,
			nb : 0,
			name: "Bouteille d'eau",
			code: "EAU"
		},
		consigneGobelet : {
			prix : .5,
			nb : 0,
			name: "Gobelet",
			code: "GOB"
		},
		consigneCarafe : {
			prix : 1,
			nb : 0,
			name: "Carafe",
			code: "CARAF"
		}
	},
	nbOptions : [ 0, 1, 2, 3, 4, 5, 6 ],
	montant : 0,
	recap: "",
	monnaieRendu : 0,
	monnaieDonnee : 0,
	addNumber : function(number) {
		var monnaieDonneeStr = this.monnaieDonnee.toString();
		if (number == '.') {
			if (monnaieDonneeStr.indexOf('.') == -1) {
				this.monnaieDonnee += '' + number;
			}
		} else {
			if (this.monnaieDonnee == 0) {
				this.monnaieDonnee = number;
			} else {
				if (monnaieDonneeStr.indexOf('.') > -1) {
					var numDecimal = monnaieDonneeStr.split('.')[1].length;
					if (numDecimal < 2) {
						this.monnaieDonnee += '' + number;
					}
				} else {
					this.monnaieDonnee += '' + number;
				}
			}
		}
	},
	resetMonnaie : function() {
		this.monnaieDonnee = 0;
	},
	removeLast : function() {
		var str = this.monnaieDonnee.toString();
		var pos = str.length - 1;
		if (pos == 0) {
			this.monnaieDonnee = 0;
		} else {
			this.monnaieDonnee = str.substring(0, pos);
		}
	},
	addConso : function(conso) {
		this.conso[conso].nb += 1;
	},
	setConso : function(conso, nb) {
		this.conso[conso].nb = nb;
	},
	calculMontant : function() {
		var somme = 0;
		var desc = "";
		for ( var conso in this.conso) {
			var soustot = this.conso[conso].prix * this.conso[conso].nb
			somme += soustot;
			if (this.conso[conso].nb > 0) {
				desc = desc.concat(this.conso[conso].nb, ' ', this.conso[conso].name, '\t', soustot, ' €\n');
			}
		}
		this.montant = somme;
		this.recap = desc;
	},
	calculRendu : function() {
		if (this.monnaieDonnee > 0 && this.montant > 0) {
			var solde = this.monnaieDonnee - this.montant;
			if (solde > 0) {
				this.monnaieRendu = solde;
			} else {
				this.monnaieRendu = 0;
			}
		} else {
			this.monnaieRendu = 0;
		}
	},
	reset : function() {
		envoiCommande(toGSheetDto());
		for ( var conso in this.conso) {
			this.conso[conso].nb = 0;
		}
		this.montant = 0;
		this.monnaieRendu = 0;
		this.monnaieDonnee = 0;
		this.recap = "";
	}
};

function toGSheetDto() {
	var dto = {};
	Object.entries(barModel.conso).forEach(([key, value]) => {
		//console.log(`${key} ${value.nb}`);
		dto[value.code] = value.nb;
	});
	dto['Nom'] = vendorName;
	dto['Id'] = vendorId;
	dto['Total'] = barModel.montant;
	return dto;
}

var app = angular.module('geBar', []);
app.controller('geBarController', function($scope) {

	$scope.bar = barModel;

	$scope.numberButtonClicked = function(number) {
		barModel.addNumber(number);
		barModel.calculRendu();
	};

	$scope.clear = function() {
		barModel.removeLast();
		barModel.calculRendu();
	}

	$scope.clearAll = function() {
		barModel.resetMonnaie();
		barModel.calculRendu();
	}

	$scope.add = function(conso) {
		barModel.addConso(conso);
		barModel.calculMontant();
		barModel.calculRendu();
	}

	$scope.set = function(conso, nb) {
		barModel.setConso(conso, nb);
		barModel.calculMontant();
		barModel.calculRendu();
	}

	$scope.newCmd = function() {
		barModel.reset();
	}
});