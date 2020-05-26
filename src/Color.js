export default {
    shiftColor: function(hexColor){
       for(let i = 0; i < hexColor.length; i++){
           const c = hexColor.charAt(i);
           if(c == '0' && c != '#'){
               return hexColor.substring(0,i) + 'f' + hexColor.substring(i+1);
           }
       }
       return hexColor;
    },
    WHITE: "#ffffff"
} 