var map = {}
function searchMap(id, url) {
    var libs = get("doc/" + url + "/all").split("\n")
    var root = document.getElementById(id + "-sub")
    var btn = document.getElementById(id)
    btn.innerHTML = "▼"
    btn.setAttribute("onclick", "closeMap('" + id + "')")
    var btnsub = undefined
    var link = undefined
    var sub = undefined
    for (var lib in libs) {
        libs[lib] = libs[lib].split(" ")
        if (libs[lib][0] == "l" || libs[lib][0] == "c") {
            btnsub = document.createElement("a")
            btnsub.setAttribute("onclick", "searchMap('" + id + "-" + libs[lib][1] + "', '" + url + "/" + libs[lib][1] + "')")
            btnsub.id =  id + "-" + libs[lib][1]
            btnsub.innerHTML = "▶"
            root.appendChild(btnsub)
        }
        link = document.createElement("a")
        link.setAttribute("href", "?d&" + url.split("/").join("&") + "&" + libs[lib][1])
        link.innerHTML = wctmp.type(libs[lib][0]) + " " + libs[lib][1]
        root.appendChild(link)
        if (libs[lib][0] == "l" || libs[lib][0] == "c") {
            sub = document.createElement("div")
            sub.id = id + "-" + libs[lib][1] + "-sub"
            sub.className = "map-sub"
            root.appendChild(sub)
        }
        root.appendChild(document.createElement("div"))
    }
    root.style.display = "block"
}
function closeMap(id) {
    var btn = document.getElementById(id)
    var sub = document.getElementById(id + "-sub")
    btn.innerHTML = "▶"
    btn.setAttribute("onclick", "openMap('" + id + "')")
    sub.style.display = "none"
}

function openMap(id) {
    var btn = document.getElementById(id)
    var sub = document.getElementById(id + "-sub")
    btn.innerHTML = "▼"
    btn.setAttribute("onclick", "closeMap('" + id + "')")
    sub.style.display = "block"
}
var libs = get("doc/all")
libs = libs.split("\n")
libs.pop()
var root = document.getElementById("map")
var btn = undefined
var link = undefined
var sub = undefined
var br = undefined
for (var lib in libs) {
    btn = document.createElement("a")
    eval("map." + libs[lib] + " = function () {searchMap('map-"  + libs[lib] + "', '" + libs[lib] + "')}")
    btn.setAttribute("onclick", "map." + libs[lib] + "()")
    btn.id = "map-" + libs[lib]
    btn.innerHTML = "▶"
    root.appendChild(btn)
    link = document.createElement("a")
    link.setAttribute("href", "?d&" + libs[lib])
    link.innerHTML = wctmp.type("l") + " " + libs[lib]
    root.appendChild(link)
    sub = document.createElement("div")
    sub.id = "map-" + libs[lib] + "-sub"
    sub.className = "map-sub"
    sub.style.display = "none"
    root.appendChild(sub)
    root.appendChild(document.createElement("div"))
}