<?php
/**
 * Created by PhpStorm.
 * User: @Aliaxander
 * Date: 19.02.18
 * Time: 20:06
 */
$landing_name = 'Name';
$tpl = 'ac.html';
$logo = 'logo';
$contentFile = '1';

$content = file_get_contents("content/" . $contentFile);
$contents = explode("\n", $content);
$allData = [];
foreach ($contents as $data) {
    $data = explode('|', $data);
    $allData[$data[0]] = $data[1];
}
if (!empty($_GET['player'])) {
    $player = file_get_contents('acplayer.html');
    $player = str_replace('{$videoplayer_poster}', $allData['{$videoplayer_poster}'], $player);
    $player = str_replace('{$film_name}', $allData['{$film_name}'], $player);
    echo $player;
    die;
}


$fileTmp = file_get_contents($tpl);
//global replace:
$fileTmp = str_replace('{$landing_name}', $landing_name, $fileTmp);
$fileTmp = str_replace('{$logo}', $logo, $fileTmp);


//comments logic:
preg_match('|<comments>(.+)</comments>|isU', $fileTmp, $commentTpl);
$resultCommentTpl = $commentTpl[1];
$comments = [];
$getCommentsFile = file_get_contents('comments.txt');
$getComments = explode("\n", $getCommentsFile);
foreach ($getComments as $comment) {
    $comment = explode('|', $comment);
    $resultComment = str_replace('{$comment_avatar}', $comment[0], $resultCommentTpl);
    $resultComment = str_replace('{$comment_name}', $comment[1], $resultComment);
    $resultComment = str_replace('{$comment_date}', $comment[2], $resultComment);
    $resultComment = str_replace('{$comment_text}', $comment[3], $resultComment);
    $comments[] = $resultComment;
}
$comments = implode("\n", $comments);

$fileTmp = preg_replace('|<comments>(.*)</comments>|isU', $comments, $fileTmp);
//content replace:
$content = file_get_contents("content/1");
$contents = explode("\n", $content);
foreach ($contents as $replace) {
    $replace = explode('|', $replace);
    $fileTmp = str_replace($replace[0], $replace[1], $fileTmp);
}
echo $fileTmp;