// ======================================
// Rocket Builder Engine v1
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

        image: part.image,

        type: part.type,

        stats: part.stats,

        parent: null,

        children: [],

        position: {
            x: 0,
            y: 0
        },

        rotation: 0
    };

    rocket.push(newPart);

    return newPart;
}

/**
 * পার্ট ডিলিট
 */

export function removePart(uid){

    rocket = rocket.filter(
        part => part.uid !== uid
    );
}

/**
 * সব পার্ট
 */

export function getRocket(){

    return rocket;
}

/**
 * UID দিয়ে পার্ট খুঁজে বের করা
 */

export function getPart(uid){

    return rocket.find(
        part => part.uid === uid
    );
}

/**
 * পুরো রকেট ক্লিয়ার
 */

export function clearRocket(){

    rocket = [];
}

/**
 * মোট Mass
 */

export function getTotalMass(){

    let total = 0;

    rocket.forEach(part=>{

        total += part.stats.mass;

    });

    return total;
}
