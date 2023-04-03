"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // tabs

  const tabs = document.querySelectorAll(".tabheader__item");
  const tabsContents = document.querySelectorAll(".tabcontent");
  const tabsParent = document.querySelector(".tabheader__items");

  function hideTabsContents() {
    tabsContents.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabsContents(i = 0) {
    tabsContents[i].classList.add("show", "fade");
    tabsContents[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabsContents();
  showTabsContents();

  tabsParent.addEventListener("click", (event) => {
    const { target } = event;
    if (target && target.classList.contains("tabheader__item")) {
      console.log("go");
      tabs.forEach((item, i) => {
        if (target === item) {
          hideTabsContents();
          showTabsContents(i);
        }
      });
    }
  });

  // timer
  const deadline = "2023-03-30";

  function getTimeRemaining(end) {
    const time = Date.parse(end) - Date.parse(new Date());
    if (time <= 0)
      return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };

    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const seconds = Math.floor((time / 1000) % 60);

    return {
      total: time,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  function addO(num) {
    if (num > 0 && num < 10) {
      return `0${num}`;
    }
    return num;
  }

  function setClock(selectors, end) {
    const timerBlock = document.querySelector(selectors[0]);
    const days = document.querySelector(selectors[1]);
    const hours = document.querySelector(selectors[2]);
    const minutes = document.querySelector(selectors[3]);
    const seconds = document.querySelector(selectors[4]);
    const timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const time = getTimeRemaining(end);

      days.innerHTML = addO(time.days);
      hours.innerHTML = addO(time.hours);
      minutes.innerHTML = addO(time.minutes);
      seconds.innerHTML = addO(time.seconds);

      if (time.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock([".timer", "#days", "#hours", "#minutes", "#seconds"], deadline);

  // modal

  const modalTrigger = document.querySelectorAll("[data-modal]");
  const modal = document.querySelector(".modal");

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearTimeout(modalTimerId);
  }

  modalTrigger.forEach((button) => {
    button.addEventListener("click", openModal);
  });

  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") === "") {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      console.log("escape");
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 50000);

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);

  // use classes for cards

  class MenuCard {
    constructor(
      src,
      alt,
      title,
      description,
      price,
      parentSelector,
      ...classes
    ) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.description = description;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.currency = 39;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.currency;
    }

    render() {
      const element = document.createElement("div");
      if (this.classes.length === 0) {
        this.element = "menu__item";
        element.classList.add(this.element);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }
      element.innerHTML = `
            <img src=${this.src} alt=${this.alt} /> 
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">
              ${this.description}
            </div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
      `;

      this.parent.append(element);
    }
  }

  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    ".menu .container"
  ).render();

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    "Меню “Премиум”",
    "В меню “Премиум” - мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
    14,
    ".menu .container"
  ).render();

  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков!",
    21,
    ".menu .container"
  ).render();

  const url = "http://127.0.0.1:3002/users";
  const forms = document.querySelectorAll("form");
  const message = {
    load: "img/form/spinner.svg",
    success: "success",
    failure: "failure",
  };

  forms.forEach((item) => postData(item));

  function postData(form) {
    const { load, success, failure } = message;
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = load;
      statusMessage.style.cssText = `
      display: block;
      margin: 0 auto;
      `;
      // form.append(statusMessage);
      form.insertAdjacentElement("afterend", statusMessage);

      const request = new XMLHttpRequest();
      request.open("POST", url, true);

      // request.setRequestHeader("Content-type", "application/json");
      const formData = new FormData(form);
      request.send(formData);

      // const object = {};
      // formData.forEach((value, key) => {
      //   object[key] = value;
      // });

      // console.log(object);

      // const json = JSON.stringify(object);
      // console.log(json);
      // request.send(json);

      request.addEventListener("readystatechange", () => {
        if (request.status === 200 || request.readyState === 4) {
          showThanksModal(success);
          form.reset();
          statusMessage.remove();
          console.log(request);
        } else {
          showThanksModal(failure);
        }
      });
    });
  }

  function showThanksModal(message) {
    const modalDialog = document.querySelector(".modal__dialog");

    modalDialog.classList.add("hide");
    openModal();

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
      </div>`;

    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      modalDialog.classList.add("show");
      modalDialog.classList.remove("hide");
      closeModal();
    }, 4000);
  }
});
