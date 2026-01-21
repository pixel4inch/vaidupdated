class MetatagComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
      
        <!-- Primary Meta Tags -->
        <meta name="description" content="VAID is a leading architecture and interior design firm in Hyderabad, delivering luxury residential, commercial, and landscape design solutions.">
        <meta name="keywords" content="architecture firm in Hyderabad, interior designers in Hyderabad, luxury interior designers, residential architects, commercial architects, VAID architects, Vasantha Architecture & Interior Designers, landscape designers Hyderabad">
        <meta name="author" content="VAID – Vasantha Architecture & Interior Designers">
        <meta name="robots" content="index, follow">
        
        <meta property="og:title" content="VAID | Architecture & Interior Design Firm in Hyderabad">
        <meta property="og:description" content="Luxury architecture and interior design solutions for residential, commercial, and hospitality projects by VAID.">
        <meta property="og:type" content="website">
        <meta property="og:url" content="https://www.yourwebsite.com">
        <meta property="og:image" content="https://www.yourwebsite.com/images/vaid-og-image.jpg">

      
        <meta name="description" content="VAID provides bespoke interior design services in Hyderabad for homes, offices, and hospitality spaces with premium finishes.">
        <meta name="keywords" content="interior designers Hyderabad, luxury interiors, home interior design, office interiors Hyderabad">
        <meta name="robots" content="index, follow">

        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="VAID | Architecture & Interior Design Firm">
        <meta name="twitter:description" content="Innovative architecture and interior design firm in Hyderabad delivering premium design solutions.">
        <meta name="twitter:image" content="https://www.yourwebsite.com/images/vaid-og-image.jpg">
  


      `;
    }
}

customElements.define('metatag-component', MetatagComponent);



