export function showfeedback(message, type) {
  const icons = {
    success: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#fff"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>`,
    error: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#fff"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>`,
  };

  const feedback = document.getElementById("options__feedback");
  const messageSpan = feedback.querySelector(".message");
  const iconSpan = feedback.querySelector(".icon");

  iconSpan.innerHTML = icons[type];
  messageSpan.textContent = message;

  feedback.className = `options__feedback ${type} show`;

  clearTimeout(feedback.hideTimeout);
  feedback.hideTimeout = setTimeout(() => {
    feedback.classList.remove("show");
  }, 3000);

  feedback.onclick = () => {
    feedback.classList.remove("show");
    clearTimeout(feedback.hideTimeout);
  };
}
