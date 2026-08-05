import { renderRocket } from "./renderer.js";
import { getPartById } from "../parts/registry.js";

import {
    addPart,
    removePart,
    getRocket,
    getTotalMass
} from "./rocketBuilder.js";

// ======================================
// Initialize Drag & Drop
// ======================================

export function initDragAndDrop() {

    const loader = document.getElementById("part-loader");
    const dropZone = document.getElementById("drop-zone");

    // Drag Start
    loader.addEventListener("dragstart", (e) => {

        const partItem = e.target.closest(".part-item");

        if (!partItem) return;

        e.dataTransfer.setData("part-id", partItem.dataset.id);
        e.dataTransfer.effectAllowed = "copy";

    });

    // Drag Over
    dropZone.addEventListener("dragover", (e) => {

        e.preventDefault();

        e.dataTransfer.dropEffect = "copy";

        dropZone.style.backgroundColor = "rgba(216,228,255,.35)";

    });

    // Drag Leave
    dropZone.addEventListener("dragleave", () => {

        dropZone.style.backgroundColor = "";

    });

    // Drop
    dropZone.addEventListener("drop", (e) => {

        e.preventDefault();

        dropZone.style.backgroundColor = "";

        const partId = e.dataTransfer.getData("part-id");

        const partData = getPartById(partId);

        if (!partData) return;

        assemblePart(partData);

    });

}

// ======================================
// Add Part
// ======================================

function assemblePart(partData) {

    const result = addPart(partData);

    // Attach rule failed
    if (!result) {

        alert("❌ This part cannot be attached here.");

        return;

    }

    renderRocket();

    updateStats();

}

// ======================================
// Remove Part
// ======================================

export function removeRocketPart(uid) {

    removePart(uid);

    renderRocket();

    updateStats();

}

// ======================================
// Update Status
// ======================================

function updateStats() {

    document.getElementById("stat-parts").textContent =
        getRocket().length;

    document.getElementById("stat-mass").textContent =
        getTotalMass().toFixed(1) + "t";

}

// ======================================
// Save Rocket
// ======================================

export function getRocketData() {

    return {

        name: "Untitled Rocket",

        totalMass: getTotalMass(),

        parts: getRocket()

    };

}
