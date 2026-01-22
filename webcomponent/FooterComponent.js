
// Footer widgets script

// Scroll To Top Button







class FooterComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
      
      
	 <footer class="footer py-5">
        <div class="container">
            <div class="row g-4">
                <div class="col-lg-3 col-md-6">
                    <img src="images/logo.svg" alt="VAID Logo" class="mb-4" height="40">
                    <p>VAID is a multidisciplinary architecture and interior design firm specializing in sustainable and
                        green buildings with 15+ years of experience.</p>
                </div>
                <div class="col-lg-3 col-md-6">
                    <h5>Quick Links</h5>
                    <ul class="list-unstyled footer-links">
                        <li><a href="index.html">Home</a></li>
                        
                        <li><a href="about.html">About Us</a></li>
                        <li><a href="architecture.html">Projects</a></li>
                        <li><a href="media.html">Media</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </div>
                <div class="col-lg-3 col-md-6">
                    <h5>Contact Us</h5>
                    <ul class="list-unstyled footer-contact">
                        <li><i class="fas fa-map-marker-alt me-2"></i> 555A, Road No. 28, Jubilee Hills, Hyderabad</li>
                        <li><i class="fas fa-phone me-2"></i> 8977366999</li>
                        <li><i class="fas fa-envelope me-2"></i> info@vaidarchitects.com</li>
                    </ul>
                </div>
                <div class="col-lg-3 col-md-6">
                    <h5>Follow Us</h5>
                    <div class="social-icons">
                        <a href="https://www.instagram.com/vaidarchitect/" class="me-2" target="_blank"><i
                                class="fab fa-instagram"></i></a>

                        <a href="https://www.facebook.com/vaid.architects" target="_blank"><i
                                class="fab fa-facebook"></i></a>
                        <a href="https://www.youtube.com/@vaidarchitects184" target="_blank"><i
                                class="fab fa-youtube"></i></a>
                        <a href="https://www.linkedin.com/company/14507970/admin/dashboard/" class="me-2"
                            target="_blank"><i class="fab fa-linkedin"></i></a>
                        <a href="https://x.com/architects_vaid" target="_blank"><i class="fab fa-twitter"></i></a>
                    </div>
                </div>
            </div>
            <hr class="my-4 footer-divider">
            <div class="row">
                <div class="col-md-6">
                    <p class="mb-md-0">© 2026 VAID Architects. All Rights Reserved.</p>
                </div>
                <div class="col-md-6 text-md-end">
                    <p class="mb-0">Designed with <i class="fas fa-heart text-gold"></i> by VAID</p>
                </div>
            </div>
        </div>
    </footer>


  <!-- FLOATING BUTTONS WITH TOOLTIPS -->
<div class="floating-buttons">

    <!-- Scroll To Top -->
    <div class="btn-wrapper">
        <button id="scrollTopBtn" class="float-btn scroll-top">↑</button>
        <span class="tooltip">Back to Top</span>
    </div>

    <!-- WhatsApp Button -->
    <div class="btn-wrapper">
        <a href="https://web.whatsapp.com/send?phone=8977366999" 
           target="_blank" 
           class="float-btn whatsapp-btn">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png">
        </a>
        <span class="tooltip">WhatsApp Us</span>
    </div>

    

    <!-- Contact Form Button -->
    <div class="btn-wrapper d-none">
        <button id="formToggle" class="float-btn form-btn">✍</button>
        <span class="tooltip">Send Details</span>
    </div>
</div>


<!-- POPUP FORM -->
<div id="contactForm" class="form-popup">
    <div class="form-box">
        <div class="form-header">
            Contact Form
            <span id="closeForm">✖</span>
        </div>

        <form id="detailsForm">
            <label>Name</label>
            <input type="text" required>

            <label>Details</label>
            <textarea rows="3" required></textarea>

            <label>Phone Number</label>
            <input type="tel" required>

            <label>Email</label>
            <input type="email" required>

            <button type="submit" class="submit-btn">Submit</button>
        </form>
    </div>
</div>

  
      `;
    }
}

customElements.define('footer-component', FooterComponent);



// Scroll To Top
let scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollBtn.classList.add("show");
    } else {
        scrollBtn.classList.remove("show");
    }
});

scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


// Contact Form Toggle
const formPopup = document.getElementById("contactForm");
const openForm = document.getElementById("formToggle");
const closeForm = document.getElementById("closeForm");

openForm.addEventListener("click", () => {
    formPopup.style.display = "flex";
});

closeForm.addEventListener("click", () => {
    formPopup.style.display = "none";
});


// Form Submission
document.getElementById("detailsForm").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you! Your details have been submitted. We will contact you soon.");
    formPopup.style.display = "none";
});



/*
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/6931144ce40960197cefd1cf/1jbjrejhj';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();

*/