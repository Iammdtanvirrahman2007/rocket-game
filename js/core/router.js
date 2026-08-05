export async function navigateTo(pageName) {

    const appContainer = document.getElementById("app");

    appContainer.innerHTML = `
        <h2 style="color:white;text-align:center;">
            Loading Module...
        </h2>
    `;

    try {

        const pageModule = await import(`../pages/${pageName}.js`);

        appContainer.innerHTML = pageModule.getHTML();

        if (pageModule.init) {
            pageModule.init();
        }

        console.log(`✅ Loaded Page: ${pageName}`);

    } catch (error) {

        console.group("🚨 MODULE LOAD ERROR");

        console.error("Page :", pageName);

        console.error("Error :", error);

        console.error("Message :", error.message);

        console.error("Stack :", error.stack);

        console.groupEnd();

        appContainer.innerHTML = `
            <div style="
                color:#ff4444;
                padding:20px;
                font-family:monospace;
                white-space:pre-wrap;
                overflow:auto;
            ">
                <h2>System Error</h2>

                <b>${error.name}</b>

                <br><br>

                ${error.message}

                <hr>

                ${error.stack}
            </div>
        `;

    }

}
