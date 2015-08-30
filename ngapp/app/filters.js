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
                var match = text.match(/(^|\s|\()((http(s){0,}?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi);
            
                if(match && match.length && match.length > 0){
                    console.log(match[0]);
                    text = text.replace(match[0], '<a href="' + match[0].replace(/\(|\)/gi, '') + '" target="_blank">' + match[0].replace(/\(|\)/gi, '') + '</a>');
                }
                
                return text.replace(/#lb#/ig, '<br/>');
            }
            return "";
        };
    }])
    .filter('skipbeforenode', [function () {  
        return function (list, current) {
            var rList = [],
                len = current.split('-').length;
        
            for(var _i in list){
                var clen = list[_i].id.split('-').length;
                if(clen >= len){
                    rList.push(list[_i]);
                }
            }
            return rList;
        };
    }]);
