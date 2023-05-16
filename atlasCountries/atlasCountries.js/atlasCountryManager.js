import AtlasCountry from "./atlasCountryModule.js";

let country_ar = [];

export let start_ar = [
    "Israel",
    "United States",
    "France",
    "United Kingdom",
    "Thailand",
];

export const doApi = async () => {

    let url = "https://restcountries.com/v3.1/all"
    try {
        let resp = await fetch(url);
        console.log(url);
        let data = await resp.json();
        console.log(data);
        country_ar = _.sortBy(data, "name.common");
        fillSelect();
        createNavList()
        createStartArray();
    }

    catch (err) {
        console.log(err)
    }
}

const createNavList = () => {
    let ul = document.querySelector("#ul_nav");

    start_ar.forEach((item, i) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = item;
        a.style.color = " #e6d7c1";
        a.href = "#";
        li.appendChild(a);
        ul.appendChild(li);

        a.addEventListener('click', () => {
            createCountryByName(item);
        });
    });
}



export const createCountryByName = (name) => {

    if (name.trim() == '') {
        country_ar.array.forEach(item => {
            let country = new AtlasCountry("#id_row", item);
            country.renderStart();
        });
    }

    let arr = country_ar.filter((item) =>
        item.name.common.toLowerCase().includes(name.toLowerCase().trim())
    );
    console.log(arr);

    document.querySelector("#id_row").innerHTML = "";
    let flag = false;

    // Check if any of the filtered countries match the exact name
    arr.forEach(item => {
        if (item.name.common == name) {
            let country = new AtlasCountry("#id_row", item);
            country.render();
            flag = true;
        }
    });

    if (!flag && arr.length > 0) {
        arr.forEach(item => {
            let country = new AtlasCountry("#id_row", item);
            country.renderStart();
        });
    } else if (!flag) {
        document.querySelector("#id_row").innerHTML = `<h1 class="text-center m-5" style="color:#686056">Country ${name} is not found</h1>`;
    }
    document.querySelector("#id_load").classList.add("d-none");
}


export const createStartArray = () => {
    document.querySelector("#id_load").classList.add("d-none");

    let temp_ar = [];

    country_ar.forEach((item) => {
        start_ar.forEach((name) => {
            if (item.name.common.toLowerCase() === name.toLowerCase().trim()) {
                temp_ar.push(item);
            }
        });
    });

    temp_ar.forEach((item) => {
        let country = new AtlasCountry("#id_row", item);
        country.renderStart();
    });
};


export const createCountryByArr = (_ar) => {
    let temp_ar = [];
    country_ar.forEach(item => {
        _ar.forEach(name => {
            if (item.name.common.toLowerCase().includes(name.toLowerCase()).trim()) {
                temp_ar.push(item);
            }
        });
    });
    console.log(temp_ar);
    temp_ar.forEach(item => {
        let country = new AtlasCountry("#id_row", item);
        country.renderStart();
    });
    document.querySelector("#id_load").classList.add("d-none");

}


export const fillSelect = () => {
    let select = document.querySelector("#id_select");
    select.innerHTML += `<option>choose the country from list</option>`

    country_ar.forEach(item => {
        select.innerHTML += `<option>${item.name.common}</option>`
    });
}

export const borders = async (_code) => {
    let url = `https://restcountries.com/v3.1/alpha/${_code}`

    let resp = await fetch(url);
    // console.log(url);
    let data = await resp.json();
    // console.log(data);
    // console.log(data[0].name.common);
    return data[0].name.common;
}
