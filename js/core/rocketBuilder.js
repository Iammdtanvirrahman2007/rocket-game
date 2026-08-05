// ======================================
// Rocket Builder Engine v2
// ======================================

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
            y: 0
        },

        rotation: 0

    };

    // আপাতত নিচে stack হবে
    if (rocket.length > 0) {

        const parent = rocket[rocket.length - 1];

        newPart.parent = parent.uid;

        parent.children.push(newPart.uid);

    }

    rocket.push(newPart);

    return newPart;

}

/**
 * পার্ট ডিলিট
 */
export function removePart(uid) {

    const part = getPart(uid);

    if (!part) return;

    // Parent থেকে remove
    if (part.parent) {

        const parent = getPart(part.parent);

        if (parent) {

            parent.children =
                parent.children.filter(id => id !== uid);

        }

    }

    // Children-এর parent reset
    part.children.forEach(childId => {

        const child = getPart(childId);

        if (child) {

            child.parent = null;

        }

    });

    rocket = rocket.filter(p => p.uid !== uid);

}

/**
 * সব পার্ট
 */
export function getRocket() {

    return rocket;

}

/**
 * UID দিয়ে পার্ট খোঁজা
 */
export function getPart(uid) {

    return rocket.find(part => part.uid === uid);

}

/**
 * Index দিয়ে পার্ট
 */
export function getPartByIndex(index) {

    return rocket[index];

}

/**
 * Parent
 */
export function getParent(uid) {

    const part = getPart(uid);

    if (!part || !part.parent) return null;

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
 * পুরো রকেট পরিষ্কার
 */
export function clearRocket() {

    rocket = [];

}

/**
 * মোট Mass
 */
export function getTotalMass() {

    return rocket.reduce(

        (sum, part) => sum + part.stats.mass,

        0

    );

}

/**
 * Rocket Height
 */
export function getRocketHeight() {

    return rocket.length;

}

/**
 * Rocket Root
 */
export function getRootPart() {

    return rocket[0] || null;

}
