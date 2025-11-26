document.addEventListener("DOMContentLoaded", function() {
  var portfolio = new Portfolio();

  portfolio.InitPortfolio();
});

function Portfolio() {
  const _portfolio = this;
  const headerToggle = document.querySelector(".header-toggle");
  const sections = document.querySelectorAll(".section");
  const backToTop = document.getElementsByClassName("back-to-top")[0];

  this.InitPortfolio = () => {
    const accordionItems = document.querySelectorAll(".accordion-item");
    const menuLinks = document.querySelectorAll(".navmenu a")

    accordionItems.forEach(item => {
      item.querySelector(".accordion-header").addEventListener("click", () => {
        accordionItems.forEach(i => {
          if (i !== item) i.classList.remove("active");
        });

        item.classList.toggle("active");
      });
    });

    document.getElementById("name").addEventListener("input", function() {
      this.value = capitalizeWords(this.value);
    });
    
    document.getElementById("email").addEventListener("input", function() {
      this.value = this.value.toLowerCase();
    })

    headerToggle.addEventListener("click", _portfolio.toggleHeader);

    document.querySelectorAll("#navmenu a").forEach(menu => {
      menu.addEventListener("click", function() {
        if(document.querySelector(".header-show")) {
          _portfolio.toggleHeader();
        }
      });
    });

    menuLinks.forEach(menu => {
      menu.addEventListener("click", function() {
        const activeMenu = document.querySelector(".navmenu a.active");
        const parentDiv = document.getElementById(this.id.split("-")[1]);
        let topPosition = parentDiv.offsetTop;

        activeMenu.classList.remove("active");
        menu.classList.add("active");

        document.getElementsByTagName("BODY")[0].scrollTop = topPosition;
      })
    });

    backToTop.addEventListener("click", function() {
      const body = document.getElementsByTagName("BODY")[0];

      body.scrollTop = 0;
    });

    window.addEventListener("load", _portfolio.menuScroll);
    document.addEventListener("scroll", _portfolio.menuScroll)
    
    type();
    sendEmail();
    _portfolio.UpdateAge();
    _portfolio.CalcYrExp();  
    _portfolio.showHideElem(backToTop, 0);  
  }

  this.UpdateAge = function() {
    var diff_ms = Date.now() - new Date("1996/01/18").getTime();
    var age_dt = new Date(diff_ms);

    document.getElementById("age").innerHTML = Math.abs(
      age_dt.getUTCFullYear() - 1970
    );
  }

  this.CalcYrExp = function() {
    var diffMs = new Date() - new Date("2018-12-29");
    var totalExpDt = new Date(diffMs);

    document.getElementById("lblExp").innerHTML =
    Math.abs(totalExpDt.getUTCFullYear() - 1970) + "+";
  }

  this.toggleHeader = function() {
    const icon = headerToggle.children[0];
    document.getElementById("header").classList.toggle("header-show");

    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-times");
  }

  this.menuScroll = function() {
    const body = document.getElementsByTagName("BODY")[0];
    let currentScroll = window.pageYOffset;

    if(body.scrollTop >= 150) {
      _portfolio.showHideElem(backToTop, 1);
    }
    else{
      _portfolio.showHideElem(backToTop, 0);
    }

    sections.forEach((section) => {
      const activeMenu = document.querySelector(".navmenu a.active");
      let sectionPosition = section.offsetTop;
      
      if(sectionPosition - 1 < currentScroll) {
        const navMenu = document.querySelector(`#nav-${section.id}`);

        activeMenu.classList.remove("active");
        navMenu.classList.add("active");
        _portfolio.ChangePageTitle(navMenu.text);
      }
    });
  }

  let scrollTimeout;
  this.ChangePageTitle = (pageName = "") => {
    const currPageName = document.getElementById("txtTitle").text;
    let splitName = currPageName.split("—");

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (pageName != "") {
        pageName = pageName.trim().charAt(0).toUpperCase() + pageName.trim().slice(1).toLowerCase();
        document.getElementById("txtTitle").text = pageName + " — " +
          (splitName.length > 1 ? splitName[1].trim() : splitName[0].trim());
      } else {
        document.getElementById("txtTitle").text =
          splitName.length > 1 ? splitName[1].trim() : splitName[0].trim();
      }
    }, 200);
  };

  this.showHideElem = function(elem, isShown){
    if (isShown) {
      elem.style.visibility = "visible";
    } else {
      elem.style.visibility = "hidden";
    }
  };






  // const _portfolio = this;
  // var backToTop = document.getElementsByClassName("back-to-top")[0];
  // var changeMode = document.getElementsByClassName("change-mode")[0];
  // var rtime;
  // var timeout = false;
  // var delta = 200;

  // //Initializing Portfolio function
  // this.InitPortfolio = () => {
  //   var navbar = document.getElementById("menu");
  //   var sticky = navbar.offsetTop;
  //   var width = document.documentElement.clientWidth; //window.innerWidth;//(window.innerWidth > 0) ? window.innerWidth : screen.width;

  //   _portfolio.showHideElem(backToTop, 0);
  //   document.getElementById("txtTitle").text = "JM Lauron";

  //   window.onscroll = function () {
  //     var body = document.getElementsByTagName("BODY")[0];

  //     if (body.scrollTop >= 100) {
  //       _portfolio.showHideElem(backToTop, 1);
  //     } else {
  //       _portfolio.showHideElem(backToTop, 0);
  //       _portfolio.ChangePageTitle();
  //     }

  //     _portfolio.StickyMenu(navbar, sticky);
  //   };

  //   _portfolio.ResizeWindow(width, navbar);
  //   window.addEventListener("resize", () => {
  //     rtime = new Date();
  //     if (timeout === false) {
  //       timeout = true;
  //       setTimeout(resizeEnd(navbar, width), delta);
  //     }
  //   });

  //   _portfolio.StickyMenu(navbar, sticky);
  //   _portfolio.UpdateAge();
  //   _portfolio.MenuClickEvent();
  //   _portfolio.HoverEvent();
  //   _portfolio.CalcYrExp();

  //   document.getElementById("logo").addEventListener("click", () => {
  //     var url = window.location.href;
  //     var homeUrl = url.includes("index.html")
  //       ? url.split("index.html")[0] + "index.html"
  //       : url + "index.html";

  //     _portfolio.showHideElem(backToTop, 0);
  //     window.location.replace(homeUrl);
  //   });

  //   document
  //     .getElementsByClassName("mobile-menu")[0]
  //     .addEventListener("click", () => {
  //       var menu = document.getElementsByClassName("menu");

  //       if (menu.length > 0) {
  //         menu[0].classList.add("open");
  //       }
  //     });

  //   backToTop.addEventListener("click", () => {
  //     var body = document.getElementsByTagName("BODY")[0];

  //     body.scrollTop = 0;
  //   });

  //   window.addEventListener("click", (e) => {
  //     if (
  //       !document.getElementsByClassName("main-content")[0].contains(e.target)
  //     ) {
  //       document.getElementsByClassName("close-sidebar")[0].click();
  //     }
  //   });

  //   _portfolio.ChangeMode();
  //   changeMode.addEventListener("click", () => {
  //     _portfolio.ChangeMode();
  //   });
  // };

  // this.MenuClickEvent = () => {
  //   var allMenu = document.querySelectorAll("a[class^=nav-link]");

  //   allMenu.forEach((button) => {
  //     button.addEventListener("click", function (e) {
  //       const activeMenu = document.querySelector("a.nav-link.active");

  //       e.target.classList.add("active");
  //       activeMenu.classList.remove("active");

  //       var id = this.id;
  //       var parentId = id.split("-")[1];
  //       var parentDiv = document.getElementById(parentId);
  //       var topPos = parentDiv.offsetTop;

  //       document.getElementsByTagName("BODY")[0].scrollTop = topPos - 100;
  //     });
  //   });

  //   // for (var i = 0; i < allMenu.length; i++) {
  //   //   allMenu[i].addEventListener("click", function () {
  //   //     var a = Array.from(document.querySelectorAll("a[class^='nav-link']"));

  //   //     for (let elem of a) {
  //   //       elem.classList.remove("active");
  //   //     }

  //   //     this.classList.add("active");

  //   //     var id = this.id;
  //   //     var parentId = id.split("-")[1];
  //   //     var parentDiv = document.getElementById(parentId);
  //   //     var topPos = parentDiv.offsetTop;

  //   //     document.getElementsByTagName("BODY")[0].scrollTop = topPos - 100;
  //   //   });
  //   // }
  // };

  // this.ChangePageTitle = (pageName = "") => {
  //   var currPageName = document.getElementById("txtTitle").text;
  //   var splitName = currPageName.split("—");

  //   if (pageName != "") {
  //     pageName = pageName.trim().charAt(0).toUpperCase() + pageName.trim().slice(1).toLowerCase();
  //     document.getElementById("txtTitle").text =
  //       pageName +
  //       " — " +
  //       (splitName.length > 1 ? splitName[1].trim() : splitName[0].trim());
  //   } else {
  //     document.getElementById("txtTitle").text =
  //       splitName.length > 1 ? splitName[1].trim() : splitName[0].trim();
  //   }
  // };

  // this.ResizeWindow = (width, navbar) => {
  //   if (width < 768) {
  //     navbar.classList.remove("sticky");
  //     navbar.classList.add("menu");

  //     document
  //       .getElementsByClassName("close-sidebar")[0]
  //       .addEventListener("click", () => {
  //         document.getElementsByClassName("menu")[0].classList.remove("open");
  //       });
  //   }
  //   else{
  //     navbar.classList.remove("menu");
  //     navbar.classList.add("sticky");
  //   }

  //   console.log("Resized to: " + width);
  // };

  // this.HoverEvent = () => {
  //   var section = document.querySelectorAll("div[class='info-content']");

  //   ///ang salarin
  //   window.addEventListener("scroll", function () {
  //     var currentScroll = window.pageYOffset;
  //     var currentSection;

  //     for (var i = 0; i < section.length; i++) {
  //       var divPosition = section[i].offsetTop - 200;

  //       if (divPosition - 1 < currentScroll) {
  //         currentSection = section[i];

  //         var id = currentSection.id;
  //         var navLink = document.querySelector("a[id='nav-" + id + "']");
  //         var a = Array.from(
  //           document.querySelectorAll("a[class='nav-link active']")
  //         );

  //         if (a != undefined) {
  //           for (let elem of a) {
  //             elem.classList.remove("active");
  //           }
  //         }

  //         if (navLink != null) {
  //           navLink.classList.add("active");
  //           _portfolio.ChangePageTitle(navLink.text);
  //         }
  //       }
  //     }
  //   });
  // };

  // this.UpdateAge = () => {
  //   var diff_ms = Date.now() - new Date("1996/01/18").getTime();
  //   var age_dt = new Date(diff_ms);

  //   document.getElementById("age").innerHTML = Math.abs(
  //     age_dt.getUTCFullYear() - 1970
  //   );
  // };

  // this.StickyMenu = (navbar, sticky) => {
  //   var screenWidth = window.innerWidth; //(window.innerWidth > 0) ? window.innerWidth : screen.width;

  //   if (screenWidth >= 769) {
  //     if (window.pageYOffset > sticky) {
  //       navbar.classList.remove("menu");
  //       navbar.classList.add("sticky");
  //     } else {
  //       navbar.classList.remove("sticky");
  //       navbar.classList.add("menu");
  //     }
  //   }
  // };

  // this.CalcYrExp = () => {
  //   var diffMs = new Date() - new Date("2018-12-29");
  //   var totalExpDt = new Date(diffMs);

  //   document.getElementById("lblExp").innerHTML =
  //     Math.abs(totalExpDt.getUTCFullYear() - 1970) + "+";
  // };

  // this.showHideElem = (elem, isShown) => {
  //   if (isShown) {
  //     elem.style.visibility = "visible";
  //   } else {
  //     elem.style.visibility = "hidden";
  //   }
  // };

  // this.ChangeMode = () => {
  //   var body = document.querySelector("body").classList;
  //   var btnMode = document.getElementsByClassName("mode")[0];

  //   if (body.contains("dark-mode")) {
  //     document.documentElement.style.setProperty("--color-value", "#313e4f");
  //     document.documentElement.style.setProperty("--head-bg", "#fbf6f2");
  //     document.documentElement.style.setProperty("--card-color", "#eeeeee");
  //     document.documentElement.style.setProperty("--menu-color", "#eeeeee");
  //     document.documentElement.style.setProperty("--shade-color", "#4fc3f7");
  //     document.documentElement.style.setProperty("--btn-default", "#f1f1f1");
  //     document.documentElement.style.setProperty("--icon-default", "#fff");
  //     document.documentElement.style.setProperty("--icon-hover", "#084866");
  //     document.documentElement.style.setProperty("--a-hover", "whitesmoke");

  //     btnMode.children[0].className = "fas fa-moon";
  //     btnMode.parentElement.className = "change-mode light-active";

  //     body.remove("dark-mode");
  //     body.add("light-mode");
  //   } else {
  //     //set to dark mode
  //     document.documentElement.style.setProperty("--color-value", "#ffffff");
  //     document.documentElement.style.setProperty("--head-bg", "#272727");
  //     -document.documentElement.style.setProperty("--card-color","#1e242c");
  //     document.documentElement.style.setProperty("--menu-color", "#132132");
  //     document.documentElement.style.setProperty("--shade-color", "#0c74a3");
  //     document.documentElement.style.setProperty("--btn-default", "#0c74a3");
  //     document.documentElement.style.setProperty("--icon-default", "#084866");
  //     document.documentElement.style.setProperty("--icon-hover", "#fff");
  //     document.documentElement.style.setProperty("--a-hover", "#313e4f");

  //     btnMode.children[0].className = "far fa-lightbulb";
  //     btnMode.parentElement.className = "change-mode dark-active";

  //     body.remove("light-mode");
  //     body.add("dark-mode");
  //   }
  // };

  // function resizeEnd() {
  //   var navbar = document.getElementById("menu");
  //   var width = document.documentElement.clientWidth;

  //   if (new Date() - rtime < delta) {
  //     setTimeout(resizeEnd, delta);
  //   } else {
  //     timeout = false;
  //     _portfolio.ResizeWindow(width, navbar);
  //   }
  // }
}
