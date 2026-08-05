import { navigateTo } from './core/router.js';

// ব্রাউজার লোড হওয়ার সাথে সাথে হোম পেজ ওপেন করবে
document.addEventListener('DOMContentLoaded', () => {
    console.log("🚀 System Booting...");
    navigateTo('home'); 
});
