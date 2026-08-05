export const BasicEngine = {
    id: 'basic-engine',
    name: 'Reliant Engine',
    type: 'engine',
    stats: { mass: 1.5, fuel: 0, thrust: 250 },
    
    createSidebarItem() {
        const el = document.createElement('div');
        el.className = 'part-item engine-shape';
        el.draggable = true;
        el.dataset.id = this.id;
        el.innerHTML = `<span>${this.name}</span>`;
        return el;
    }
};
