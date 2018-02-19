<?php
$landing_name = 'Name';
$tpl = 'a.html';
$logo = 'img/index.png';
$contentFile = '2';

if (!empty($_GET['contentFile'])) {
    $contentFile = (int)$_GET['contentFile'];
}
$fileTmp = file_get_contents($tpl);
$content = file_get_contents("content/" . $contentFile);
$contents = explode("\n", $content);
$allData = [];
foreach ($contents as $data) {
    //content replace:
    $replace = explode('|', $data);
    $fileTmp = str_replace($replace[0], $replace[1], $fileTmp);
    $data = explode('|', $data);
    $allData[$data[0]] = $data[1];
}

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

echo $fileTmp;