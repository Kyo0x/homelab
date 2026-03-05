function initCheckboxes() {
  const pageKey = "checklist:" + window.location.pathname;

  // Restore saved state
  const saved = JSON.parse(localStorage.getItem(pageKey) || "{}");
  document.querySelectorAll(".task-list-item input[type='checkbox']").forEach((box, i) => {
    box.removeAttribute("disabled");
    if (saved[i]) box.checked = true;

    box.addEventListener("change", () => {
      const state = {};
      document.querySelectorAll(".task-list-item input[type='checkbox']").forEach((b, j) => {
        state[j] = b.checked;
      });
      localStorage.setItem(pageKey, JSON.stringify(state));
    });
  });
}

// MkDocs Material with navigation.instant uses a reactive document$ observable.
// DOMContentLoaded only fires once — document$ fires on every page navigation.
if (typeof document$ !== "undefined") {
  document$.subscribe(initCheckboxes);
} else {
  document.addEventListener("DOMContentLoaded", initCheckboxes);
}
