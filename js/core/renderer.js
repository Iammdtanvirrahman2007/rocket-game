import { getRocket } from "./rocketBuilder.js";

export function renderRocket() {

    const dropZone = document.getElementById("drop-zone");

    // পুরনো সব rocket part remove
    dropZone.querySelectorAll(".rocket-part")
        .forEach(part => part.remove());

    const rocket = getRocket();

    if (rocket.length === 0) {

        const placeholder = dropZone.querySelector("p");

        if (placeholder) {
            placeholder.style.display = "block";
        }

        return;
    }

    const placeholder = dropZone.querySelector("p");

    if (placeholder) {
        placeholder.style.display = "none";
    }

    rocket.forEach(part => {

        const div = document.createElement("div");

        div.className = "rocket-part";

        div.dataset.uid = part.uid;

        div.innerHTML = `
            <img src="${part.image}" alt="${part.name}">
        `;

        dropZone.appendChild(div);

    });

}
