const sharp = require('sharp');

module.exports = (url, alt = "Missing alt text") => {
    const imageName = url.split('.').shift(); // Extract image name (assuming no dots in the name itself)
    const outputFormats = ['avif', 'webp', 'jpg'];

    // Generate all required image formats 
    const formatPromises = outputFormats.map(format => { 
        return sharp(`/images/${url}`) // Adjust the path if needed
            .resize({ width: /* Adjust based on your media queries */ }) 
            [format]({ quality: /* Your desired quality setting */ }) 
            .toFile(`/images/${imageName}.${format}`); 
    });

    // Wait for all formats to be generated
    Promise.all(formatPromises)
        .then(() => {
            return `<picture>
                <source srcset="/images/${imageName}.avif" type="image/avif" media="(min-width: 1200px)">
                <source srcset="/images/${imageName}.webp" type="image/webp" media="(min-width: 1200px)">
                <source srcset="/images/${imageName}.avif" type="image/avif" media="(min-width: 740px)">
                <source srcset="/images/${imageName}.webp" type="image/webp" media="(min-width: 740px)">
                <source srcset="/images/${imageName}.avif" type="image/avif" media="(min-width: 500px)">
                <source srcset="/images/${imageName}.webp" type="image/webp" media="(min-width: 500px)">
                <img src="/images/${imageName}.jpg" alt="${alt}" />
            </picture>`;
        })
        .catch(err => console.error("Error generating image formats:", err)); 
};
