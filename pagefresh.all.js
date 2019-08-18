"use strict";
/**
 * TryUps Fresh Pages
 * Hashtag pagination very easy.
 * version: 1.2.1
 */
const Fresh = function({el, settings}){
    el = el || "body";
    this.el = document.querySelector(el);
    this.settings = {};
    this.settings = settings | {
        "module":false,
        "folder":"/pages/",
        "home":"#!/home"
    };
    this.title = document.title;

    window.onhashchange = this.go();
    this.hashHandler();
}

Fresh.prototype.load = function(url){
    if(url == "[object HashChangeEvent]"){
        url = location.hash.slice(3);
    }
    if(Array.isArray(url) == true){
        const request = async() => {
            const folder = this.settings.folder || "/pages/";
            const results = await Promise.all(url.map((url) => fetch(folder + url + ".html").then((r) => r.text())));
            return results;
        }
        request().then(data => this.el.innerHTML = data.toString());
    }else{
        const request = async () => {
            let response = await fetch("pages/" + url + ".html");
            var data = await response.text();
            return data;
        }
        var lock = [];
        request().then(data => {
            if(data == undefined){
                data = "Error 404, page not found.";
            }
            this.el.innerHTML = data.toString();
        });
    }
}

Fresh.prototype.go = function(){
    let url = location.hash.slice(3);
    if(url == ""){
        location.hash =  this.settings.home || "#!/home";
        if(!this.settings.home){
            url = "home";
        }else{
            url = this.settings.home.slice(3);
        }
    }
    this.load(url);
    this.setTitle();
}

Fresh.prototype.setTitle = function(){
    setTimeout(function(){
        let pgTitle = document.querySelector("meta[name='fresh']");
        let pgEl = pgTitle;
        if(!pgTitle){
            pgTitle == "Error!";
        }else{
            pgTitle = pgTitle.getAttribute("value");
            pgEl.remove();
        }
        if(pgTitle == null || pgTitle == ""){
            pgTitle = "Error!";
        }
        document.title = this.title + " – " + pgTitle;
    },300);
}

Fresh.prototype.hashHandler = function(){
    this.oldHash = window.location.hash;
    this.Check;
    var that = this;
    var detect = function(){
        if(that.oldHash!=window.location.hash){
            that.oldHash = window.location.hash;
            that.go();
        }
    };
    this.Check = setInterval(function(){ detect() }, 100);
}

try {
    module.exports = exports = Fresh;
} catch (e) {
    // nothing
}