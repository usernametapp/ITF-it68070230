let accountBalance= 0;
let cashBalance =0;

function logAction(message) {
    const logBox = document.getElementById("log");
    logBox.value += "\n" + message;
  }

  function updateBalance() {
    accountBalance = parseInt(document.getElementById("acc_input").value) || 0;
    cashBalance = parseInt(document.getElementById("cash_input").value) || 0;
    logAction(`Balance updated --> Account: ${accountBalance}, Cash: ${cashBalance}`);
  }

function proceedOperation(){
const operation = document.getElementById("myDropdown1").value;
const amount = parseInt(document.getElementById("proceed_input").value) || 0;

if (operation === "deposit"){
    if (cashBalance >= amount){
        cashBalance -= amount;
        accountBalance += amount;
        logAction(`Deposit ${amount} → Account: ${accountBalance}, Cash: ${cashBalance}`);
    } else {
        logAction("Not enough cash to deposit")
    }
} else if (operation === "withdraw"){
    if (accountBalance >= amount){
        accountBalance -= amount;
        cashBalance += amount;
        logAction(`Withdraw ${amount} → Account: ${accountBalance}, Cash: ${cashBalance}`);
    } else {
        logAction("Not enough money in the account to withdraw");
    }
}

document.getElementById("acc_input").value = accountBalance;
document.getElementById("cash_input").value = cashBalance;
}
