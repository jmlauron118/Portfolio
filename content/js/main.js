(function () {
    var portfolio = new Portfolio();

    portfolio.InitPortfolio();
})();

function Portfolio() {
    const _portfolio = this;
    var backToTop = document.getElementsByClassName("back-to-top")[0];

    this.InitPortfolio = (() => {
        var navbar = document.getElementById("menu");
        var sticky = navbar.offsetTop;
        var width = document.documentElement.clientWidth;//window.innerWidth;//(window.innerWidth > 0) ? window.innerWidth : screen.width;

        showHideElem(backToTop, 0);
        document.getElementById("txtTitle").text = "JM Lauron"

        window.onscroll = function () {
            var body = document.getElementsByTagName("BODY")[0];
 
            if (body.scrollTop >= 100) {
                showHideElem(backToTop, 1);
            }
            else {
                showHideElem(backToTop, 0);
                _portfolio.ChangePageTitle();
            }

            _portfolio.StickyMenu(navbar, sticky);
        };

        _portfolio.ResizeWindow(width, navbar);
        window.addEventListener("resize", () => {
            _portfolio.ResizeWindow(width, navbar);
        });

        _portfolio.StickyMenu(navbar, sticky);
        _portfolio.UpdateAge();
        _portfolio.MenuClickEvent();
        _portfolio.HoverEvent();

        document.getElementById("logo").addEventListener("click", () => {
            var url = window.location.href;
            var homeUrl = url.includes("index.html") ? url.split("index.html")[0] + "index.html" : url + "index.html";

            showHideElem(backToTop, 0);
            window.location.replace(homeUrl);
        });

        document.getElementsByClassName("mobile-menu")[0].addEventListener("click", () => {
            document.getElementsByClassName("menu")[0].classList.add("open");
        });

        backToTop.addEventListener("click", function () {
            var body = document.getElementsByTagName("BODY")[0];

            body.scrollTop = 0;
        });

        window.addEventListener("click", (e) => {
            if (!document.getElementsByClassName("main-content")[0].contains(e.target)) {
                document.getElementsByClassName("close-sidebar")[0].click();
            }
        });
    });

    function showHideElem(elem, isShown) {
        if (isShown) {
            elem.style.visibility = "visible";
        }
        else {
            elem.style.visibility = "hidden";
        }
    }

    this.MenuClickEvent = (() => {
        var allMenu = document.querySelectorAll("a[class^=nav-link]");

        for (var i = 0; i < allMenu.length; i++) {
            allMenu[i].addEventListener("click", function () {
                var a = Array.from(document.querySelectorAll("a[class^='nav-link']"));

                for (let elem of a) {
                    elem.classList.remove("active");
                }

                this.classList.add("active");

                var id = this.id;
                var parentId = id.split("-")[1];
                var parentDiv = document.getElementById(parentId);
                var topPos = parentDiv.offsetTop;

                document.getElementsByTagName("BODY")[0].scrollTop = topPos - 100;
            });
        }
    });

    this.ChangePageTitle = ((pageName = "") =>{
        var currPageName = document.getElementById("txtTitle").text;
        var splitName = currPageName.split("—");

        if(pageName != ""){
            pageName = pageName.charAt(0).toUpperCase() + pageName.slice(1).toLowerCase();
            document.getElementById("txtTitle").text = pageName + " — " +(splitName.length > 1 ? splitName[1].trim() : splitName[0].trim());
        }
        else{
            document.getElementById("txtTitle").text = splitName.length > 1 ? splitName[1].trim() : splitName[0].trim();
        }
    });

    this.ResizeWindow = ((width, navbar) =>{
        if (width < 768) {
            navbar.classList.remove("sticky");
            navbar.classList.add("menu");
            
            document.getElementsByClassName("close-sidebar")[0].addEventListener("click", () => {
                document.getElementsByClassName("menu")[0].classList.remove("open");
            });
        }
    });

    this.HoverEvent = (() => {
        var section = document.querySelectorAll("div[class='info-content']");

        window.addEventListener("scroll", function () {
            var currentScroll = window.pageYOffset;
            var currentSection;

            for (var i = 0; i < section.length; i++) {
                var divPosition = section[i].offsetTop - 200;

                if (divPosition - 1 < currentScroll) {
                    currentSection = section[i];

                    var id = currentSection.id;
                    var navLink = document.querySelector("a[id='nav-" + id + "']");
                    var a = Array.from(document.querySelectorAll("a[class='nav-link active']"));

                    if (a != undefined) {
                        for (let elem of a) {
                            elem.classList.remove("active");
                        }
                    }

                    if (navLink != null) {
                        navLink.classList.add("active");
                        console.log(a.text);
                        _portfolio.ChangePageTitle(navLink.text);
                    }
                }
            }
        });
    });

    this.UpdateAge = (() => {
        var diff_ms = Date.now() - new Date('1996/01/18').getTime();
        var age_dt = new Date(diff_ms);

        document.getElementById("age").innerHTML = Math.abs(age_dt.getUTCFullYear() - 1970);
    });

    this.StickyMenu = ((navbar, sticky) => {
        var screenWidth = window.innerWidth;//(window.innerWidth > 0) ? window.innerWidth : screen.width;

        if (screenWidth >= 769) {
            if (window.pageYOffset > sticky) {
                navbar.classList.remove("menu");
                navbar.classList.add("sticky");
            } else {
                navbar.classList.remove("sticky");
                navbar.classList.add("menu");
            }
        }
    });
}