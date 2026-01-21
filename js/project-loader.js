/**
 * Project Image Loader
 * Dynamically loads project images from corresponding folder structures
 */

class ProjectImageLoader {
    constructor() {
        this.basePath = '../../images/projects/';
        this.imageExtensions = ['jpg', 'jpeg', 'png', 'webp'];
        this.projectFolders = {
            architecture: {
                apartments: ['BDA', 'NANDYAL', 'Vizag-Appartments'],
                commercial: ['Rohit', 'Satya'],
                'farm-house': ['COCO-FARM-HOUSE', 'Manduva', 'Nandakishore', 'Sri Krishna', 'TamilNadu'],
                'gated-community': ['CHEPALUPPADA', 'Imark', 'IRSE', 'KAPULAPPADA', 'Web arch resort'],
                hospital: ['01 OM PRAKASH'],
                industrial: ['05 Rahul Factory', 'CADBURY', 'CCL', 'ICHOR'],
                institution: ['05 KALPATARU'],
                restaurant: ['Runway 9', 'Sir option wm renders', 'wm'],
                sports: ['SUPRIUM SPORTS', 'Web arch institution AYRA']
            },
            interirors: {
                apartments: ['NIKITHA-APARNA-ONE'],
                commercial: ['SRINIVAS-OFFICE'],
                conventions: ['BANQUET-HALL'],
                'farm-house': ['COCO-FARM-HOUSE', 'Manduva'],
                hospital: ['ELEDENT'],
                industrial: ['ICHOR-INTERIORS'],
                institution: ['AYRA-ACCOMODATION-BLOCK'],
                sports: ['AYRA'],
                villa: ['TEJU-VILLA']
            },
            landscape: {
                apartments: ['Generic Landscape'],
                commercial: ['Generic Landscape'],
                'farm-house': ['Generic Landscape'],
                'gated-community': ['Generic Landscape'],
                hospital: ['Generic Landscape'],
                industrial: ['Generic Landscape'],
                institution: ['Generic Landscape'],
                restaurant: ['Generic Landscape'],
                sports: ['Generic Landscape']
            }
        };
    }

    /**
     * Get current page category and subcategory from URL
     */
    getCurrentPageInfo() {
        const path = window.location.pathname;
        const pathParts = path.split('/');
        
        // Extract category (architecture/interirors/landscape) and subcategory
        let category = '';
        let subcategory = '';
        
        if (pathParts.includes('architecture')) {
            category = 'architecture';
        } else if (pathParts.includes('interirors')) {
            category = 'interirors';
        } else if (pathParts.includes('landscape')) {
            category = 'landscape';
        }
        
        // Get subcategory from filename
        const filename = pathParts[pathParts.length - 1];
        subcategory = filename.replace('.html', '');
        
        return { category, subcategory };
    }

    /**
     * Get project folders for current page
     */
    getProjectFolders() {
        const { category, subcategory } = this.getCurrentPageInfo();
        
        if (!this.projectFolders[category] || !this.projectFolders[category][subcategory]) {
            console.warn(`No folders found for ${category}/${subcategory}`);
            return [];
        }
        
        return this.projectFolders[category][subcategory];
    }

    /**
     * Generate image paths for a project folder
     */
    generateImagePaths(folderName, maxImages = 10) {
        const { category, subcategory } = this.getCurrentPageInfo();
        let categoryPath = category;
        let subcategoryPath = subcategory.toUpperCase();
        
        // Handle path mappings based on actual folder structure
        if (category === 'architecture') {
            categoryPath = 'archtechure'; // Note: keeping original misspelling to match folder structure
            if (subcategory === 'apartments') {
                subcategoryPath = 'Apartments';
            } else if (subcategory === 'commercial') {
                subcategoryPath = 'COMMERCIAL';
            } else if (subcategory === 'farm-house') {
                subcategoryPath = 'FARM HOUSE';
            } else if (subcategory === 'gated-community') {
                subcategoryPath = 'Gated-Community';
            } else if (subcategory === 'hospital') {
                subcategoryPath = 'HOSPITALS';
            } else if (subcategory === 'industrial') {
                subcategoryPath = 'Industrial';
            } else if (subcategory === 'institution') {
                subcategoryPath = 'INSTITUTION';
            } else if (subcategory === 'restaurant') {
                subcategoryPath = 'RESTAURANT';
            } else if (subcategory === 'sports') {
                subcategoryPath = 'SPORTS';
            }
        } else if (category === 'interirors') {
            if (subcategory === 'apartments') {
                subcategoryPath = 'APARTMENTS';
            } else if (subcategory === 'commercial') {
                subcategoryPath = 'COMMERCIAL';
            } else if (subcategory === 'conventions') {
                subcategoryPath = 'CONVENTIONS';
            } else if (subcategory === 'farm-house') {
                subcategoryPath = 'FARM-HOUSE';
            } else if (subcategory === 'hospital') {
                subcategoryPath = 'HOSPITAL';
            } else if (subcategory === 'industrial') {
                subcategoryPath = 'INDUSTRIAL';
            } else if (subcategory === 'institution') {
                subcategoryPath = 'INSTITUTION';
            } else if (subcategory === 'sports') {
                subcategoryPath = 'SPORTS';
            } else if (subcategory === 'villa') {
                subcategoryPath = 'VILLA';
            }
        }
        
        const images = [];
        
        // Special handling for landscape category (generic images)
        if (category === 'landscape' && folderName === 'Generic Landscape') {
            const landscapeBasePath = `${this.basePath}landscape/`;
            for (let i = 1; i <= 3; i++) {
                this.imageExtensions.forEach(ext => {
                    images.push(`${landscapeBasePath}${i}.${ext}`);
                });
            }
            return images;
        }
        
        const baseFolderPath = `${this.basePath}${categoryPath}/${subcategoryPath}/`;
        
        // Generate potential image paths
        for (let i = 1; i <= maxImages; i++) {
            this.imageExtensions.forEach(ext => {
                // Common patterns
                images.push(`${baseFolderPath}${folderName}/${i}.${ext}`);
                images.push(`${baseFolderPath}${folderName}/a${i}.${ext}`);
                images.push(`${baseFolderPath}${folderName}/A${i}.${ext}`);
                images.push(`${baseFolderPath}${folderName}/img${i}.${ext}`);
                images.push(`${baseFolderPath}${folderName}/image${i}.${ext}`);
                images.push(`${baseFolderPath}${folderName}/IMG${i}.${ext}`);
                images.push(`${baseFolderPath}${folderName}/Image${i}.${ext}`);
            });
        }
        
        return images;
    }

    /**
     * Check if image exists
     */
    async imageExists(url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    }

    /**
     * Get valid images for a project folder
     */
    async getValidImages(folderName, maxImages = 10) {
        const potentialImages = this.generateImagePaths(folderName, maxImages);
        const validImages = [];
        
        for (const imagePath of potentialImages) {
            if (await this.imageExists(imagePath)) {
                validImages.push(imagePath);
                if (validImages.length >= 5) break; // Limit to 5 images per project
            }
        }
        
        return validImages;
    }

    /**
     * Generate project data for current page
     */
    async generateProjectData() {
        const folders = this.getProjectFolders();
        const projects = [];
        
        for (const folder of folders) {
            const images = await this.getValidImages(folder);
            if (images.length > 0) {
                projects.push({
                    id: folder.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                    title: this.formatTitle(folder),
                    description: this.generateDescription(folder),
                    images: images,
                    thumbnail: images[0]
                });
            }
        }
        
        return projects;
    }

    /**
     * Format folder name to readable title
     */
    formatTitle(folderName) {
        return folderName
            .replace(/[-_]/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase())
            .replace(/\b(BDA|ICHOR|AYRA|CCL)\b/g, match => match.toUpperCase());
    }

    /**
     * Generate description based on folder name and category
     */
    generateDescription(folderName) {
        const { category, subcategory } = this.getCurrentPageInfo();
        const descriptions = {
            architecture: {
                apartments: 'Multi-residential architectural design with modern amenities',
                commercial: 'Commercial building design with functional workspace solutions',
                'farm-house': 'Rural residential architecture blending with natural landscape',
                'gated-community': 'Planned community development with integrated facilities',
                hospital: 'Healthcare facility design prioritizing patient comfort and functionality',
                industrial: 'Industrial facility design optimized for operational efficiency',
                institution: 'Educational and institutional building design',
                restaurant: 'Restaurant and hospitality space architectural design',
                sports: 'Sports facility architecture promoting active lifestyle'
            },
            interirors: {
                apartments: 'Contemporary apartment interior design with modern furnishings',
                commercial: 'Professional office interior design for productive work environments',
                conventions: 'Event space interior design for gatherings and celebrations',
                'farm-house': 'Rural interior design connecting with natural surroundings',
                hospital: 'Healthcare interior design focused on healing environments',
                industrial: 'Functional industrial interior design for operational efficiency',
                institution: 'Educational interior design promoting learning and collaboration',
                sports: 'Sports facility interior design for performance and comfort',
                villa: 'Luxury residential interior design with premium finishes'
            },
            landscape: {
                apartments: 'Residential landscape design with community spaces',
                commercial: 'Commercial landscape design enhancing business environments',
                'farm-house': 'Rural landscape design integrating with natural terrain',
                'gated-community': 'Community landscape design with recreational facilities',
                hospital: 'Therapeutic landscape design promoting wellness',
                industrial: 'Industrial landscape design balancing function and aesthetics',
                institution: 'Educational landscape design for outdoor learning',
                restaurant: 'Hospitality landscape design creating inviting atmospheres',
                sports: 'Sports landscape design for athletic activities'
            }
        };
        
        const baseDescription = descriptions[category]?.[subcategory] || 'Professional design project';
        return `${baseDescription} featuring innovative solutions and quality craftsmanship.`;
    }

    /**
     * Render projects to page
     */
    async renderProjects() {
        const projectsContainer = document.querySelector('.projects .row');
        if (!projectsContainer) {
            console.error('Projects container not found');
            return;
        }

        // Show loading state
        projectsContainer.innerHTML = `
            <div class="col-12 text-center py-5">
                <div class="spinner-border text-warning" role="status">
                    <span class="visually-hidden">Loading projects...</span>
                </div>
                <p class="mt-3 text-muted">Loading projects...</p>
            </div>
        `;

        try {
            const projects = await this.generateProjectData();
            
            if (projects.length === 0) {
                projectsContainer.innerHTML = `
                    <div class="col-12 text-center py-5">
                        <i class="fas fa-folder-open text-muted" style="font-size: 3rem;"></i>
                        <p class="mt-3 text-muted">No projects found for this category.</p>
                    </div>
                `;
                return;
            }

            // Render project cards
            projectsContainer.innerHTML = projects.map(project => `
                <div class="col-lg-4 col-md-6">
                    <div class="project-card" onclick="openProjectModal('${project.id}', '${project.title}', ${JSON.stringify(project.images).replace(/"/g, '&quot;')})">
                        <div class="card">
                            <img src="${project.thumbnail}" class="card-img-top" alt="${project.title}" loading="lazy">
                            <div class="card-body">
                                <h5 class="card-title">${project.title}</h5>
                                <p class="card-text">${project.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');

        } catch (error) {
            console.error('Error loading projects:', error);
            projectsContainer.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="fas fa-exclamation-triangle text-danger" style="font-size: 3rem;"></i>
                    <p class="mt-3 text-danger">Error loading projects. Please try again later.</p>
                </div>
            `;
        }
    }
}

// Initialize project loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const loader = new ProjectImageLoader();
    loader.renderProjects();
});

// Make openProjectModal function globally available
window.openProjectModal = function(projectId, title, images) {
    // Set modal title
    document.getElementById('projectModalLabel').textContent = title;

    // Clear existing carousel images
    const carouselInner = document.getElementById('carouselImages');
    carouselInner.innerHTML = '';

    // Add images to carousel
    images.forEach((image, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        carouselItem.innerHTML = `<img src="${image}" class="d-block w-100" alt="${title} - Image ${index + 1}" loading="lazy">`;
        carouselInner.appendChild(carouselItem);
    });

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('projectModal'));
    modal.show();
};