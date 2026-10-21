/* GA4: após load + 3 segundos, preferindo tempo ocioso do navegador. */
(()=>{'use strict';
 if(!['johne.digital','www.johne.digital'].includes(window.location.hostname))return;
 let scheduled=false,loaded=false;
 function loadAnalytics(){
  if(loaded)return;loaded=true;
  window.dataLayer=window.dataLayer||[];
  window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
  window.gtag('js',new Date());
  window.gtag('config','G-LZSYCB6EYJ');
  const script=document.createElement('script');
  script.async=true;
  script.src='https://www.googletagmanager.com/gtag/js?id=G-LZSYCB6EYJ';
  document.head.appendChild(script);
 }
 function schedule(){
  if(scheduled)return;scheduled=true;
  window.setTimeout(()=>{
   if('requestIdleCallback' in window)window.requestIdleCallback(loadAnalytics,{timeout:1500});
   else loadAnalytics();
  },3000);
 }
 if(document.readyState==='complete')schedule();
 else window.addEventListener('load',schedule,{once:true});
})();
