function PWC(wikicode) {
    wikicode = wikicode.replace(/\n\n/g, "<br>");
    var key = "t";
    var timer = 0;
    var tmpin = [""];
    var next = "";
    var text = "";
    var out = "";
    for (i in wikicode) {
        if (key === "t") {
            if (wikicode.substring(i, parseInt(i) + 2) === "{{") {
                out = out + text/*.replace(/ /g, "&nbsp;")*/
                text = "";
                key = "_";
                timer = 0;
                next = "{}";
            } else {
                text = text + wikicode[i];
            }
        } else if (key === "{}") {
            if (wikicode.substring(i, parseInt(i) + 2) === "{{") {
                tmpin.push("");
                key = "_";
                timer = 0;
                next = "{}";
            } else if (wikicode.substring(i, parseInt(i) + 2) === "}}") {
                if (tmpin.length === 1) {
                    out = out + tmp(tmpin[0]);
                    tmpin = [""]
                    key = "_";
                    timer = 0;
                    next = "t";
                } else {
                    tmpin[tmpin.length - 2] = tmpin[tmpin.length - 2] + tmp(tmpin[tmpin.length - 1]);
                    tmpin.pop();
                    key = "_";
                    timer = 0;
                    next = "{}";
                }
            } else {
                tmpin[tmpin.length - 1] = tmpin[tmpin.length - 1] + wikicode[i];
            }
        } else if (key === "_") {
            if (timer > 0) {
                timer = timer - 1;
            } else {
                key = next;
            }
        }
    }
    if (text != "") {
        out = out + text;
    }
    return out;//out.replace(/ /g, "&nbsp;");
}

function tmp(wikicode) {
    var params = wikicode.split("|");
    var name = params[0]/*.split(":")*/;
    params.reverse();
    params.pop()
    params.reverse();
    if (name === "!" || name == "<" || name == ">") {
        return { "!": "&#124;", "<": "&#123;", ">": "&#125;" }[name]
    } else /*if (name.length === 1)*/ {
        eval("var out = wctmp." + name + "('" + params.join("', '") + "');");
        return out
    }
}

