angular.module('JFC.filters', [])
    .filter('formatphone', [function () {  
        return function (mdn) {
            if(mdn){
                var a = mdn.match(/(\d{3})(\d{3})(\d{4})/i);
                a.shift();
                return "(" + a[0] + ") " + a[1] + " - " + a[2];
            }
            return "";
        };
    }])    
     .filter('displayusername', [function () {  
        return function (uname) {
            if(uname){
                var a = uname.match(/^[\d]+$/);
                return a ? "Kevin Johnathan" : uname;
            }
            return "";
        };
    }]);
