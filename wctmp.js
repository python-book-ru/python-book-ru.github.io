class wctmp {
    constructor() { }
    metaDoc(lastUpd, t, name, using, ) {
        wctmp.lastUpd(lastUpd)
        return "<table><tr><td width='100%'>" + wctmp.type(t) + " " + name + "</td></tr><tr><td width='100%'>" + using + "</td></tr></table>"
    }

    code(code) {
        return "<pre>" + code + "</pre>"
    }

    type(t) {
        if (t == "v") {
            return "■" //"<img src='var.png' class='type'>"
        } else if (t == "f") {
            return "⨍" //"<img src='func.png'>"
        } else if (t == "c") {
            return "⬡" //"<img src='class.png'>"
        } else if (t == "l") {
            return "🕮" //"<img src='class.png'>"
        }
    }

    lastUpd(n) {
        var lastUpdGui = document.getElementById("last-upd")
        var upd = get("upd/" + n + ".txt").split("\n")
        lastUpdGui.innerHTML = lastUpdGui.innerHTML + upd[0]
    }
}

wctmp = new wctmp()