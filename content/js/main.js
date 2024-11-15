(function () {
  var portfolio = new Portfolio();

  portfolio.InitPortfolio();
})();

function Portfolio() {
  const _portfolio = this;
  var backToTop = document.getElementsByClassName("back-to-top")[0];
  var changeMode = document.getElementsByClassName("change-mode")[0];
  var rtime;
  var timeout = false;
  var delta = 200;

  //Initializing Portfolio function
  this.InitPortfolio = () => {
    var navbar = document.getElementById("menu");
    var sticky = navbar.offsetTop;
    var width = document.documentElement.clientWidth; //window.innerWidth;//(window.innerWidth > 0) ? window.innerWidth : screen.width;

    _portfolio.showHideElem(backToTop, 0);
    document.getElementById("txtTitle").text = "JM Lauron";

    window.onscroll = function () {
      var body = document.getElementsByTagName("BODY")[0];

      if (body.scrollTop >= 100) {
        _portfolio.showHideElem(backToTop, 1);
      } else {
        _portfolio.showHideElem(backToTop, 0);
        _portfolio.ChangePageTitle();
      }

      _portfolio.StickyMenu(navbar, sticky);
    };

    _portfolio.ResizeWindow(width, navbar);
    window.addEventListener("resize", () => {
      rtime = new Date();
      if (timeout === false) {
        timeout = true;
        setTimeout(resizeEnd(navbar, width), delta);
      }
    });

    _portfolio.StickyMenu(navbar, sticky);
    _portfolio.UpdateAge();
    _portfolio.MenuClickEvent();
    _portfolio.HoverEvent();
    _portfolio.CalcYrExp();

    document.getElementById("logo").addEventListener("click", () => {
      var url = window.location.href;
      var homeUrl = url.includes("index.html")
        ? url.split("index.html")[0] + "index.html"
        : url + "index.html";

      _portfolio.showHideElem(backToTop, 0);
      window.location.replace(homeUrl);
    });

    document
      .getElementsByClassName("mobile-menu")[0]
      .addEventListener("click", () => {
        var menu = document.getElementsByClassName("menu");

        if (menu.length > 0) {
          menu[0].classList.add("open");
        }
      });

    backToTop.addEventListener("click", () => {
      var body = document.getElementsByTagName("BODY")[0];

      body.scrollTop = 0;
    });

    window.addEventListener("click", (e) => {
      if (
        !document.getElementsByClassName("main-content")[0].contains(e.target)
      ) {
        document.getElementsByClassName("close-sidebar")[0].click();
      }
    });

    changeMode.addEventListener("click", () => {
      _portfolio.ChangeMode();
    });
  };

  this.MenuClickEvent = () => {
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
  };

  this.ChangePageTitle = (pageName = "") => {
    var currPageName = document.getElementById("txtTitle").text;
    var splitName = currPageName.split("—");

    if (pageName != "") {
      pageName =
        pageName.charAt(0).toUpperCase() + pageName.slice(1).toLowerCase();
      document.getElementById("txtTitle").text =
        pageName +
        " — " +
        (splitName.length > 1 ? splitName[1].trim() : splitName[0].trim());
    } else {
      document.getElementById("txtTitle").text =
        splitName.length > 1 ? splitName[1].trim() : splitName[0].trim();
    }
  };

  this.ResizeWindow = (width, navbar) => {
    if (width < 768) {
      navbar.classList.remove("sticky");
      navbar.classList.add("menu");

      document
        .getElementsByClassName("close-sidebar")[0]
        .addEventListener("click", () => {
          document.getElementsByClassName("menu")[0].classList.remove("open");
        });
    }
  };

  this.HoverEvent = () => {
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
          var a = Array.from(
            document.querySelectorAll("a[class='nav-link active']")
          );

          if (a != undefined) {
            for (let elem of a) {
              elem.classList.remove("active");
            }
          }

          if (navLink != null) {
            navLink.classList.add("active");
            _portfolio.ChangePageTitle(navLink.text);
          }
        }
      }
    });
  };

  this.UpdateAge = () => {
    var diff_ms = Date.now() - new Date("1996/01/18").getTime();
    var age_dt = new Date(diff_ms);

    document.getElementById("age").innerHTML = Math.abs(
      age_dt.getUTCFullYear() - 1970
    );
  };

  this.StickyMenu = (navbar, sticky) => {
    var screenWidth = window.innerWidth; //(window.innerWidth > 0) ? window.innerWidth : screen.width;

    if (screenWidth >= 769) {
      if (window.pageYOffset > sticky) {
        navbar.classList.remove("menu");
        navbar.classList.add("sticky");
      } else {
        navbar.classList.remove("sticky");
        navbar.classList.add("menu");
      }
    }
  };

  this.CalcYrExp = () => {
    var diffMs = new Date() - new Date("2018-12-29");
    var totalExpDt = new Date(diffMs);

    document.getElementById("lblExp").innerHTML =
      Math.abs(totalExpDt.getUTCFullYear() - 1970) + "+";
  };

  this.showHideElem = (elem, isShown) => {
    if (isShown) {
      elem.style.visibility = "visible";
    } else {
      elem.style.visibility = "hidden";
    }
  };

  this.ChangeMode = () => {
    var body = document.querySelector("body").classList;
    var btnMode = document.getElementsByClassName("mode")[0];

    if (body.contains("light-mode")) {
      //set to dark mode
      document.documentElement.style.setProperty("--color-value", "#ffffff");
      document.documentElement.style.setProperty("--head-bg", "#272727");
      -document.documentElement.style.setProperty(
        "--card-color",
        "transparent"
      );
      document.documentElement.style.setProperty("--menu-color", "#132132");
      document.documentElement.style.setProperty("--shade-color", "#0c74a3");
      document.documentElement.style.setProperty("--btn-default", "#0c74a3");
      document.documentElement.style.setProperty("--icon-default", "#084866");
      document.documentElement.style.setProperty("--icon-hover", "#fff");
      document.documentElement.style.setProperty("--a-hover", "#313e4f");

      btnMode.children[0].className = "far fa-sun";
      btnMode.parentElement.className = "change-mode dark-active";

      body.remove("light-mode");
      body.add("dark-mode");
    } else {
      document.documentElement.style.setProperty("--color-value", "#313e4f");
      document.documentElement.style.setProperty("--head-bg", "#fbf6f2");
      document.documentElement.style.setProperty("--card-color", "#eeeeee");
      document.documentElement.style.setProperty("--menu-color", "#eeeeee");
      document.documentElement.style.setProperty("--shade-color", "#4fc3f7");
      document.documentElement.style.setProperty("--btn-default", "#f1f1f1");
      document.documentElement.style.setProperty("--icon-default", "#fff");
      document.documentElement.style.setProperty("--icon-hover", "#084866");
      document.documentElement.style.setProperty("--a-hover", "whitesmoke");

      btnMode.children[0].className = "fas fa-moon";
      btnMode.parentElement.className = "change-mode light-active";

      body.remove("dark-mode");
      body.add("light-mode");
    }
  };

  function resizeEnd() {
    var navbar = document.getElementById("menu");
    var width = document.documentElement.clientWidth;

    if (new Date() - rtime < delta) {
      setTimeout(resizeEnd, delta);
    } else {
      timeout = false;
      _portfolio.ResizeWindow(width, navbar);
    }
  }
}
