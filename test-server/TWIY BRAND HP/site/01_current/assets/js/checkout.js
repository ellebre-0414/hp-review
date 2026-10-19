(() => {
  const form = document.getElementById("purchase-form");
  const review = document.getElementById("order-review");
  const reviewList = document.getElementById("review-list");
  const editButton = document.getElementById("edit-order");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const contactError = document.getElementById("contact-error");

  if (!form || !review || !reviewList) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    contactError.textContent = "";

    if (!email.value.trim() && !phone.value.trim()) {
      contactError.textContent = "メールアドレス、または電話番号のいずれかを入力してください。";
      email.focus();
      return;
    }

    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const contact = email.value.trim() || phone.value.trim();
    const rows = [
      ["氏名", data.get("customer-name")],
      ["郵便番号", data.get("postal-code")],
      ["配送先住所", data.get("address")],
      ["連絡先", contact],
      ["購入商品", document.getElementById("product").selectedOptions[0]?.textContent || ""],
      ["購入枚数", data.get("quantity") + "枚"],
      ["支払い方法", data.get("payment")]
    ];

    reviewList.replaceChildren();
    rows.forEach(([label, value]) => {
      const wrapper = document.createElement("div");
      const term = document.createElement("dt");
      const description = document.createElement("dd");
      term.textContent = label;
      description.textContent = value;
      wrapper.append(term, description);
      reviewList.append(wrapper);
    });

    form.hidden = true;
    review.hidden = false;
    review.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  editButton.addEventListener("click", () => {
    review.hidden = true;
    form.hidden = false;
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  });
})();
