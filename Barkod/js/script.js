let btn = document.querySelector(".btn");
let statusBarkod = document.querySelector(".status");
let barkodWrapper = document.querySelector(".barkod__wrapper");
let barkodValue;
let resetTextValSecond = 3000;
let even = 0,
  odd = 0,
  multiplyEven = 0,
  sumProduct = 0;
btn.onclick = (e) => {
  // e event demekdir.JS ozunun bize verdiyi objectdir ve daxilinde onlarla methodla,property var.
  barkodValue = document.querySelector(".barkod").value;

  if (barkodValue.length > 0) {
    barkodScanner(barkodValue);
  } else {
    barkodDesignText("Warning, must be digit in input", "#bebe25");
    setTimeout(() => {
      resetBarkodDesignText();
    }, resetTextValSecond);
  }
};
function barkodScanner(barkodValue) {
  if (barkodValue.length === 13) {
    let checkValue =
      barkodValue.match(/[0-9]{13}/gi) !== null
        ? barkodValue.match(/[0-9]{13}/gi).join("")
        : null;

    if (checkValue != null) {
      let barkodDigitArr = checkValue.split("").map((digit) => parseInt(digit));
      console.log(barkodDigitArr);
      for (let q = 0; q < barkodDigitArr.length; q++) {
        let num = barkodDigitArr[q];
        q % 2 == 0
          ? q < barkodDigitArr.length - 1
            ? (odd += num)
            : null
          : (even += num);
      }
      multiplyEven = even * 3;
      sumProduct += multiplyEven + odd;
      let arr = sumProduct.toString().split("");
      let lastDigit = 10 - arr[arr.length - 1];
      if (lastDigit == barkodDigitArr[barkodDigitArr.length - 1]) {
        barkodDesignText("Barcode is true!!!", "#30eb30");
        setTimeout(() => {
          resetBarkodDesignText();
        }, resetTextValSecond);
      } else {
        barkodDesignText("Barcode is false!!!", "red");
        setTimeout(() => {
          resetBarkodDesignText();
        }, resetTextValSecond);
      }
      resetVariable();
    } else {
      barkodDesignText("Warning, there can only contain digit!!!", "#bebe25");
      setTimeout(() => {
        resetBarkodDesignText();
      }, resetTextValSecond);
    }
  } else {
    barkodDesignText("Warning, there can only be 13 digits!!!", "#bebe25");
    setTimeout(() => {
      resetBarkodDesignText();
    }, resetTextValSecond);
  }
  resetInput();
}
function resetInput() {
  return (document.querySelector(".barkod").value = "");
}
function resetVariable() {
  return (even = 0), (odd = 0), (multiplyEven = 0), (sumProduct = 0);
}
function barkodDesignText(text, color) {
  return (
    (statusBarkod.style.color = color),
    (statusBarkod.innerHTML = text),
    (barkodWrapper.style.border = `5px solid ${color}`)
  );
}
function resetBarkodDesignText() {
  return (
    (statusBarkod.style.color = ""),
    (statusBarkod.innerHTML = ""),
    (barkodWrapper.style.border = "5px solid #eee")
  );
}
