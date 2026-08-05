export async function navigateTo(pageName) {
    const appContainer = document.getElementById('app');
    
    // পেজ লোড হওয়ার সময় একটি লোডিং টেক্সট দেখাবে
    appContainer.innerHTML = '<h2 style="color: white; text-align: center;">Loading Module...</h2>';

    try {
        // ডায়নামিক ইম্পোর্ট: যখন যে পেজ লাগবে, শুধু সেই পেজের JS ফাইল লোড করবে
        const pageModule = await import(`../pages/${pageName}.js`);
        
        // ১. ওই পেজের HTML ডিজাইন কন্টেইনারে বসাবে
        appContainer.innerHTML = pageModule.getHTML();
        
        // ২. ওই পেজের বাটন ও অন্যান্য লজিক অ্যাক্টিভ করবে
        if (pageModule.init) {
            pageModule.init();
        }
        
        console.log(`✅ Loaded Page: ${pageName}`);
    } catch (error) {
        console.error(`❌ Error loading page '${pageName}':`, error);
        appContainer.innerHTML = '<h2 style="color: red; text-align: center;">System Error: Module not found!</h2>';
    }
}
