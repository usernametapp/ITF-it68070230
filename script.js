let accountBalance = 0;
let cashBalance = 0;

function $(id) {
  const el = document.getElementById(id);
  if (!el) console.error(`Missing element #${id}`);
  return el;
}

function toAmount(v) {
  const n = Number(String(v ?? "").trim());
  return Number.isFinite(n) ? n : NaN;
}

function logAction(message) {
  const logBox = $("log");
  if (!logBox) return;
  logBox.value += (logBox.value ? "\n" : "") + message;
  logBox.scrollTop = logBox.scrollHeight;
}

function render() {
  const accEl = $("acc_input");
  const cashEl = $("cash_input");
  if (accEl) accEl.value = accountBalance;
  if (cashEl) cashEl.value = cashBalance;
}

function updateBalance() {
  const accVal = toAmount($("acc_input").value);
  const cashVal = toAmount($("cash_input").value);

  if (!Number.isFinite(accVal) || accVal < 0) {
    logAction("Invalid account balance input.");
    return;
  }
  if (!Number.isFinite(cashVal) || cashVal < 0) {
    logAction("Invalid cash balance input.");
    return;
  }

  accountBalance = accVal;
  cashBalance = cashVal;
  logAction(`Balance updated --> Account: ${accountBalance}, Cash: ${cashBalance}`);
  render();
}

function proceedOperation() {
  const operation = $("myDropdown1")?.value;
  const amount = toAmount($("proceed_input").value);

  if (!operation) {
    logAction("Choose an operation first.");
    return;
  }
  if (!Number.isFinite(amount) || amount <= 0) {
    logAction("Enter a valid amount greater than 0.");
    return;
  }

  if (operation === "deposit") {
    if (cashBalance >= amount) {
      cashBalance -= amount;
      accountBalance += amount;
      logAction(`Deposit ${amount} --> Account: ${accountBalance}, Cash: ${cashBalance}`);
    } else {
      logAction("Not enough cash to deposit.");
    }
  } else if (operation === "withdraw") {
    if (accountBalance >= amount) {
      accountBalance -= amount;
      cashBalance += amount;
      logAction(`Withdraw ${amount} → Account: ${accountBalance}, Cash: ${cashBalance}`);
    } else {
      logAction("Not enough money in the account to withdraw.");
    }
  } else {
    logAction("Unknown operation.");
  }

  render();
}

document.addEventListener("DOMContentLoaded", render);