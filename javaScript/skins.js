//skins
import skins from "./skinList.js";

var ul = document.getElementById("skins");

for (let i = 0; i < skins.length; i++) {
    var li = document.createElement("li");
    li.style.backgroundImage = "url" + "(" + skins[i].url + ")";
    li.onclick = () => {

        character.style.backgroundImage = "url" + "(" + skins[i].url + ")";
    };
    ul.appendChild(li);
    //li.setAttribute('id', skins[i].Name);
    //li.appendChild(document.createTextNode(skins[i].Name));
}
