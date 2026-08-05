// ======================================
// Rocket Builder Engine v3
// ======================================

import { canAttach } from "./nodeSystem.js";

let rocket = [];

/**
 * নতুন পার্ট যোগ করা
 */
export function addPart(part) {

    const newPart = {

        uid: crypto.randomUUID(),

        id: part.id,

        name: part.name,

        type: part.type,

        image: part.image,

        stats: {
            ...part.stats
        },

        attachNodes: {
            ...part.attachNodes
        },

        size: {
            ...part.size
        },

        parent: null,

        children: [],

        position: {
            x: 0,
            y: rocket.length * 120
        },

        rotation: 0

    };

    // ===========================
    // First Part
    // ===========================

    if (rocket.length === 0) {

        if (!canAttach(null, newPart)) {
            return null;
        }

    }

    // ===========================
    // Attach To Previous Part
    // ===========================

    else {

        const parent = rocket[rocket.length - 1];

        if (!canAttach(parent, newPart)) {
            return null;
        }

        newPart.parent = parent.uid;

        parent.children.push(newPart.uid);

    }

    rocket.push(newPart);

    return newPart;

}

/**
 * Remove Part
 */
export function removePart(uid) {

    const part = getPart(uid);

    if (!part) return;

    // Parent থেকে Remove
    if (part.parent) {

        const parent = getPart(part.parent);

        if (parent) {

            parent.children = parent.children.filter(
                id => id !== uid
            );

        }

    }

    // Children Orphan
    part.children.forEach(childId => {

        const child = getPart(childId);

        if (child) {
            child.parent = null;
        }

    });

    rocket = rocket.filter(
        p => p.uid !== uid
    );

}

/**
 * সব Part
 */
export function getRocket() {

    return rocket;

}

/**
 * UID দিয়ে Part
 */
export function getPart(uid) {

    return rocket.find(
        part => part.uid === uid
    );

}

/**
 * Index দিয়ে Part
 */
export function getPartByIndex(index) {

    return rocket[index];

}

/**
 * Parent
 */
export function getParent(uid) {

    const part = getPart(uid);

    if (!part) return null;

    if (!part.parent) return null;

    return getPart(part.parent);

}

/**
 * Children
 */
export function getChildren(uid) {

    const part = getPart(uid);

    if (!part) return [];

    return part.children
        .map(id => getPart(id))
        .filter(Boolean);

}

/**
 * Root Part
 */
export function getRootPart() {

    return rocket[0] || null;

}

/**
 * Rocket Height
 */
export function getRocketHeight() {

    return rocket.length;

}

/**
 * Total Mass
 */
export function getTotalMass() {

    return rocket.reduce(

        (sum, part) => sum + part.stats.mass,

        0

    );

}

/**
 * Clear Rocket
 */
export function clearRocket() {

    rocket = [];

}

/**
 * Rocket Exists?
 */
export function hasRocket() {

    return rocket.length > 0;

}

/**
 * Rocket Count
 */
export function getPartCount() {

    return rocket.length;

}
