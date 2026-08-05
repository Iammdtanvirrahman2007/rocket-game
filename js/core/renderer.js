import { getRocket } from "./rocketBuilder.js";
import { removeRocketPart } from "./dragManager.js";

// ======================================
// Render Rocket
// ======================================

export function renderRocket() {

    const dropZone = document.getElementById("drop-zone");

    if (!dropZone) return;

    // Placeholder
    const placeholder = dropZone.querySelector(".placeholder");

    // পুরনো rocket remove
    dropZone.querySelectorAll(".rocket-part").forEach(part => {
        part.remove();
    });

    const rocket = getRocket();

    // Empty Rocket
    if (rocket.length === 0) {

        if (placeholder) {
            placeholder.style.display = "block";
        }

        return;
    }

    if (placeholder) {
        placeholder.style.display = "none";
    }

    // =====================================
    // CENTER LINE
    // =====================================

    const centerX = dropZone.clientWidth / 2;

    // =====================================
    // RENDER PARTS
    // =====================================

    rocket.forEach((part, index) => {

        const div = document.createElement("div");

        div.className = "rocket-part";

        div.dataset.uid = part.uid;

        // ---------------------------------
        // Stack Position
        // ---------------------------------

        // 110 ছিল, তাই gap বেশি হচ্ছিল
        const y = index * 92 + 55;

        // 120px image width => half = 60px
        div.style.left = `${centerX - 60}px`;
        div.style.top = `${y}px`;

        div.innerHTML = `
            <img src="${part.image}" alt="${part.name}">

            <button class="delete-btn"
                    title="Remove Part">
                ✖
            </button>
        `;

        // Delete Button
        div.querySelector(".delete-btn")
            .addEventListener("click", () => {

                removeRocketPart(part.uid);

            });

        dropZone.appendChild(div);
    });
}
