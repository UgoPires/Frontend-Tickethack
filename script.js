// Link trips route to #search and show results

document.querySelector("#btn-search").addEventListener("click", function () {
  let departure = document.querySelector("#departure").value;
  let arrival = document.querySelector("#arrival").value;
  let date = document.querySelector("#date").value;
  let data = { departure, arrival, date };

  fetch("http://localhost:3000/trips", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
      if (res.result < 1) {
        document.querySelector("#notfound").src = "./image/notfound.png";
      } else if (res.result === true) {
        for (let i = 0; i < res.trips.length; i++) {
          let newDateHours = new Date(res.trips[i].date).getHours();
          let newDateMinutes = new Date(res.trips[i].date).getMinutes();
          document.querySelector("#notfound").src = "";
          document.querySelector("#resultat").innerHTML += `
          <div class="result-card">
            <p>${res.trips[i].departure}> </p>
            <p>${res.trips[i].arrival}</p>
            <p>${newDateHours}:${newDateMinutes}</p>
            <p>${res.trips[i].price}€</p>
            <button class="btnBook" onclick="window.location.href='./bookings.html';">
      Book
    </button>
          </div>
          </div>`;
          for (let i = 0; i < res.trips.length; i++) {
            document
              .querySelector(".btnBook")
              .addEventListener("click", function () {
                let tripId = res.trips[i]._id;
                let data = { tripId };
                console.log(data);
                fetch(`http://localhost:3000/bookings/${tripId}`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
                })
                  .then((response) => response.json())
                  .then((res) => {
                    console.log(res);
                  });
              });
          }
        }
      }
    });
});
