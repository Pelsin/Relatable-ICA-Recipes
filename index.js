(function () {
  const elements = document.querySelectorAll(
    ".ingredients-list-group__card__qty"
  );
  const referenceItems = [
    { name: "pingisboll", plural: "pingisbollar", weight: 2.7 },
    { name: "A4-pappersark", plural: "A4-pappersark", weight: 5 },
    { name: "öra", plural: "öron", weight: 7 },
    { name: "nyckel", plural: "nycklar", weight: 10 },
    { name: "ciklidhona", plural: "ciklidhonor", weight: 15 },
    { name: "ladusvala", plural: "ladusvalor", weight: 20 },
    { name: "strumpa", plural: "strumpor", weight: 35 },
    { name: "delicatoboll", plural: "delicatobollar", weight: 40 },
    { name: "gaffel", plural: "gafflar", weight: 50 },
    { name: "sexa tequeila", plural: "sexor tequila", weight: 60 },
    { name: "kattunge", plural: "kattungar", weight: 90 },
    {
      name: "sibirisk jordekorre",
      plural: "sibiriska jordekorrar",
      weight: 100,
    },
    { name: "banan", plural: "bananer", weight: 110 },
    { name: "blöt disktrasa", plural: "blöta disktrasor", weight: 150 },
    { name: "sandig barnsko", plural: "sandiga barnskor", weight: 170 },
    { name: "datormus", plural: "datormöss", weight: 200 },

    { name: "stadsduva", plural: "stadsduvor", weight: 280 },
    {
      name: "vhs-kassett",
      plural: "vhs-kassetter",
      weight: 300,
    },
    { name: "liten hammare", plural: "små hammare", weight: 330 },
    { name: "225mm hovtång", plural: "225mm hovtänger", weight: 380 },
    { name: "L2 gasolflaska", plural: "L2 gasolflaskor", weight: 450 },
    {
      name: "torr näbbdjurshona",
      plural: "torra näbbdjurshonor",
      weight: 1000,
    },
    { name: "värphöna", plural: "värphönor", weight: 2000 },
  ];

  function valueToGrams(value, unit) {
    switch (unit) {
      case "kg":
        return value * 1000;
      case "tsk":
        return value * 4;
      case "msk":
        return value * 15;
      case "dl":
        return value * 85;
      default:
        return value;
    }
  }

  function parseQuantity(text) {
    const match = text.match(/(\d+\/\d+|\d+\.?\d*)\s*(g|kg|tsk|msk|dl)/i);

    if (!match) return null;

    let value = match[1];
    const unit = match[2].toLowerCase();

    if (value.includes("/")) {
      const [num, denom] = value.split("/").map(Number);
      value = num / denom;
    } else {
      value = parseFloat(value);
    }

    return valueToGrams(value, unit);
  }

  function findClosestItem(grams) {
    let closest = referenceItems[0];
    let minDiff = Math.abs(grams - closest.weight);

    for (const item of referenceItems) {
      const diff = Math.abs(grams - item.weight);
      if (diff < minDiff) {
        minDiff = diff;
        closest = item;
      }
    }

    return closest;
  }

  function convertToReference(grams) {
    const closest = findClosestItem(grams);
    const quantity = grams / closest.weight;
    const formattedQty =
      quantity % 1 === 0 ? quantity : parseFloat(quantity.toFixed(1));

    let itemName =
      formattedQty > 1.5 && closest.plural ? closest.plural : closest.name;

    return `${formattedQty} ${itemName}`;
  }

  let count = 0;
  elements.forEach((el) => {
    const originalText = el.textContent.trim();
    const grams = parseQuantity(originalText);

    if (grams !== null) {
      const newText = convertToReference(grams);
      el.textContent = newText;
      el.style.backgroundColor = "#ffffcc";
      count++;
    }
  });

  // alert(`Converted ${count} ingredient quantities to reference items!`);
})();
