let buttonPlus;
let buttonLess;
let currentCurve = -1;
let currentCurveDiv;
let numCurves = 0;
let newButton;
let deleteCurveButton;

//buttons to create and choose between curves

let pointsBox;
let printPoints = true;

let lines;
let printLines = false;

let bCurve;
let printCurve = true;

let deletingCheckbox;
let deleting = false;

let points = [];

let clickedLastDraw = false;

let mousePressedLastDraw = false;

let draging = false;
let currentPoint;

let numAv = 1000;
let inputAval;

function setup() {
    createCanvas(750,750);
    background(255,255,255);
  
    buttonPlus = createButton('+');
    buttonPlus.position(20,20);
    buttonPlus.size(25,25);
  
    buttonLess = createButton('-');
    buttonLess.size(25,25);
    buttonLess.position(20,80);
    
    buttonPlus.mousePressed(plusPressed);
    buttonLess.mousePressed(lessPressed);
    
    newButton = createButton('new');
    newButton.mousePressed(newPressed);
    newButton.position(50,50);
  
    deleteCurveButton = createButton('delete curve');
    deleteCurveButton.mousePressed(deletePressed);
    deleteCurveButton.position(0,230);
  
    lines = createCheckbox('lines', false);
    lines.changed(linesCheckBoxEvent);
    lines.position(20,110);
    
    pointsBox = createCheckbox('points',true);
    pointsBox.changed(pointsCheckboxEvent);
    pointsBox.position(20,140);

    bCurve = createCheckbox('curve', true);
    bCurve.changed(curveCheckboxEvent);
    bCurve.position(20,170);
      
    deletingCheckbox = createCheckbox('deleting',false);
    deletingCheckbox.changed(deletingCheckboxEvent);
    deletingCheckbox.position(20,200);
  
    currentCurveDiv = createDiv('nop');
    currentCurveDiv.position = (20,50);
  
    inputAval = createInput('1000');
    inputAval.input(inputEvent);
    inputAval.position(0,260);
}

function inputEvent() {
    numAv = this.value();
    //console.log(numAv);
}

function linesCheckBoxEvent(){
    printLines = !printLines;
    clickedLastDraw = true;
}

function pointsCheckboxEvent(){
    printPoints = !printPoints;
    clickedLastDraw = true;
}

function curveCheckboxEvent(){
    printCurve = !printCurve;
    clickedLastDraw = true;
}

function deletingCheckboxEvent(){
    deleting = !deleting;
}

function deletePressed(){
    if(numCurves > 0){
        points.splice(currentCurve,1);
        numCurves--;
        clickedLastDraw = true;
        if(currentCurve == numCurves){
            currentCurve--;
            currentCurveDiv.remove();
            if(currentCurve<0){
                currentCurveDiv = createDiv('nop');
            }else{
                currentCurveDiv = createDiv(currentCurve);
            }
            currentCurveDiv.position(20,50);
        }
    }
}

function plusPressed(){
    if(currentCurve < numCurves-1){
        currentCurve++;
        currentCurveDiv.remove();
        currentCurveDiv = createDiv(currentCurve);
        currentCurveDiv.position(20,50);
    }
}
function lessPressed(){
    if(currentCurve != 0){
        currentCurve--;
        currentCurveDiv.remove();
        currentCurveDiv = createDiv(currentCurve);
        currentCurveDiv.position(20,50);
    }
}

function newPressed(){
    currentCurve = numCurves;
    numCurves++;
    currentCurveDiv.remove();
    currentCurveDiv = createDiv(currentCurve);
    currentCurveDiv.position(20,50);
    append(points,[]);
}

function mouseReleased() {
    mousePressedLastDraw = false;
    draging = false;
    //console.log('released');
}

function castanhaDoPara(points){
  let curve = [];
  var x = 0;
  var inv = 1/numAv;
  let aux = [];
  for(let i = 0; i < numAv; i++){
    x  = i*inv;
    for(let j = 0; j < points.length; j++){
      for(let k = 0; k < points.length - j; k++){
        if(j == 0){
          
          aux[k] = createVector(points[k].x, points[k].y);
        }
        else{
         aux[k].x = aux[k].x*(1-x) + aux[k+1].x*x;
         aux[k].y = aux[k].y*(1-x) + aux[k+1].y*x;
        }
      }
    }
    curve[i] = createVector(aux[0].x, aux[0].y);
  }
  return curve;
}

function drawCurve(curve){
    for(let i = 0; i < curve.length - 1; i++){
       line(curve[i].x, curve[i].y, curve[i+1].x, curve[i+1].y);
    }
}

function draw() {
    if(clickedLastDraw){
        background(255,255,255);
        clickedLastDraw = false;
    }
  
    if(mouseIsPressed && !(mouseX <100 && mouseY < 300) && (!mousePressedLastDraw||draging) && numCurves>0){
        mousePressedLastDraw = true;
        if(!deleting){
            if(!draging){
                for(var i = 0; i < points[currentCurve].length;i++){
                    if(7 >sqrt((mouseX-points[currentCurve][i].x)*(mouseX-points[currentCurve][i].x) + (mouseY-points[currentCurve][i].y)*(mouseY-points[currentCurve][i].y))){
                        draging = true;
                        currentPoint = i;
                    }
                }
            }
            if(draging){
                points[currentCurve][currentPoint].x = mouseX;
                points[currentCurve][currentPoint].y = mouseY;
            }else{
                var p1 = createVector(mouseX,mouseY);
                if(numCurves > 0){
                    fill(255,0,0);
                    circle(mouseX,mouseY,10);
                    append(points[currentCurve],p1);
                }
                //console.log(points[currentCurve].length);
            }
        }else{
            for(var i = 0; i < points[currentCurve].length;i++){
                if(7 >sqrt((mouseX-points[currentCurve][i].x)*(mouseX-points[currentCurve][i].x) + (mouseY-points[currentCurve][i].y)*(mouseY-points[currentCurve][i].y))){
                    points[currentCurve].splice(i,1);
                }
            }
        }
        clickedLastDraw = true;
    }
  
    for(var i = 0;i < points.length;i++){
        if(printCurve){
          if(points[i].length >= 3){
                drawCurve(castanhaDoPara(points[i]));
            }
        }
        for(var j = 0;j < points[i].length;j++){
            var x = points[i][j].x;
            var y = points[i][j].y;
            if(currentCurve == i){
                   fill(255,0,0);
               }else{
                   fill(0,0,0);
               }
            if(printPoints){
                circle(x,y,10);
            }
            if(printLines){
                  if(points[i].length-1 > j){
                      fill(0,0,255);
                      line(points[i][j].x,points[i][j].y,points[i][j+1].x,points[i][j+1].y);
                   }
            }
        }
    }
}
