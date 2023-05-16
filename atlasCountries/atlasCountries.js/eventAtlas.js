import { createCountryByName, createStartArray } from "./atlasCountryManager.js";

export const declarEvent = () => {


    let showHome = document.querySelector("#home_btn");
    showHome.addEventListener("click", () => {
        document.querySelector("#id_row").innerHTML = "";
        createStartArray();
    });


    // let search_btn = document.querySelector("#search_btn");
    // search_btn.addEventListener("click", () => {
    //     let input = document.querySelector("#id_input").value;
    //     createCountryByName(input);
    // })

    let search_input = document.querySelector("#id_input");
    search_input.addEventListener("input", () => {
        let input = search_input.value;
        createCountryByName(input);
    });


    let id_select = document.querySelector("#id_select");
    id_select.addEventListener("change", () => {
        createCountryByName(id_select.value);
        id_input.value = id_select.value
    })
}

