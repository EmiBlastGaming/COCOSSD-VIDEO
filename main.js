estatus = false
lista = []

function setup() {
    canvas = createCanvas(500, 300)
    canvas.center()
    videofideo.hide()
    detectorobjetos = ml5.objectDetector("cocossd", modelLoaded)
}
function draw() {
    image(videofideo, 0, 0, width, height)
    if(estatus == true) {
        videofideo.size(width, height)
        detectorobjetos.detect(videofideo, Respuestas)
        for(i = 0; i < lista.length; i ++) {
            obj = lista[i]
            porcentaje = round(obj.confidence*100)
            stroke("red")
            strokeWeight(5)
            noFill()
            rect(obj.x, obj.y, obj.width, obj.height)
            noStroke()
            fill("black")
            textSize(15)
            textStyle(BOLD)
            text(obj.label + " " + porcentaje + "%", obj.x, obj.y + 10)
        }
        document.getElementById("status").innerHTML = lista.length + " objetos detectados"
    }
}
function modelLoaded() {
    console.log("Cargo cocossd")
    estatus = true
}
function Respuestas(error, resultados) {
    if(error) {
        console.error("ERROR")
    } else {
        console.log(resultados)
        lista = resultados
    }
}

function preload() {
    videofideo = createVideo("lamborghini.mp4")
}
function ReproducirVideo() {
    videofideo.loop()
    videofideo.volume(0)
    videofideo.speed(1)
}