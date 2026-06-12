const toggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
if (toggle && nav) toggle.addEventListener('click', ()=> nav.classList.toggle('open'));

const sections = document.querySelectorAll('.section');
if ('IntersectionObserver' in window) {
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if (e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, {threshold:0.12});
  sections.forEach(s=>obs.observe(s));
} else {
  sections.forEach(s=>s.classList.add('visible'));
}

// --- Active nav highlight (robust for Netlify redirects) ---
(function(){
  function norm(p){
    if(!p) return '/';
    // strip trailing slash
    if(p.length>1 && p.endsWith('/')) p = p.slice(0,-1);
    return p;
  }
  var path = norm(window.location.pathname);
  var links = document.querySelectorAll('.nav a');
  links.forEach(function(a){
    a.classList.remove('active');
  });
  // try exact match first
  var exact = Array.from(links).find(function(a){
    return norm(a.getAttribute('href')) === path;
  });
  if(exact){ exact.classList.add('active'); return; }
  // fallback: match by ending (e.g. /pages/angebote.html)
  var fallback = Array.from(links).find(function(a){
    var h = a.getAttribute('href') || '';
    return h && path.endsWith(h.replace(/^.*\//,'/'));
  });
  if(fallback){ fallback.classList.add('active'); }
})();
