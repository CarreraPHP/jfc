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
     .filter('stripparent', [function () {  
        return function (id) {
            if(typeof id === "string"){
                var pos = id.lastIndexOf('-');            
                return (pos !== -1) ? id.substr(pos + 1) : id;
            }
            return id;
        };
    }])
    .filter('formattext', [function () {  
        return function (text) {
            if(text.length && text.length > 0){
                return text.replace(/#lb#/ig, '<br/>');
            }
            return "";
        };
    }]);
