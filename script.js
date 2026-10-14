(() => {
  "use strict";
  const input = document.getElementById("project-search");
  const buttons = Array.from(document.querySelectorAll("[data-filter]"));
  const cards = Array.from(document.querySelectorAll(".project-card"));
  const count = document.getElementById("result-count");
  const empty = document.getElementById("empty-state");
  let category = "all";
  const searchText = new Map(cards.map((card) => [card, card.textContent.toLowerCase()]));
  function render() {
    const query = input.value.trim().toLowerCase();
    let visible = 0;
    for (const card of cards) {
      const show =
        (category === "all" || card.dataset.kind === category) &&
        searchText.get(card).includes(query);
      card.hidden = !show;
      if (show) visible++;
    }
    count.textContent = `${visible} project${visible === 1 ? "" : "s"}`;
    empty.hidden = visible !== 0;
    buttons.forEach((button) =>
      button.setAttribute("aria-pressed", String(button.dataset.filter === category)),
    );
  }
  input.addEventListener("input", render);
  buttons.forEach((button) =>
    button.addEventListener("click", () => {
      category = button.dataset.filter;
      render();
    }),
  );
  document.getElementById("reset-filters").addEventListener("click", () => {
    category = "all";
    input.value = "";
    render();
    input.focus();
  });
  render();
})();
