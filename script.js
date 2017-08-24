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
});

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
			nb : 0
		},
		kroPinte : {
			prix : 5,
			nb : 0
		},
		kroPichet : {
			prix : 14,
			nb : 0
		},
		grimDemi : {
			prix : 4,
			nb : 0
		},
		grimPinte : {
			prix : 7,
			nb : 0
		},
		grimPichet : {
			prix : 20,
			nb : 0
		},
		kroSiropDemi : {
			prix : 3.5,
			nb : 0
		},
		kroSiropPinte : {
			prix : 6,
			nb : 0
		},
		kroSiropPichet : {
			prix : 17,
			nb : 0
		},
		kroMateDemi : {
			prix : 3,
			nb : 0
		},
		kroMatePinte : {
			prix : 5,
			nb : 0
		},
		vin12 : {
			prix : 2.5,
			nb : 0
		},
		vin24 : {
			prix : 4.5,
			nb : 0
		},
		vin48 : {
			prix : 8,
			nb : 0
		},
		vinPichet : {
			prix : 24,
			nb : 0
		},
		softDemi : {
			prix : 1.5,
			nb : 0
		},
		softPinte : {
			prix : 2.5,
			nb : 0
		},
		eau : {
			prix : 1,
			nb : 0
		},
		consigneGobelet : {
			prix : 1,
			nb : 0
		},
		consignePichet : {
			prix : 2,
			nb : 0
		}
	},
	nbOptions : [0, 1, 2, 3, 4, 5, 6],
	montant : 0,
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
		for ( var conso in this.conso) {
			somme += this.conso[conso].prix * this.conso[conso].nb;
		}
		this.montant = somme;
	},
	calculRendu : function() {
		if (this.monnaieDonnee > 0 && this.montant > 0) {			
			this.monnaieRendu = this.monnaieDonnee - this.montant;
		}
	}
};

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
	}
});