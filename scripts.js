let graphic = $('#graphic')[0].getContext('2d');
const width = graphic.canvas.width;
const height = graphic.canvas.height;
drawGraphic();
$("form#coords").submit(function (event) {
    event.preventDefault();
    validation();
})
function validation() {
    let y = $("#y").val();
    let r = $("#r").val();
    if (!(isNaN(y) || y<-5 && y>5)&&!(isNaN(r)||r<2||r>5)&&$("input:checkbox").filter(":checked").length>0){
        toServer();
    }
}
function toServer(){
    $.get("server.php", $("#coords").serialize(), function(answer) {
        let coords = JSON.parse(answer);
        drawGraphic();
        coords.map(i => {
            writeResult(i);
            drawDots(i);
        });
        scaleCanvas(coords[0]);
    });
}

function writeResult(answer){
    $("#data_in_the_table").append(
        "<tr> <td>" + answer.x + "</td>" +
        "<td>" + answer.y + "</td>" +
        "<td>" + answer.r + "</td>" +
        "<td>" + answer.result + "</td>" +
        "<td>" + answer.time + "</td>" +
        "<td>" + answer.time_of_work + "</td> </tr>");
}



function getRealX(x) {
    return width / 2 + height * x / (4 * $("#r").val());
}

function getRealY(y) {
    return height / 2 - height * y / (4 * $("#r").val());
}
function drawGraphic() {
    graphic.clearRect(0, 0, width, height);
    let scale = height/4;
    const gradient = graphic.createLinearGradient(width / 4, height / 2, width * 3 / 4, height / 2);
    gradient.addColorStop("0", "Aquamarine");
    gradient.addColorStop("0.5", "BurlyWood");
    gradient.addColorStop("1.0", "Coral");
    graphic.fillStyle = gradient;
    graphic.beginPath();
    graphic.moveTo(width / 2, height / 2)
    graphic.arc(width / 2, height / 2, scale, 3 * Math.PI / 2, Math.PI, true);
    graphic.closePath();
    graphic.fill();
    graphic.beginPath();
    graphic.moveTo(7*scale/2, height / 2);
    graphic.lineTo(width / 2,  5*scale/2);
    graphic.lineTo(width / 2, height / 2);
    graphic.closePath();
    graphic.fill();
    graphic.beginPath();
    graphic.moveTo(width / 2, scale);
    graphic.lineTo(5*scale, scale);
    graphic.lineTo(5*scale, height / 2);
    graphic.lineTo(width / 2, height / 2);
    graphic.closePath();
    graphic.fill();

    graphic.beginPath();
    graphic.moveTo(width / 2, 0);
    graphic.lineTo(width / 2, height);
    graphic.stroke();
    graphic.beginPath();
    graphic.moveTo(width/4, height / 2);
    graphic.lineTo(width*3/4, height / 2);
    graphic.stroke();


}
function drawDots(coords){
    graphic.fillStyle="DarkSeaGreen";
    graphic.fillRect(getRealX(coords.x)*0.99,getRealY(coords.y)*0.99,3,3);
    graphic.strokeRect(getRealX(coords.x)*0.99,getRealY(coords.y)*0.99, 4, 4);

}
function scaleCanvas(coords) {
    graphic.beginPath();
    graphic.moveTo(getRealX(-coords.r), getRealY(coords.r*0.07));
    graphic.lineTo(getRealX(-coords.r), getRealY(-coords.r*0.07))
    graphic.stroke();

    graphic.beginPath();
    graphic.moveTo(getRealX(-coords.r/2), getRealY(coords.r*0.07));
    graphic.lineTo(getRealX(-coords.r/2), getRealY(-coords.r*0.07))
    graphic.stroke();

    graphic.beginPath();
    graphic.moveTo(getRealX(coords.r), getRealY(coords.r*0.07));
    graphic.lineTo(getRealX(coords.r), getRealY(-coords.r*0.07))
    graphic.stroke();

    graphic.beginPath();
    graphic.moveTo(getRealX(coords.r/2), getRealY(coords.r*0.07));
    graphic.lineTo(getRealX(coords.r/2), getRealY(-coords.r*0.07))
    graphic.stroke();

    graphic.beginPath();
    graphic.moveTo(getRealX(-coords.r*0.07), getRealY(coords.r));
    graphic.lineTo(getRealX(coords.r*0.07), getRealY(coords.r))
    graphic.stroke();

    graphic.beginPath();
    graphic.moveTo(getRealX(-coords.r*0.07), getRealY(coords.r/2));
    graphic.lineTo(getRealX(coords.r*0.07), getRealY(coords.r/2))
    graphic.stroke();

    graphic.beginPath();
    graphic.moveTo(getRealX(-coords.r*0.07), getRealY(-coords.r));
    graphic.lineTo(getRealX(coords.r*0.07), getRealY(-coords.r))
    graphic.stroke();

    graphic.beginPath();
    graphic.moveTo(getRealX(-coords.r*0.07), getRealY(-coords.r/2));
    graphic.lineTo(getRealX(coords.r*0.07), getRealY(-coords.r/2))
    graphic.stroke();

    graphic.fillStyle="Black";
    graphic.fillText(coords.r ,getRealX(coords.r*0.9), getRealY(-coords.r*0.3));
    graphic.fillText(-coords.r ,getRealX(-coords.r*1.1), getRealY(-coords.r*0.3));


}
