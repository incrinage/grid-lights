export default {
    shiftColor: function (hexColor) {
        for (let i = 0; i < hexColor.length; i++) {
            const c = hexColor.charAt(i);
            if (c == '0' && c != '#') {
                return hexColor.substring(0, i) + 'f' + hexColor.substring(i + 1);
            }
        }
        return hexColor;
    },
    gradient: function (startColor, targetColor, weight) {
        //TODO: validate params? isColor, Make it so only colors from the color class are usable! weight should be 0->1

        let startRGB = hexToRGB(startColor);
        let targetRGB = hexToRGB(targetColor);
        
        let rgb = [];
        targetRGB.forEach((c,i)=> {
            let newColor = (targetRGB[i] - startRGB[i])*weight + startRGB[i];
            if(newColor > 255) newColor = 255; // boundaries
            if(newColor < 0) newColor = 0;
            if(Math.abs(startRGB[i]-targetRGB[i]) < 5 ) newColor = targetRGB[i];
            rgb.push(Math.floor(newColor).toString(16));
        })
        return "#" + rgb.reduce((prev,curr)=> prev + curr);
    },
    WHITE: "#ffffff"
}

function hexToRGB(color) {
    let r = parseInt(color.substring(1, 3), 16); //start at 1 to skip hash
    let g = parseInt(color.substring(3, 5), 16);
    let b = parseInt(color.substring(5, 7), 16);
    return [r, g, b];
}