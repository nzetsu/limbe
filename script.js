
const reveals=document.querySelectorAll('.reveal');const ro=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');ro.unobserve(e.target)}}),{threshold:.1});reveals.forEach(e=>ro.observe(e));
const nav=document.getElementById('nav');addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>70));
const mobile=document.getElementById('mobileCTA'),interest=document.getElementById('interest');new IntersectionObserver(es=>es.forEach(e=>mobile.classList.toggle('hide',e.isIntersecting)),{threshold:.15}).observe(interest);
const form=document.getElementById('interestForm'),success=document.getElementById('success');form.addEventListener('submit',e=>{e.preventDefault();if(!form.checkValidity()){form.reportValidity();return}form.querySelector('button').innerHTML='<span>DANKE!</span><b>✓</b>';success.classList.add('show');success.scrollIntoView({behavior:'smooth',block:'nearest'})});
