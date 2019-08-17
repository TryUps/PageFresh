(function() {
    const $ = function(elem) {
        if (!(this instanceof $))
        return new $(elem);
        this.e = document.querySelector(elem);
    };  
    $.fn = $.prototype = {
    
        init: function () {return false;}
    };
    $.fn.html = function(html){
        return this.e.innerHTML = html;
    }
    $.fn.load = function (url) {
        if(Array.isArray(url) == true){
            const request = async() => {
                const results = await Promise.all(url.map((url) => fetch("pages/" + url + ".html").then((r) => r.text())));
                return results;
            }
            request().then(data => this.e.innerHTML = data.toString());
        }else{
            const request = async () => {
                let response = await fetch("pages/" + url + ".html");
                var data = await response.text();
                return data;
            }
            var lock = [];
            request().then(data => {

                this.e.innerHTML = data;
            
            });
        }
    }

    const goTo = function(){
        var url = location.hash.slice(3);
        if(url == ""){
            location.hash = "#!/home";
            url = "home";
        }
        var pageUrl = url; 
        $(".content").load(url);
        setTimeout(function(){
            var pageTitle = document.querySelector("section");
            if(!pageTitle){
                pageTitle = "Page Error!";
            }else{
                pageTitle = pageTitle.getAttribute("alt");
            }
            if(pageTitle == null || pageTitle == ""){
                pageTitle = "Page Error!";
            }
            
            document.title = "Ary Sinteco – " + pageTitle;
        }, 100)
    }

    window.addEventListener('hashchange', function() {
        goTo();
    }, false);

    window.onhashchange = goTo();

    window.$ = $;

})();
