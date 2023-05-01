"use strict";

/* ========== SUCCESS/ERROR TOAST MESSAGE ========== */
//type is success or error
export function showToastMessage(message, type) {
    const toastContainer = document.querySelector("#toast-container");
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.classList.add("toast", type);
    toastContainer.appendChild(toast);

    setTimeout(() => {
            toastContainer.removeChild(toast);
            }, 3000);
}