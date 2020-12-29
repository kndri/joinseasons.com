const emailCapture = document.querySelectorAll(".js-email-capture");

/**
 * @function isEmail
 * @description Validates email
 * @param str
 */
const isEmail = (str) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(str).toLowerCase());
};

/**
 * @function captureEmail
 * @description Fires on successful submit
 * @param form
 * @param event
 */
const captureEmail = (form) => {
  const emailContainer = form.querySelector(".js-email-capture-email");
  const submitContainer = form.querySelector(".js-email-capture-submit");
  const errorContainer = form.querySelector(".js-email-capture-error");

  // Get field input
  const email = form.querySelector(".js-email-capture-text").value;

  // Regex Test if email valid
  if (email && isEmail(email)) {
    // Fire event off to SendGrid
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        console.log(this.responseText);
      }
    });

    var data = JSON.stringify({
      list_ids: ["81258f03-8346-4823-8a24-91ba5910f6a8"],
      contacts: [
        {
          email: email
        }
      ]
    });

    xhr.open("PUT", "https://api.sendgrid.com/v3/marketing/contacts");
    xhr.setRequestHeader(
      "authorization",
      "Bearer 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"
    );
    xhr.setRequestHeader("content-type", "application/json");

    xhr.send(data);

    const successContainer = form.querySelector(".js-email-capture-success");
    successContainer.classList.add("is-visible");
    errorContainer.classList.remove("is-visible");
    emailContainer.classList.add("is-hidden");
    submitContainer.classList.add("is-hidden");
    errorContainer.classList.add("is-hidden");
  } else if (!isEmail(email)) {
    errorContainer.classList.add("is-visible");
    emailContainer.classList.add("has-error");
  } else {
    emailContainer.classList.add("has-error");
    errorContainer.classList.add("is-visible");
  }
};

emailCapture.forEach((item) => {
  const emailSubmitBtn = item.querySelector(".js-email-capture-submit");

  emailSubmitBtn.addEventListener("click", () => {
    captureEmail(item);
  });
});
