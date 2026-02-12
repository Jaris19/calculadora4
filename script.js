const billInput = document.getElementById("bill");
const peopleInput = document.getElementById("people");
const customInput = document.getElementById("custom");
const tipButtons = document.querySelectorAll(".tip-btn");
const tipAmount = document.getElementById("tipAmount");
const totalAmount = document.getElementById("totalAmount");
const resetBtn = document.getElementById("reset");

let tipPercent = 0;

function calculate() {
  const bill = parseFloat(billInput.value);
  const people = parseInt(peopleInput.value);

  if (!bill || !people || people <= 0 || !tipPercent) {
    tipAmount.textContent = "$0.00";
    totalAmount.textContent = "$0.00";
    return;
  }

  const tipTotal = bill * (tipPercent / 100);
  const total = bill + tipTotal;

  tipAmount.textContent = "$" + (tipTotal / people).toFixed(2);
  totalAmount.textContent = "$" + (total / people).toFixed(2);

  resetBtn.disabled = false;
}

tipButtons.forEach(button => {
  button.addEventListener("click", () => {
    tipButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    tipPercent = parseFloat(button.dataset.tip);
    customInput.value = "";
    calculate();
  });
});

customInput.addEventListener("input", () => {
  tipButtons.forEach(btn => btn.classList.remove("active"));
  tipPercent = parseFloat(customInput.value);
  calculate();
});

billInput.addEventListener("input", calculate);
peopleInput.addEventListener("input", calculate);

resetBtn.addEventListener("click", () => {
  billInput.value = "";
  peopleInput.value = "";
  customInput.value = "";
  tipPercent = 0;
  tipAmount.textContent = "$0.00";
  totalAmount.textContent = "$0.00";
  tipButtons.forEach(btn => btn.classList.remove("active"));
  resetBtn.disabled = true;
});
