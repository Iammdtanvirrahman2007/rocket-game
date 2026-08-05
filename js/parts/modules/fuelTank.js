export const FuelTank = {
    id: 'fuel-tank-200',
    name: 'FL-T200 Fuel Tank',
    type: 'fuel',
    stats: { mass: 2.0, fuel: 200, thrust: 0 },
    
    createSidebarItem() {
        const el = document.createElement('div');
        el.className = 'part-item tank-shape';
        el.draggable = true;
        el.dataset.id = this.id;
        el.innerHTML = `<span>${this.name}</span>`;
        return el;
    }
};
