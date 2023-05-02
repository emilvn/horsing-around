import { submitCreateForm } from "../submit/submit.js";
/* ========== CREATE DIALOG ========== */
export function showCreateDialog() {
  const form = document.querySelector("#create-form");
  form.parentElement.showModal();
  form.addEventListener("submit", submitCreateForm);
  form.querySelector("#create-cancel-btn").addEventListener("click", () => {
    form.removeEventListener("submit", submitCreateForm);
    form.parentElement.close();
    form.reset();
  });
}