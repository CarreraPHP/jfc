angular.module('JFC.services', [])
	.factory('Auth', ["$cookies", "$localStorage","$sessionStorage", AUTHProvider]);
