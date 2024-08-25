"use strict;";
$(window).on("load", function () {
  /*Preloader*/
  $(".loader").fadeOut();
  $(".preloader").delay(400).fadeOut("slow");
});

(function ($) {
  $(".fafabar").on("click", function (event) {
    $(this).toggleClass("active");
    $(".navigation").slideToggle(400);
    event.preventDefault();
  });

  $(".set-bg").each(function () {
    var bg = $(this).data("setbg");
    $(this).css("background-image", "url(" + bg + ")");
  });

  /*Figure counter*/
  $(document).ready(function () {
    $(".counter").counterUp({
      delay: 10,
      time: 700,
    });
  });
})(jQuery);

var coll = document.getElementsByClassName("collapsible");
var i;
for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

/*Apply Form*/

var modal = document.getElementById("form");
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

/*Form validation */
const form = document.querySelector("form");
nameField = form.querySelector(".name"),
  nameInput = nameField.querySelector("input");
emailField = form.querySelector(".email"),
  emailInput = emailField.querySelector("input"),
  contactField = form.querySelector(".contact"),
  contactInput = contactField.querySelector("input");
addressField = form.querySelector(".address"),
  addressInput = addressField.querySelector("input");

form.onsubmit = (e) => {
  e.preventDefault();

  (nameInput.value == "") ? nameField.classList.add("shake", "error") : checkName();
  (emailInput.value == "") ? emailField.classList.add("shake", "error") : checkEmail();
  (contactInput.value == "") ? contactField.classList.add("shake", "error") : checkContact();
  (addressInput.value == "") ? addressField.classList.add("shake", "error") : checkAddress();

  setTimeout(() => {
    nameField.classList.remove("shake");
    emailField.classList.remove("shake");
    contactField.classList.remove("shake");
    addressField.classList.remove("shake");
  }, 500);

  nameInput.onkeyup = () => { checkName(); }
  emailInput.onkeyup = () => { checkEmail(); }
  contactInput.onkeyup = () => { checkContact(); }
  addressInput.onkeyup = () => { checkAddress(); }


  function checkName() {
    if (nameInput.value == "") {
      nameField.classList.add("error");
      nameField.classList.remove("valid");
    } else {
      nameField.classList.remove("error");
      nameField.classList.add("valid");
    }
  }


  function checkEmail() {
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailInput.value.match(pattern)) {
      emailField.classList.add("error");
      emailField.classList.remove("valid");
      let errorTxt = emailField.querySelector(".error-txt");

      (emailInput.value != "") ? errorTxt.innerText = "Enter a valid email address" : errorTxt.innerText = "Email can't be blank";
    } else {
      emailField.classList.remove("error");
      emailField.classList.add("valid");
    }
  }

  function checkContact() {
    let pattern = /^\d*(?:.\d{1,2})?$/;
    if (!contactInput.value.match(pattern)) {
      contactField.classList.add("error");
      contactField.classList.remove("valid");
      let errorTxt = contactField.querySelector(".error-txt");

      (contactInput.value != "") ? errorTxt.innerText = "Enter a valid Contact Number" : errorTxt.innerText = "Contact Number can't be blank";
    } else {
      contactField.classList.remove("error");
      contactField.classList.add("valid");
    }
  }

  function checkAddress() {
    if (addressInput.value == "") {
      addressField.classList.add("error");
      addressField.classList.remove("valid");
    } else {
      addressField.classList.remove("error");
      addressField.classList.add("valid");
    }
  }


  if (!nameField.classList.contains("error") && !emailField.classList.contains("error") && !contactField.classList.contains("error") && !addressField.classList.contains("error")) {
    alert("Form submitted!");
  }

}


/*image Slider*/
const slider = document.querySelector(".banner-slider");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const slide = document.querySelectorAll(".slide");

const numberOfSlides = slide.length;
var slideNumber = 0;

/*next button*/
nextBtn.addEventListener("click", () => {
  slide.forEach((slide) => {
    slide.classList.remove("active");
  });

  slideNumber++;

  if (slideNumber > numberOfSlides - 1) {
    slideNumber = 0;
  }

  slide[slideNumber].classList.add("active");
});




/*Notify Email Verfication*/
function emailVerify() {
  const err = document.getElementById("err-msg");
  err.innerHTML = "";
  let mail = document.getElementById("email-add").value;
  let val = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (mail == "") {
    alert("Please fill in your email!");
  } else if (!val.test(mail)) {
    alert("Please enter a valid email!");
  } else {
    alert("Your email notifications is activated, thank you!");
    window.location.reload();
  }
}

/*XML General*/
function loadGeneral() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
      var table =
        "<tr><th>SUBJECT</th><th>MIN.REQUIREMENT</th><th>REMARK</th></tr>";

      for (i in myObj.GENERAL) {
        table +=
          "<tr><td>" +
          myObj.GENERAL[i].SUBJECT +
          "</td><td>" +
          myObj.GENERAL[i].MINR +
          "</td><td>" +
          myObj.GENERAL[i].REMARK +
          "</td></tr>";
      }
      document.getElementById("general").innerHTML = table;
    }
  };
  xmlhttp.open("GET", "general.json", true);
  xmlhttp.send();
}

/*XML English*/
function loadLang() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
      var table = "<tr><th>STUDENT</th><th>EXAM</th><th>MARKS</th></tr>";

      for (i in myObj.ENG) {
        table +=
          "<tr><td>" +
          myObj.ENG[i].STUDENT +
          "</td><td>" +
          myObj.ENG[i].EXAM +
          "</td><td>" +
          myObj.ENG[i].MARKS +
          "</td></tr>";
      }
      document.getElementById("lang").innerHTML = table;
    }
  };
  xmlhttp.open("GET", "lang.json", true);
  xmlhttp.send();
}

/*previous button*/
prevBtn.addEventListener("click", () => {
  slide.forEach((slide) => {
    slide.classList.remove("active");
  });

  slideNumber--;

  if (slideNumber < 0) {
    slideNumber = numberOfSlides - 1;
  }

  slide[slideNumber].classList.add("active");
});

/*autoplay*/
var autoplay;
var repeater = () => {
  autoplay = setInterval(function () {
    slide.forEach((slide) => {
      slide.classList.remove("active");
    });

    slideNumber++;

    if (slideNumber > numberOfSlides - 1) {
      slideNumber = 0;
    }

    slide[slideNumber].classList.add("active");
  }, 3000);
};
repeater();

slider.addEventListener("mouseover", () => {
  clearInterval(autoplay);
});

slider.addEventListener("mouseout", () => {
  repeater();
});
