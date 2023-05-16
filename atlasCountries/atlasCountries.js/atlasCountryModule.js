import { createCountryByName } from "./atlasCountryManager.js";
import { borders } from "./atlasCountryManager.js";

export default class AtlasCountry {
    constructor(_parent, _item) {
        this.parent = _parent;
        this.country = _item.name.common;
        this.capital = _item.capital;
        this.region = _item.region;
        this.languages = _item.languages ? Object.values(_item.languages).join(', ') : "none";
        this.population = _item.population.toLocaleString();
        this.borders = _item.borders;
        this.flags = (_item.flags.png != "N/A") ? _item.flags.png : "/image not found.png";
        this.coin = _item.currencies? (Object.keys(_item.currencies)) + ", " + Object.values(Object.values(_item.currencies)[0])[0]: "no details";
        this.lat = _item.latlng[0];
        this.lng = _item.latlng[1];
    }

    renderStart() {
        let div = document.createElement("div")
        div.className = " col-sm-6 col-md-4 p-3";
        document.querySelector(this.parent).append(div);

        div.innerHTML = `
        <div class="showDetails" data-aos="zoom-in" data-aos-duration="1000" >
          <div style="position:relative;" >
            <img src="${this.flags}" alt="${this.name}" class="flag w-100" height="230px">
            <div class="caption-container">
              <div class="caption-background">
                <h1 class="m-1 text-center bold " style="color:#686056">${this.country}</h1>
              </div>
            </div>
          </div>
        </div>`;

        let showDetails = div.querySelector(".showDetails");
        showDetails.addEventListener("click", () => {
            document.querySelector("#id_row").innerHTML = "";
            this.render();
        })
    }

    render() {
        let div = document.createElement("div")
        document.querySelector(this.parent).append(div);

        div.innerHTML = `
        <div class="card p-0 m-3 m-sm-3" data-aos="flip-right" data-aos-duration="3000">
        <div class="card-body d-md-flex p-0">
        <div class="col-md-5">
        <div class="p-3">
            <h1 class="text-center bold">${this.country}</h1>
            <div><span class="bold">Capital:</span>${this.capital}</div>
            <div><span class="bold">Region:</span>${this.region}</div>
            <div><span class="bold">Languages:</span> ${this.languages}</div>
            <div><span class="bold">Population:</span>${this.population}</div>
            <div><span class="bold">Coin:</span>${this.coin}</div>
            <div id="id_border"><span class="bold">Borders:</span></div>
        </div>
            <div>
                <img src="${this.flags}" alt="${this.name}" width="100%" height="230px"></div>
            </div>

            <div class="maps col-md-7 p-0">
                <iframe class="p-0 col-12" width="100%" height="100%" src="https://maps.google.com/maps?q=${this.lat},${this.lng}&z=7&ie=UTF8&iwloc=&output=embed" frameborder="0"  scrolling="no" marginheight="0" marginwidth="0" ></iframe>
            </div> 
        </div>
        </div>`

        if (this.borders) {
            this.borders.forEach(async (border) => {
                let name = await borders(border);
                let span = document.createElement("span");
                span.style = "text-decoration: underline;cursor: pointer;"
                span.innerHTML = name + ", ";
                div.querySelector("#id_border").append(span);
                span.addEventListener("click", () => {
                    createCountryByName(name);
                });
            });
        } else {
            div.querySelector("#id_border").innerHTML += "none";
        }
    }
}

