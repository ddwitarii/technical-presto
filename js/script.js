
/* ==================================================
   TECHNICAL PRESTO
   MAIN JAVASCRIPT
================================================== */


/* =========================
   01. INITIALIZATION
========================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeNavbar();
    initializeFooter();

    initializeMobileMenu();
    initializeActiveNavigation();

    initializeFAQ();
    initializeContactForm();
    initializeSuccessMessage();

    initializeCheckout();

    console.log(
        "%cTECHNICAL PRESTO",
        "color: #B68CFF; font-size: 20px; font-weight: bold;"
    );

    console.log(
        "Exploring music through technology and creativity."
    );

});


/* =========================
   02. GLOBAL NAVIGATION
========================= */

function initializeNavbar() {

    const navbar = document.getElementById("navbar");

    if (!navbar) return;

    navbar.innerHTML = `

        <nav class="navigation container">

            <a
                href="index.html"
                class="logo"
                aria-label="Technical Presto Home"
            >
                TECHNICAL<span>PRESTO.</span>
            </a>

            <div
                class="nav-links"
                id="nav-links"
            >

                <a href="index.html">Home</a>

                <a href="about.html">About</a>

                <a href="shop.html">Shop</a>

                <a href="privacy.html">Privacy</a>

            </div>

            <a
                href="shop.html"
                class="nav-cta"
            >
                Get Started
            </a>

            <button
                class="menu-toggle"
                type="button"
                aria-label="Open navigation menu"
                aria-expanded="false"
                aria-controls="nav-links"
            >
                ☰
            </button>

        </nav>

    `;

}


/* =========================
   03. GLOBAL FOOTER
========================= */

function initializeFooter() {

    const footer = document.getElementById("footer");

    if (!footer) return;

    const currentYear = new Date().getFullYear();

    footer.innerHTML = `

        <div class="footer-content container">

            <div class="footer-brand">

                <a
                    href="index.html"
                    class="logo"
                    aria-label="Technical Presto Home"
                >
                    TECHNICAL<span>PRESTO.</span>
                </a>

                <p>
                    Exploring the future of music sharing,
                    powered by artificial intelligence
                    and cloud technology.
                </p>

            </div>

            <div class="footer-links">

                <a href="index.html">Home</a>

                <a href="about.html">About</a>

                <a href="shop.html">Shop</a>

                <a href="privacy.html">Privacy Policy</a>

            </div>

            <p class="copyright">
                © ${currentYear} Technical Presto.
                All rights reserved.
            </p>

        </div>

    `;

}


/* =========================
   04. MOBILE NAVIGATION
========================= */

function initializeMobileMenu() {

    const menuToggle = document.querySelector(".menu-toggle");

    const navLinks = document.querySelector(".nav-links");

    if (!menuToggle || !navLinks) return;


    function openMenu() {

        navLinks.classList.add("active");

        menuToggle.setAttribute("aria-expanded", "true");

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

        menuToggle.textContent = "✕";

    }


    function closeMenu(returnFocus = false) {

        const wasOpen = navLinks.classList.contains("active");

        navLinks.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        menuToggle.textContent = "☰";

        if (returnFocus && wasOpen) {

            menuToggle.focus();

        }

    }


    // TOGGLE MENU

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.contains("active");

        if (isOpen) {

            closeMenu();

        } else {

            openMenu();

        }

    });


    // CLOSE AFTER CLICKING A NAVIGATION LINK

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            closeMenu();

        });

    });


    // CLOSE WHEN CLICKING OUTSIDE

    document.addEventListener("click", event => {

        const clickedInsideMenu = navLinks.contains(event.target);

        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {

            closeMenu();

        }

    });


    // CLOSE WHEN PRESSING ESCAPE

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            navLinks.classList.contains("active")
        ) {

            closeMenu(true);

        }

    });


    // CLOSE WHEN RESIZING TO DESKTOP

    window.addEventListener("resize", () => {

        if (window.innerWidth > 768) {

            closeMenu();

        }

    });

}


/* =========================
   05. ACTIVE NAVIGATION
========================= */

function initializeActiveNavigation() {

    let currentPage = window.location.pathname
        .split("/")
        .pop();

    if (!currentPage) {

        currentPage = "index.html";

    }


    const navLinks = document.querySelectorAll(
        ".nav-links a"
    );


    navLinks.forEach(link => {

        const linkPage = link.getAttribute("href");

        const isCurrentPage = linkPage === currentPage;

        link.classList.toggle("active", isCurrentPage);

        if (isCurrentPage) {

            link.setAttribute("aria-current", "page");

        } else {

            link.removeAttribute("aria-current");

        }

    });

}


/* =========================
   06. FAQ ACCORDION
========================= */

function initializeFAQ() {

    const faqItems = document.querySelectorAll(
        ".faq-list details"
    );

    if (!faqItems.length) return;


    faqItems.forEach(item => {

        item.addEventListener("toggle", () => {

            if (!item.open) return;

            faqItems.forEach(otherItem => {

                if (
                    otherItem !== item &&
                    otherItem.open
                ) {

                    otherItem.open = false;

                }

            });

        });

    });

}


/* =========================
   07. CONTACT FORM
========================= */

function initializeContactForm() {

    const contactForm = document.querySelector(
        'form[name="contact"]'
    );

    if (!contactForm) return;


    contactForm.addEventListener("submit", event => {

        // PREVENT DUPLICATE SUBMISSION

        if (contactForm.dataset.submitting === "true") {

            event.preventDefault();

            return;

        }


        const name = contactForm.querySelector(
            '[name="name"]'
        );

        const email = contactForm.querySelector(
            '[name="email"]'
        );

        const message = contactForm.querySelector(
            '[name="message"]'
        );

        const plan = contactForm.querySelector(
            '[name="plan"]'
        );


        // CHECK REQUIRED FORM FIELDS

        if (!name || !email || !message) {

            event.preventDefault();

            console.error(
                "Contact form fields are incomplete."
            );

            return;

        }


        // CHECK EMPTY VALUES

        if (
            !name.value.trim() ||
            !email.value.trim() ||
            !message.value.trim()
        ) {

            event.preventDefault();

            alert(
                "Please complete all required fields."
            );

            return;

        }


        // VALIDATE EMAIL FORMAT

        if (!email.checkValidity()) {

            event.preventDefault();

            alert(
                "Please enter a valid email address."
            );

            email.focus();

            return;

        }


        // VALIDATE PLAN IF REQUIRED

        if (plan && plan.required && !plan.value.trim()) {

            event.preventDefault();

            alert(
                "Please select a plan."
            );

            plan.focus();

            return;

        }


        // CHECK MESSAGE LENGTH

        if (message.value.trim().length < 10) {

            event.preventDefault();

            alert(
                "Please enter a message with at least 10 characters."
            );

            message.focus();

            return;

        }


        // MARK FORM AS SUBMITTING

        contactForm.dataset.submitting = "true";


        // DISABLE SUBMIT BUTTON

        const submitButton = contactForm.querySelector(
            'button[type="submit"], input[type="submit"]'
        );

        if (submitButton) {

            submitButton.disabled = true;

        }


        console.log(
            "Contact form validation successful."
        );

        // Netlify handles the actual form submission.

    });

}


/* =========================
   08. FORM SUCCESS MESSAGE
========================= */

function initializeSuccessMessage() {

    const urlParams = new URLSearchParams(
        window.location.search
    );

    const isSuccess = urlParams.get("success");


    if (isSuccess !== "true") return;


    const contactSection = document.querySelector(
        "#contact"
    );

    if (!contactSection) return;


    // GET EXISTING SUCCESS MESSAGE OR CREATE ONE

    let successMessage = contactSection.querySelector(
        ".form-success"
    );


    if (!successMessage) {

        successMessage = document.createElement("div");

        successMessage.className = "form-success";

        successMessage.innerHTML = `

            <strong>Message received!</strong>

            <p>
                Thank you for contacting Technical Presto.
                Your message has been submitted successfully.
            </p>

        `;

        const contactForm = contactSection.querySelector("form");

        if (contactForm) {

            contactForm.before(successMessage);

        } else {

            contactSection.prepend(successMessage);

        }

    }


    // MAKE SUCCESS MESSAGE VISIBLE

    successMessage.hidden = false;

    successMessage.setAttribute("role", "status");

    successMessage.setAttribute("aria-live", "polite");


    // REMOVE SUCCESS PARAMETER FROM URL

    window.history.replaceState(
        {},
        document.title,
        window.location.pathname + window.location.hash
    );

}


/* =========================
   09. CHECKOUT PAGE
========================= */

function initializeCheckout() {

    const checkoutForm = document.getElementById("checkout-form");

    if (!checkoutForm) return;


    // CHECKOUT ELEMENTS

    const planSelect = document.getElementById("selected-plan");

    const summaryPlanName = document.getElementById("summary-plan-name");

    const summaryPlan = document.getElementById("summary-plan");

    const summaryPeriod = document.getElementById("summary-period");

    const summaryPrice = document.getElementById("summary-price");

    const summaryPricePeriod = document.getElementById("summary-price-period");

    const checkoutSection = document.querySelector(".checkout-section");

    const successSection = document.getElementById("checkout-success");

    const successPlan = document.getElementById("success-plan");

    const customerName = document.getElementById("customer-name");

    const customerEmail = document.getElementById("customer-email");


    // CHECK REQUIRED ELEMENTS

    if (
        !planSelect ||
        !summaryPlanName ||
        !summaryPlan ||
        !summaryPeriod ||
        !summaryPrice ||
        !summaryPricePeriod ||
        !checkoutSection ||
        !successSection ||
        !successPlan ||
        !customerName ||
        !customerEmail
    ) {

        console.error(
            "Checkout page elements are incomplete."
        );

        return;

    }


    // PLAN INFORMATION

    const plans = {

        Free: {

            name: "Free Plan",

            price: "$0",

            period: "Free",

            pricePeriod: "forever",

            description:
                "Start exploring music and creativity for free."

        },

        Creator: {

            name: "Creator Plan",

            price: "$4.99",

            period: "Monthly",

            pricePeriod: "/ month",

            description:
                "Your creative journey starts here."

        },

        Pro: {

            name: "Pro Plan",

            price: "$9.99",

            period: "Monthly",

            pricePeriod: "/ month",

            description:
                "Unlock more possibilities for your music experience."

        }

    };


    // GET SELECTED PLAN FROM URL

    const urlParams = new URLSearchParams(
        window.location.search
    );

    const requestedPlan = urlParams.get("plan");


    if (
        requestedPlan &&
        Object.prototype.hasOwnProperty.call(
            plans,
            requestedPlan
        )
    ) {

        planSelect.value = requestedPlan;

    }


    // UPDATE ORDER SUMMARY

    function updateOrderSummary() {

        const selectedPlan = plans[planSelect.value];

        if (!selectedPlan) return;


        summaryPlanName.textContent = selectedPlan.name;

        summaryPlan.textContent = planSelect.value;

        summaryPeriod.textContent = selectedPlan.period;

        summaryPrice.textContent = selectedPlan.price;

        summaryPricePeriod.textContent = selectedPlan.pricePeriod;


        const description = document.querySelector(
            ".summary-description"
        );

        if (description) {

            description.textContent = selectedPlan.description;

        }

    }


    // LISTEN FOR PLAN CHANGES

    planSelect.addEventListener(
        "change",
        updateOrderSummary
    );


    // INITIAL SUMMARY

    updateOrderSummary();


    // HANDLE DEMO CHECKOUT

    checkoutForm.addEventListener("submit", event => {

        event.preventDefault();


        // PREVENT DUPLICATE SUBMISSION

        if (checkoutForm.dataset.submitting === "true") {

            return;

        }


        // VALIDATE FORM

        if (!checkoutForm.reportValidity()) {

            return;

        }


        const customerNameValue = customerName.value.trim();

        const customerEmailValue = customerEmail.value.trim();

        const selectedPlan = planSelect.value;

        const paymentMethod = checkoutForm.querySelector(
            'input[name="payment"]:checked'
        );


        // CHECK CUSTOMER INFORMATION

        if (!customerNameValue || !customerEmailValue) {

            alert(
                "Please complete your personal information."
            );

            return;

        }


        // CHECK EMAIL FORMAT

        if (!customerEmail.checkValidity()) {

            alert(
                "Please enter a valid email address."
            );

            customerEmail.focus();

            return;

        }


        // CHECK PAYMENT METHOD

        if (!paymentMethod) {

            alert(
                "Please select a payment method."
            );

            return;

        }


        // CHECK SELECTED PLAN

        if (!Object.prototype.hasOwnProperty.call(plans, selectedPlan)) {

            alert(
                "Please select a valid plan."
            );

            return;

        }


        // UPDATE SUCCESS INFORMATION

        successPlan.textContent = plans[selectedPlan].name;


        // MARK CHECKOUT AS COMPLETED

        checkoutForm.dataset.submitting = "true";


        // HIDE CHECKOUT SECTION

        checkoutSection.hidden = true;


        // SHOW SUCCESS SECTION

        successSection.hidden = false;


        // SCROLL TO SUCCESS MESSAGE

        successSection.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });


        // DEMO CHECKOUT INFORMATION

        console.log(
            "Technical Presto demo checkout completed."
        );

        console.log(
            "Selected plan:",
            selectedPlan
        );

        // This is a demonstration only.
        // No real payment is processed.
        // Customer information is not stored.

    });

}