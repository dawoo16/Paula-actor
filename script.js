"use strict";


/* ============================================================
   KONFIGURACJA GALERII

   Zdjęcia:
   image00001.jpeg
   image00002.jpeg
   ...
   image00009.jpeg
============================================================ */

const TOTAL_IMAGES = 11;


/*
   Automatyczne wygenerowanie listy zdjęć
*/

const galleryImages = Array.from(
    { length: TOTAL_IMAGES },
    (_, index) => {

        const number = String(index + 1).padStart(5, "0");

        return {
            src: `image${number}.jpeg`,
            alt: "Paula Willman"
        };

    }
);


/* ============================================================
   ELEMENTY GALERII
============================================================ */

const gallery =
    document.getElementById("gallery");

const leftSlide =
    document.getElementById("leftSlide");

const mainSlide =
    document.getElementById("mainSlide");

const rightSlide =
    document.getElementById("rightSlide");

const leftImage =
    document.getElementById("leftImage");

const centerImage =
    document.getElementById("centerImage");

const rightImage =
    document.getElementById("rightImage");

const previousButton =
    document.getElementById("previousButton");

const nextButton =
    document.getElementById("nextButton");


/* ============================================================
   MENU
============================================================ */

const menu =
    document.getElementById("menu");

const menuToggle =
    document.getElementById("menuToggle");

const menuClose =
    document.getElementById("menuClose");


/* ============================================================
   STARTOWE ZDJĘCIE

   Startujemy od image00002.jpeg,
   żeby od razu było:

   image1 ← image2 → image3
============================================================ */

let currentIndex =
    galleryImages.length > 1
        ? 1
        : 0;


let animationLocked = false;


/* ============================================================
   ZAPĘTLANIE INDEXU
============================================================ */

function getWrappedIndex(index) {

    return (
        index + galleryImages.length
    ) % galleryImages.length;

}


/* ============================================================
   USTAWIANIE ZDJĘCIA
============================================================ */

function setImage(
    element,
    imageData,
    isDecorative = false
) {

    if (!imageData) {
        return;
    }

    element.src = imageData.src;

    element.alt =
        isDecorative
            ? ""
            : imageData.alt;

}


/* ============================================================
   RENDER KARUZELI
============================================================ */

function renderGallery() {

    if (galleryImages.length === 0) {
        return;
    }


    const previousIndex =
        getWrappedIndex(currentIndex - 1);

    const nextIndex =
        getWrappedIndex(currentIndex + 1);


    /* GŁÓWNE ZDJĘCIE */

    setImage(
        centerImage,
        galleryImages[currentIndex]
    );


    /* LEWE ZDJĘCIE */

    setImage(
        leftImage,
        galleryImages[previousIndex],
        true
    );


    /* PRAWE ZDJĘCIE */

    setImage(
        rightImage,
        galleryImages[nextIndex],
        true
    );


    /*
       Ponieważ karuzela jest nieskończona,
       strzałki zawsze są aktywne.
    */

    previousButton.disabled = false;
    nextButton.disabled = false;


    /*
       Na wszelki wypadek usuwamy klasy
       odpowiedzialne za ukrycie boków.
    */

    leftSlide.classList.remove("is-empty");
    rightSlide.classList.remove("is-empty");


    preloadNearbyImages();
}


/* ============================================================
   ZMIANA SLAJDU
============================================================ */

function changeSlide(direction) {

    if (animationLocked) {
        return;
    }

    animationLocked = true;


    mainSlide.classList.add(
        "is-changing"
    );


    window.setTimeout(
        () => {

            currentIndex =
                getWrappedIndex(
                    currentIndex + direction
                );


            renderGallery();


            requestAnimationFrame(
                () => {

                    mainSlide.classList.remove(
                        "is-changing"
                    );

                }
            );


            window.setTimeout(
                () => {

                    animationLocked = false;

                },
                300
            );

        },
        150
    );

}


/* ============================================================
   STRZAŁKA W LEWO
============================================================ */

previousButton.addEventListener(
    "click",
    () => {

        changeSlide(-1);

    }
);


/* ============================================================
   STRZAŁKA W PRAWO
============================================================ */

nextButton.addEventListener(
    "click",
    () => {

        changeSlide(1);

    }
);


/* ============================================================
   KLAWIATURA
============================================================ */

document.addEventListener(
    "keydown",
    event => {

        /*
           Jeśli menu jest otwarte,
           strzałki nie zmieniają zdjęć.
        */

        if (
            menu &&
            menu.classList.contains("is-open")
        ) {
            return;
        }


        if (event.key === "ArrowLeft") {

            changeSlide(-1);

        }


        if (event.key === "ArrowRight") {

            changeSlide(1);

        }

    }
);


/* ============================================================
   SWIPE NA TELEFONIE
============================================================ */

let touchStartX = 0;
let touchStartY = 0;


gallery.addEventListener(
    "touchstart",
    event => {

        const touch =
            event.changedTouches[0];

        touchStartX =
            touch.clientX;

        touchStartY =
            touch.clientY;

    },
    {
        passive: true
    }
);


gallery.addEventListener(
    "touchend",
    event => {

        const touch =
            event.changedTouches[0];


        const deltaX =
            touchStartX - touch.clientX;

        const deltaY =
            touchStartY - touch.clientY;


        /*
           Jeśli użytkownik przewija pionowo,
           nie ruszamy galerii.
        */

        if (
            Math.abs(deltaY) >
            Math.abs(deltaX)
        ) {
            return;
        }


        /*
           Ignorujemy małe ruchy.
        */

        if (
            Math.abs(deltaX) < 45
        ) {
            return;
        }


        /*
           Swipe w lewo
           = następne zdjęcie
        */

        if (deltaX > 0) {

            changeSlide(1);

        }

        /*
           Swipe w prawo
           = poprzednie zdjęcie
        */

        else {

            changeSlide(-1);

        }

    },
    {
        passive: true
    }
);


/* ============================================================
   PRELOAD ZDJĘĆ
============================================================ */

const preloadedImages =
    new Set();


function preloadImage(index) {

    const wrappedIndex =
        getWrappedIndex(index);


    const src =
        galleryImages[wrappedIndex].src;


    if (
        preloadedImages.has(src)
    ) {
        return;
    }


    const image =
        new Image();


    image.src = src;


    preloadedImages.add(src);

}


function preloadNearbyImages() {

    preloadImage(
        currentIndex - 2
    );

    preloadImage(
        currentIndex - 1
    );

    preloadImage(
        currentIndex
    );

    preloadImage(
        currentIndex + 1
    );

    preloadImage(
        currentIndex + 2
    );

}


/* ============================================================
   MENU
============================================================ */

function openMenu() {

    if (!menu) {
        return;
    }


    menu.classList.add(
        "is-open"
    );


    menu.setAttribute(
        "aria-hidden",
        "false"
    );


    if (menuToggle) {

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

    }


    document.body.style.overflow =
        "hidden";

}


function closeMenu() {

    if (!menu) {
        return;
    }


    menu.classList.remove(
        "is-open"
    );


    menu.setAttribute(
        "aria-hidden",
        "true"
    );


    if (menuToggle) {

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    document.body.style.overflow =
        "";

}


if (menuToggle) {

    menuToggle.addEventListener(
        "click",
        openMenu
    );

}


if (menuClose) {

    menuClose.addEventListener(
        "click",
        closeMenu
    );

}


if (menu) {

    menu
        .querySelectorAll("a")
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    closeMenu
                );

            }
        );

}


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            menu &&
            menu.classList.contains("is-open")
        ) {

            closeMenu();

        }

    }
);


/* ============================================================
   COPYRIGHT
============================================================ */

const year =
    document.getElementById("year");


if (year) {

    year.textContent =
        new Date().getFullYear();

}


/* ============================================================
   START
============================================================ */

renderGallery();
