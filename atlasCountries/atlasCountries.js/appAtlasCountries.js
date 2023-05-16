import { doApi } from "./atlasCountryManager.js";
import { declarEvent } from "./eventAtlas.js";

const init = () => {
    doApi();
    declarEvent();
}

init();
