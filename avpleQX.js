// 引用地址 https://github.com/limbopro/Adblock4limbo/blob/main/Adguard/surge_avple.js

let rHead = "<head>";
let newStyle =
  '<head><link rel="stylesheet"https://raw.githubusercontent.com/re2/g/master/avple.css" type="text/css">';
let rBody = "</body>";
let newJavaScript =
  '<script type="text/javascript" src="https://raw.githubusercontent.com/re2/g/master/avple.js"></script></body>';
let body = $response.body.replace(rHead, newStyle).replace(rBody, newJavaScript);
$done({ body });
