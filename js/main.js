(function () {
    var portfolio = new Portfolio();

    portfolio.InitPortfolio();
})();

function Portfolio() {
    const _portfolio = this;

    this.InitPortfolio = (() => {

        var navbar = document.getElementById("menu");
        var sticky = navbar.offsetTop;


        window.onscroll = function () {
            _portfolio.StickyMenu(navbar, sticky)
        };

        _portfolio.StickyMenu(navbar, sticky);
        _portfolio.UpdateAge();
        _portfolio.MenuClickEvent();

        document.getElementById("logo").addEventListener("click", () => {
            var url = window.location.href;
            var homeUrl = url.split("index.html")[0] + "index.html";
            console.log(homeUrl);
            window.location.replace(homeUrl);
        });
    });

    this.MenuClickEvent = (() => {
        var allMenu = document.querySelectorAll("a[class='nav-link']");

        for (var i = 0; i < allMenu.length; i++) {
            allMenu[i].addEventListener("click", function () {
                var test = Array.from(document.querySelectorAll("a[class='nav-link active']"));
                for(let elem of test){
                    elem.classList.remove("active");
                }

                this.classList.add("active");
            });
        }
    });

    this.UpdateAge = (() => {
        var diff_ms = Date.now() - new Date('1996/01/18').getTime();
        var age_dt = new Date(diff_ms);

        document.getElementById("age").innerHTML = Math.abs(age_dt.getUTCFullYear() - 1970);
    });

    this.StickyMenu = ((navbar, sticky) => {
        if (window.pageYOffset > sticky) {
            navbar.classList.remove("menu");
            navbar.classList.add("sticky");
        } else {
            navbar.classList.remove("sticky");
            navbar.classList.add("menu");
        }
    });
}