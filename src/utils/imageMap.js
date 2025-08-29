const modules = import.meta.glob(
  '../assets/**/*.{jpeg,jpg,png,webp,avif}',
  { eager: true } 
);


const toSlug = (s = '') =>
  s.toString().trim().toLowerCase().replace(/[^a-z0-9]+/g, '-'); 

const toCompact = (s = '') => toSlug(s).replace(/-/g, '');       

const baseName = (path) =>
  path.split('/').pop().replace(/\.(jpeg|jpg|png|webp|avif)$/i, ''); 

const FILE_URLS = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => {
    const key = baseName(path).toLowerCase();
    
    const url = mod?.default || mod;
    return [key, url];
  })
);

const ALIASES = {

};

export function findLocalImage(titleOrKey) {
  if (!titleOrKey) return null;


  const slug = toSlug(titleOrKey);         
  const compact = toCompact(titleOrKey);   

  
  const alias = ALIASES[slug] || ALIASES[compact];

  return (
    (alias && FILE_URLS[alias]) ||
    FILE_URLS[slug] ||
    FILE_URLS[compact] ||
    null
  );
}


export function resolveImage(item) {
  return (
    findLocalImage(item?.image_key) ||
    findLocalImage(item?.title) ||
    item?.image_url ||
    '/default-trek-image.jpg'
  );
}

export { toSlug, toCompact };
