(function () {
    var portfolio = new Portfolio();

    portfolio.InitPortfolio();
})();

function Portfolio() {
    const _portfolio = this;

    this.InitPortfolio = (() =>{

        var navbar = document.getElementById("menu");
        var sticky = navbar.offsetTop;

        
        window.onscroll = function() {_portfolio.StickyMenu(navbar,sticky)};
        _portfolio.StickyMenu(navbar,sticky);
    });

    this.StickyMenu = ((navbar, sticky) =>{
        if (window.pageYOffset > sticky) {
            navbar.classList.remove("menu");
            navbar.classList.add("sticky");
        } else {
            navbar.classList.remove("sticky");
            navbar.classList.add("menu");
        }
    });
}