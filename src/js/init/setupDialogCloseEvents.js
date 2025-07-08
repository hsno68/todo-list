export default function setupDialogCloseEvents({ cancelButton, closeButton, dialog }) {
  cancelButton.addEventListener("click", () => dialog.close());
  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
}