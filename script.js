// MacBernard Soft Solutions
(function(){
  document.documentElement.classList.add('js');

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

  // Client carousel: logos step one place at a time; the client in the
  // center is highlighted and its details show in the fixed panel below.
  var clientData=[
    {name:'Alheri Model School',type:'School',address:'Gombe, Nigeria'},
    {name:'Linkhon School',type:'School',address:''},
    {name:'Cactus Hotel',type:'Hotel',address:'Gombe, Nigeria'},
    {name:'Flourish Hotel',type:'Hotel',address:''},
    {name:'Grand Ville Hotel &amp; Lounge',type:'Hotel &amp; Lounge',address:''},
    {name:'Tamusa Resort &amp; Apartment',type:'Resort &amp; Apartment',address:''}
  ];
  var car=document.querySelector('.marquee');
  if(!car) return;
  var track=car.querySelector('.marquee-track');
  var info=document.getElementById('clientInfo');
  var cards=Array.prototype.slice.call(track.children);
  var N=clientData.length;
  var idx=0,timer=null,paused=false,lastShown=-1;
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function show(i){
    var k=i%N;
    if(k===lastShown) return;
    lastShown=k;
    var d=clientData[k];
    if(info){
      info.innerHTML='<span class="ci-name">'+d.name+'</span>'+
        '<span class="ci-type">'+d.type+'</span>'+
        (d.address?'<span class="ci-address">'+d.address+'</span>':'');
      info.classList.remove('swap');void info.offsetWidth;info.classList.add('swap');
    }
  }
  function apply(i,animate){
    if(!animate){track.style.transition='none';}
    var c=cards[i];
    var x=car.clientWidth/2-(c.offsetLeft+c.offsetWidth/2);
    track.style.transform='translateX('+x+'px)';
    if(!animate){void track.offsetWidth;track.style.transition='';}
    cards.forEach(function(el,k){el.classList.toggle('is-center',k===i);});
  }
  function step(){
    idx++;apply(idx,true);show(idx);
    if(idx>=N){setTimeout(function(){idx-=N;apply(idx,false);},720);}
  }
  function play(){
    if(timer||reduce) return;
    timer=setInterval(function(){if(!document.hidden&&!paused)step();},3200);
  }
  car.addEventListener('mouseenter',function(){paused=true;});
  car.addEventListener('mouseleave',function(){paused=false;});
  window.addEventListener('resize',function(){apply(idx,false);});
  apply(0,false);show(0);
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(entries,obs){
      entries.forEach(function(e){
        if(e.isIntersecting){apply(idx,false);play();obs.disconnect();}
      });
    },{threshold:0.25}).observe(car);
  }else{play();}
})();
