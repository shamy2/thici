function highlightField(field) {
    const allFields = document.querySelectorAll("input, select, textarea");
    allFields.forEach(f => f.classList.remove("highlight"));
    field.classList.add("highlight");
}

function toggleCallSection() {
    document.getElementById("callSection").style.display = document.getElementById("callExist").value === "yes" ? "block" : "none";
}

function toggleColorSelection() {
    document.getElementById("cxTag2").style.display = document.getElementById("hasColor").value === "yes" ? "block" : "none";
}

function toggleRefundAmount() {
    let refundAmountField = document.getElementById("refundAmount");
    refundAmountField.style.display = document.getElementById("refund").value === "Yes" ? "block" : "none";
}

function toggleCompensationAmount() {
    document.getElementById("compensationAmount").style.display = document.getElementById("compensation").value === "Yes" ? "block" : "none";
}

function toggleHighRisk() {
    document.getElementById("highRiskSection").style.display = document.getElementById("highRiskExist").value === "yes" ? "block" : "none";
}

function generateForm() {
    let issue = document.getElementById("issue").value;
    let calls = document.getElementById("callExist").value === "yes" ? 
        `Call ${document.getElementById("callPerson").value}, ${document.getElementById("callAnswer").value === "Yes" ? "answered" : "no answer"}, call ${document.getElementById("callTimes").value} time(s), call results; ${document.getElementById("callResult").value}` : "";

    let cxTag1 = document.getElementById("cxTag1").value;
    let cxTag2 = document.getElementById("hasColor").value === "yes" ? ` and ${document.getElementById("cxTag2").value}` : "";
    let highRisk = document.getElementById("highRiskExist").value === "yes" ? `High risk related: ${document.getElementById("highRisk").value}
` : "";
    let resultAction = document.getElementById("resultAction").value;
    let refund = document.getElementById("refund").value === "Yes" ? `Refund(${document.getElementById("refundAmount").value})` : "";
    let compensation = document.getElementById("compensation").value === "Yes" ? `Compensation(${document.getElementById("compensationAmount").value})` : "";

    if (refund && parseFloat(document.getElementById("refundAmount").value) > 200) {
        document.getElementById("refundError").style.display = "block";
        return;
    } else {
        document.getElementById("refundError").style.display = "none";
    }

    let resultText = `*Investigation:
Confirm issue: ${issue}

${calls}

${(document.getElementById("callExist").value === "no") ? '
' : ''}CX tag ${cxTag1}${cxTag2};

${highRisk}*Result:
${resultAction}`;
    if (refund) resultText += `/${refund}`;
    if (compensation) resultText += ` + ${compensation}`;
    resultText += ";";

    document.getElementById("output").textContent = resultText;
    copyForm();
}

function copyForm() {
    let formText = document.getElementById("output").textContent;
    navigator.clipboard.writeText(formText).then(function() {
        console.log("Form copied to clipboard!");
    }, function() {
        console.error("Failed to copy the form.");
    });
}
