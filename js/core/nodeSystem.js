// ======================================
// Attach Node Rules
// ======================================

export function canAttach(parent, child) {

    if (!parent) {

        // প্রথম Part অবশ্যই Capsule হবে
        return child.type === "capsule";

    }

    switch (parent.type) {

        case "capsule":

            return child.type === "tank";

        case "tank":

            return (
                child.type === "tank" ||
                child.type === "engine"
            );

        case "engine":

            return false;

        default:

            return false;

    }

}
