var total = 0;

let equivalents = {};

let button_order = document.getElementById("button_order");
button_order.addEventListener(
  "click",
  createLayer.bind(this, "order", "order")
);
function createLayer(nid, nclass) {
  let newLayer = document.createElement("div");
  newLayer.setAttribute("id", nid);
  newLayer.className = nclass;

  newLayer.innerHTML = "<h3 id='close'>Заказ:</h3>";
  for (const flower in equivalents) {
    newLayer.innerHTML += flower + "<br>";
    for (let i = 0; i < equivalents[flower].length; i++)
      newLayer.innerHTML += equivalents[flower][i] + "<br>";
  }

  document.body.appendChild(newLayer);
}

function countEquivalents(flower) {
  console.log(flower);
  for (const key in equivalents) {
    if (flower == key) {
      return equivalents[flower][1];
    }
  }
  return 0;
}

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData(
    "text",
    '<img  src="http://js.web-online.net.ua/' +
      event.target.id +
      '.jpg" class="mini" />' +
      "," +
      event.target.dataset.text +
      "," +
      event.target.dataset.price +
      "," +
      event.target.id
  );
}

function drop(event) {
  event.preventDefault();
  var cart = document.getElementById("cart");
  var data = event.dataTransfer.getData("text");
  var arr_data = data.split(",");
  var sum = document.getElementById("sum");
  total += parseInt(arr_data[2]);
  sum.innerHTML = "Сумма: $" + total;
  if (countEquivalents(arr_data[1]) == 0) {
    equivalents[arr_data[1]] = [arr_data[2], 1];
    cart.innerHTML +=
      arr_data[0] +
      arr_data[1] +
      ", $" +
      arr_data[2] +
      " <span id='count_" +
      arr_data[3] +
      "'>" +
      "количество: " +
      countEquivalents(arr_data[1]) +
      "</span>";

    console.log(equivalents);
  } else {
    equivalents[arr_data[1]][1] += 1;
    console.log(equivalents);
    let countFlowers = document.getElementById("count_" + arr_data[3]);
    countFlowers.innerHTML = "количество: " + countEquivalents(arr_data[1]);
  }
}
