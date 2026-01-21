
fetch("./data/navbar2.json")
    .then(res => res.json())
    .then(nav => {

        let html = `
            <a class="navbar-brand" href="index.html">
                <img src="${nav.brandLogo}" alt="Logo" class="img-fluid">
            </a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
                data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" 
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
        `;

        nav.menu.forEach(item => {

            if (item.dropdown) {
                html += `
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button">
                        ${item.title}
                    </a>
                    <ul class="dropdown-menu">
                `;

                html += item.items
                    .map(sub => `<li><a class="dropdown-item nav-link-item" href="${sub.link}">${sub.title}</a></li>`)
                    .join("");

                html += `</ul></li>`;
            } else {
                html += `
                <li class="nav-item">
                    <a class="nav-link nav-link-item" href="${item.link}">${item.title}</a>
                </li>`;
            }
        });

        html += `
                </ul>
            </div>
        `;

        document.getElementById("navbar-container").innerHTML = html;
       // Run this AFTER `document.getElementById("navbar-container").innerHTML = html;`

(function setActiveNavByUrl() {
    // Remove active from all first
    document.querySelectorAll("#navbar-container .nav-link-item")
        .forEach(i => i.classList.remove("active"));

    const links = Array.from(document.querySelectorAll("#navbar-container .nav-link-item"));

    // Normalize current URL (strip query/hash, trailing slash)
    const currentFull = window.location.href.split(/[?#]/)[0].replace(/\/+$/, "");
    const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";

    // Try to find the best match
    let matched = false;

    for (const link of links) {
        const href = link.getAttribute("href");

        // ignore anchors and javascript pseudo-links
        if (!href || href.startsWith("#") || href.startsWith("javascript:")) continue;

        // Resolve href relative to current page
        let resolved;
        try {
            resolved = new URL(href, window.location.href);
        } catch (e) {
            // fallback — skip invalid URLs
            continue;
        }

        const resolvedFull = resolved.href.split(/[?#]/)[0].replace(/\/+$/, "");
        const resolvedPath = resolved.pathname.replace(/\/+$/, "") || "/";

        // Exact page match (preferred)
        if (resolvedFull === currentFull || resolvedPath === currentPath) {
            link.classList.add("active");
            matched = true;
            break; // stop at first exact match
        }
    }

    // If no exact match, try looser matching (e.g., parent path)
    if (!matched) {
        for (const link of links) {
            const href = link.getAttribute("href");
            if (!href || href.startsWith("#") || href.startsWith("javascript:")) continue;

            let resolved;
            try {
                resolved = new URL(href, window.location.href);
            } catch (e) { continue; }

            const resolvedPath = resolved.pathname.replace(/\/+$/, "") || "/";

            // If current path includes the link path (useful for nested pages)
            if (resolvedPath !== "/" && currentPath.endsWith(resolvedPath)) {
                link.classList.add("active");
                matched = true;
                break;
            }
        }
    }

    // Optional: if still no match, mark first nav item as active
    if (!matched && links.length) {
        links[0].classList.add("active");
    }
})();



    })
    .catch(err => console.error("Navbar load error:", err));






class HeaderComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
     
   
<!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light fixed-top">
        <div class="container" id="navbar-container"></div>
    </nav>

            `;
    }

}



customElements.define('header-component', HeaderComponent);







