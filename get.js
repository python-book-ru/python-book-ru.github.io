function get(url){
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url, false)
    xhr.send()
    if (xhr.status == 200) {
        return xhr.responseText
    } else {
        return false
    }
}