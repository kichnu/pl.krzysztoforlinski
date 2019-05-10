const drawArrow = (function () {
   
    function drawShadowPattern() {
        for (let i = 0; i < listPatterns.length; i++) {

            const colorOk = listPatterns[i].every(function (el) {
                return el.color === colorPattern.animate;
            });

            if (colorOk) {
                for (let j = 0; j < listPatterns[i].length; j++) {
         
                    ctx.fillStyle = colorPattern.animate;
                    ctx.fillRect((listPatterns[i][j].x * 10) + getPosArrow().pX, (listPatterns[i][j].y * 10) + getPosArrow().pY, widthPoint, heightPoint);
                }
            }
        }
    }

    function drawArrow() {

        if ( getPosCursor().pX < leftSiteList){
            drawShadowPattern();

            x = getPosArrow().pX;
            y = getPosArrow().pY;

            ctx.fillStyle = 'white';
            ctx.font = "20px Montserrat";
            ctx.fillText(x / 10, x + 120, y + 20);
            ctx.fillText(y / 10, x + 10, y + 140);
    
            ctx.strokeStyle = 'white';
            ctx.beginPath();
            ctx.moveTo(10 + x, 150 + y);
            ctx.lineTo(0 + x, 190 + y);
            ctx.lineTo(0 + x, 0 + y);
            ctx.lineTo(190 + x, 0 + y);
            ctx.lineTo(150 + x, 10 + y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0 + x, 190 + y);
            ctx.lineTo(-10 + x, 150 + y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(150 + x, -10 + y);
            ctx.lineTo(190 + x, 0 + y);
            ctx.stroke();
        }

      
    }

    return {
        drawArrow: drawArrow,
        getPosArrow: getPosArrow,
    };
})();

