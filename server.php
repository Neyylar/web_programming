<?php
$r = $_GET['r'];
$x = $_GET['x'];
$y = $_GET['y'];
$start = microtime(true);
$b = false;
$answer = "[";
if ($x != null && $y >= -5 && $y <= 5 && $r >= 2 && $r <= 5 && $r != null && $y != null) $b = true;
foreach ($x as $i) {
        if ($i >= 0 && $y <= $r && $i <= $r && $y >= 0
            || $i <= 0 && $y <= sqrt(pow($r, 2) - pow($i, 2)) && $y >= 0
            || $i <= 0 && $y <= 0 && $y >= -$r / 2 - $i) {
            $answer .= "{ \"x\":\"$i\",\"y\":\"$y\",\"r\":\"$r\",\"result\": \"Попало\", \"time\":\"" . (date("H:i:s ")) . "\",\"time_of_work\":\"" . round((microtime(true) - $start), 8) . "\"}";
            $answer .= ($i === end($x)) ? "" : ",";
        } else {
            $answer .= "{ \"x\":\"$i\",\"y\":\"$y\",\"r\":\"$r\",\"result\": \"Непопало\", \"time\":\"" . (date("H:i:s ")) . "\",\"time_of_work\":\"" . round ((microtime(true) - $start), 8) . "\"}";
            $answer .= ($i === end($x)) ? "" : ",";
        }
    }
    $answer .= "]";
if ($b) echo ($answer);




