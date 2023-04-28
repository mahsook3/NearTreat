const button = document.querySelector("button");
const out = document.querySelector("#out");
button.addEventListener("click", () => {
  if (navigator.geolocation) {
    button.setAttribute("disabled", "disabled");
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const queryUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
      fetch(queryUrl).then(async (res) => {
        const json = await res.json();
        out.classList.remove("hidden");
        const innerHtml = `
<h1 style="text-align:center;">${json.name}</h3>
<br/>
<p>${json.display_name}</p>
<p>${json.address.city} / ${json.address.country} [${json.address["ISO3166-2-lvl4"]}]</p>
<br/>
<p><b>Latitude : </b>${json.lat}</p>
<p><b>Longitude : </b>${json.lon}</p>
<br/>
<p>Details</p>
<p><b>Country : </b>${json.address.country}</p>
<p><b>City : </b>${json.address.city}</p>
<p><b>Town : </b>${json.address.town}</p>
<p><b>Region : </b>${json.address.region}</p>
<p><b>Road : </b>${json.address.road}</p>
<p><b>Suburb : </b>${json.address.suburb}</p>
<br/>
<a href="https://www.openstreetmap.org/#map=16/${json.lat}/${json.lon}" target="_blank" rel="nofollow" >See Map</a>
<br/>
<br/>`;
        out.innerHTML = innerHtml;
        button.removeAttribute("disabled");
      });
    });
  }
});
