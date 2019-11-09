let buttonPlus;
let buttonLess;
let currentCurve = 0;
let currentCurveDiv;
let numCurves = 1;
let newButton;

//buttons to create and choose between cuves

let lines;
let printLines = false;

let points = [[]];

let clickedLastDraw = false;

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
    newButton.position(40,50);
  
    lines = createCheckbox('lines', false);
    lines.changed(linesCheckBoxEvent);
    lines.position(20,110);
    currentCurveDiv = createDiv(currentCurve);
    currentCurveDiv.position = (20,50);
}

function linesCheckBoxEvent(){
    printLines = !printLines;
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



function draw() {
    if(clickedLastDraw){
        background(255,255,255);
        clickedLastDraw = false;
    }
  
    if(mouseIsPressed && !(mouseX <100 && mouseY <150)){
        fill(255,0,0);
        circle(mouseX,mouseY,10);
        var p1 = createVector(mouseX,mouseY);
        append(points[currentCurve],p1);
        clickedLastDraw = true;
        console.log(points[0][0].x);
    }
  
    for(var i = 0;i < points.length;i++){
        for(var j = 0;j < points[i].length;j++){
            var x = points[i][j].x;
            var y = points[i][j].y;
            if(currentCurve == i){
                   fill(255,0,0);
               }else{
                   fill(0,0,0);
               }
            circle(x,y,10);
            if(printLines){
                  if(points[i].length-1 > j){
                      fill(0,0,255);
                      line(points[i][j].x,points[i][j].y,points[i][j+1].x,points[i][j+1].y);
                   }
            }
        }
    }
}