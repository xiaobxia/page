var transBtno = $("transBtn");
var transBtnb = $("transBtn2");

addEvent(transBtnb, "click", function () {
    var textone = $("input-block").value;
    $("output-block").innerHTML = escape2Html(textone);
});
addEvent(transBtno, "click", function () {
    var textone = $("input-block").value;
    $("output-block").innerHTML = htmlEscape(textone);
});
function htmlEscape(text) {
    return text.replace(/[<>"&]/g, function (match, pos, originalText) {
        switch (match) {
            case "<":
                return "&amp;lt;";
            case ">":
                return "&amp;gt;";
            case "&":
                return "&amp;amp;";
            case "\"":
                return "&amp;quot;";
        }
    });
}

function escape2Html(str) {
    var arrEntities = {'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"'};
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
        return arrEntities[t];
    });
}
