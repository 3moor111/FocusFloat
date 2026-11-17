// Plays the looping clips only while they are on screen, and never for people who prefer reduced motion.
(function(){
  var vids=[].slice.call(document.querySelectorAll('video.loop'));
  if(!vids.length)return;
  var still=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(still){vids.forEach(function(v){v.controls=true;});return;}
  if(!('IntersectionObserver' in window)){vids.forEach(function(v){v.preload='auto';v.play().catch(function(){});});return;}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){var v=e.target;
    if(e.isIntersecting){if(v.preload==='none')v.preload='auto';var p=v.play();if(p)p.catch(function(){});}else{v.pause();}});},{threshold:.35});
  vids.forEach(function(v){io.observe(v);});
})();
