import { getRocket } from "./rocketBuilder.js";
import { removeRocketPart } from "./dragManager.js";

export function renderRocket() {

    const dropZone = document.getElementById("drop-zone");

    // Placeholder
    const placeholder = dropZone.querySelector("p");

    // পুরনো Part Remove
    dropZone.querySelectorAll(".rocket-part").forEach(part => {
        part.remove();
    });

    const rocket = getRocket();

    if (rocket.length === 0) {

        if (placeholder) {
            placeholder.style.display = "block";
        }

        return;
    }

    if (placeholder) {
        placeholder.style.display = "none";
    }

    rocket.forEach(part => {

        const div = document.createElement("div");
        div.style.position="absolute";

div.style.left=`${part.position.x}px`;

div.style.top=`${part.position.y}px`;
        div.className = "rocket-part";

        div.dataset.uid = part.uid;

        div.innerHTML = `
            <img src="${part.image}" alt="${part.name}">

            <button class="delete-btn">✖</button>
        `;

        div.querySelector(".delete-btn")
        .addEventListener("click", () => {

            removeRocketPart(part.uid);

        });

        dropZone.appendChild(div);

    });

}
