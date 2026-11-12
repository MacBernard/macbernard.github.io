// MacBernard Soft Solutions
(function(){
  var nav=document.querySelector('.nav');
  var onScroll=function(){nav.classList.toggle('scrolled',window.scrollY>10);};
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();

  var toggle=document.getElementById('navToggle');
  var links=document.getElementById('navLinks');
  toggle.addEventListener('click',function(){
    var open=links.classList.toggle('open');
    toggle.classList.toggle('open',open);
    toggle.setAttribute('aria-expanded',open?'true':'false');
  });
  links.addEventListener('click',function(e){
    if(e.target.tagName==='A'){links.classList.remove('open');toggle.classList.remove('open');}
  });

  document.getElementById('year').textContent=new Date().getFullYear();
  var marquee=document.querySelector('.marquee');
  if(marquee){
    if('IntersectionObserver' in window){
      new IntersectionObserver(function(entries,obs){
        entries.forEach(function(e){
          if(e.isIntersecting){marquee.classList.add('run');obs.disconnect();}
        });
      },{threshold:0.2}).observe(marquee);
    }else{
      marquee.classList.add('run');
    }
  }
})();