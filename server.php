<?php
$r = $_GET['r'];
$x = $_GET['x'];
$y = $_GET['y'];
$start = microtime(true);

$answer = "[";
foreach ($x as $i) {
    if ($i >= 0 && $y <= $r && $i <= $r && $y >= 0
        || $i <= 0 && $y <= sqrt(pow($r, 2) - pow($i, 2)) && $y >= 0
        || $i <= 0 && $y <= 0 && $y >= -$r / 2 - $i) {
        $answer .= "{ \"x\":\"$i\",\"y\":\"$y\",\"r\":\"$r\",\"result\": \"Попало\", \"time\":\"".(date("H:i:s "))."\",\"time_of_work\":\"".(microtime(true) - $start)."\"}";
        $answer.= ($i === end($x)) ? "" : ",";
            } else {
        $answer .= "{ \"x\":\"$i\",\"y\":\"$y\",\"r\":\"$r\",\"result\": \"Непопало\", \"time\":\"".(date("H:i:s "))."\",\"time_of_work\":\"".(microtime(true) - $start)."\"}";
        $answer.= ($i === end($x)) ? "" : ",";
    }
}
$answer .= "]";

echo ($answer);


