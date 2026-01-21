class PageHeaderComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="navbar navbar-expand-lg navbar-light fixed-top">
                <div class="container" id="navbar-container"></div>
            </nav>
        `;

        // Load navbar AFTER component is added to DOM
        loadNavbar();
    }
}

customElements.define('pageheader-component', PageHeaderComponent);



function loadNavbar() {
    fetch("../../data/navbar.json")
        .then(res => res.json())
        .then(nav => {

            let html = `
                <a class="navbar-brand" href="../../index.html">
                    <img src="../../${nav.brandLogo}" alt="Logo" class="img-fluid">
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
                        .map(sub => `<li><a class="dropdown-item nav-link-item" href="../../${sub.link}">${sub.title}</a></li>`)
                        .join("");

                    html += `</ul></li>`;
                } else {
                    html += `
                        <li class="nav-item">
                            <a class="nav-link nav-link-item" href="../../${item.link}">${item.title}</a>
                        </li>`;
                }
            });

            html += `
                    </ul>

                    <button  style="margin-left:20px" class="btn btn-dark-yellow" type="button" data-bs-toggle="modal" data-bs-target="#getquote">Get Quote</button>

                    <!-- Modal -->
                    <div class="modal fade" id="getquote" tabindex="-1">
                        <div class="modal-dialog modal-dialog-centered modal-lg">
                            <div class="modal-content">
                                <div class="modal-header pb-1">
                                    <div class="d-flex justify-content-center flex-column w-100">
                                        <h1 class="modal-title fs-5 text-center" style="font-size:25px !important">Get a Quote</h1>
                                        <p class="text-center">Shape Your Space with Confidence</p>
                                    </div>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                </div>
                                <div class="modal-body">

                                    <form id="quoteForm" method="POST">
                                        <div class="row">
                                            <div class="mb-2 col-lg-6">
                                                <label class="form-label">Name</label>
                                                <input type="text" name="name" class="form-control" required>
                                            </div>

                                            <div class="mb-2 col-lg-6">
                                                <label class="form-label">Email</label>
                                                <input type="email" name="email" class="form-control" required>
                                            </div>

                                            <div class="mb-2 col-lg-6">
                                                <label class="form-label">Phone Number</label>
                                                <input type="text" name="phone" class="form-control" required>
                                            </div>

                                            <div class="mb-2 col-lg-6">
                                                <label class="form-label">Select Service</label>
                                                <select name="subject" class="form-select" required>
                                                    <option value="">Select Service</option>
                                                    <option value="Interior Design">Interior Design</option>
                                                    <option value="Residential Design">Residential Design</option>
                                                    <option value="Office Design">Office Design</option>
                                                    <option value="Commercial Design">Commercial Design</option>
                                                </select>
                                            </div>

                                            <div class="mb-2 col-lg-12">
                                                <label class="form-label">Your Requirement</label>
                                                <textarea name="message" class="form-control" rows="4" required></textarea>
                                            </div>

                                            <div class="mb-2 col-lg-12 text-center mt-3">
                                                <button id="quoteBtn" class="btn btn-primary font-weight-bold" type="submit">
                                                    Submit Request
                                                </button>
                                            </div>
                                        </div>
                                    </form>

                                    <div id="quoteSuccess" class="alert alert-success d-none text-center mt-3">
                                        Thank you! Your request has been submitted.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            `;

            document.getElementById("navbar-container").innerHTML = html;

            // Activate logic
            activateNavigation();

            // Attach form submission NOW (elements exist)
            initQuoteForm();
        })
        .catch(err => console.error("Navbar load error:", err));
}




/* ----------------- ACTIVE NAVIGATION ----------------- */

function activateNavigation() {
    const links = document.querySelectorAll("#navbar-container .nav-link-item");
    const currentPath = window.location.pathname.replace(/\/+$/, "");

    links.forEach(link => {
        const linkPath = link.getAttribute("href").replace(/\/+$/, "");

        if (currentPath.includes(linkPath)) {
            link.classList.add("active");
        }
    });
}



/* ----------------- FORM SUBMISSION ----------------- */

function initQuoteForm() {
    const form = document.getElementById("quoteForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const btn = document.getElementById("quoteBtn");

        btn.disabled = true;
        btn.textContent = "Sending...";

        fetch("../../send_quote.php", {
            method: "POST",
            body: new FormData(form)
        })
            .then(r => r.json())
            .then(d => {
                btn.disabled = false;
                btn.textContent = "Submit Request";

                if (d.success) {
                    form.reset();
                    document.getElementById("quoteSuccess").classList.remove("d-none");
                } else {
                    alert("Error: " + d.message);
                }
            })
            .catch(() => {
                btn.disabled = false;
                btn.textContent = "Submit Request";
                alert("Something went wrong.");
            });
    });
}

