module.exports = (photo, alt = "Missing alt text") => { // Accept a 'photo' object
  return `<picture class="lazy lazy-initial">
  <source srcset="/images/tiny/${photo.url}" media="(min-width: 1600px)"> 
  <source srcset="/images/tiny/${photo.url}" media="(min-width: 480px)"> 
  <img src="/images/tiny/${photo.url}" alt="${alt}" /></picture>`;
};
