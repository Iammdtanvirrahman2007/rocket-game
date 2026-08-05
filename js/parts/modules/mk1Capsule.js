export const Mk1Capsule = {
    id: 'mk1-capsule',
    name: 'Command Capsule',
    type: 'command',
    stats: { mass: 1.2, fuel: 0, thrust: 0 },
    
    // সাইডবারের জন্য আইটেম তৈরি করার ফাংশন
    createSidebarItem() {
        const el = document.createElement('div');
        el.className = 'part-item capsule-shape';
        el.draggable = true; // ড্র্যাগ করা যাবে
        el.dataset.id = this.id;
        el.innerHTML = `<span>${this.name}</span>`;
        return el;
    }
};
