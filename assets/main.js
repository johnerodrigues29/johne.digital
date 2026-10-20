(()=>{'use strict';
const config=window.JOHNE_CONFIG||{},phone=(config.whatsapp||'').replace(/\D/g,''),email=(config.email||'').trim();
const validPhone=/^\d{10,15}$/.test(phone),validEmail=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());
const toggle=document.querySelector('.menu-toggle'),panel=document.querySelector('#mobile-menu');
if(toggle&&panel){
 function closeMenu(restoreFocus=true){if(!panel.open)return;panel.close();document.documentElement.classList.remove('nav-open');toggle.setAttribute('aria-expanded','false');if(restoreFocus)toggle.focus({preventScroll:true});}
 toggle.addEventListener('click',()=>{panel.showModal();document.documentElement.classList.add('nav-open');toggle.setAttribute('aria-expanded','true');});
 panel.querySelector('.menu-close').addEventListener('click',()=>closeMenu());
 panel.addEventListener('cancel',e=>{e.preventDefault();closeMenu();});
 panel.addEventListener('close',()=>{document.documentElement.classList.remove('nav-open');toggle.setAttribute('aria-expanded','false');});
 panel.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{closeMenu(false);const href=a.getAttribute('href');if(href.startsWith('#')){const target=document.querySelector(href);if(target){target.setAttribute('tabindex','-1');target.focus({preventScroll:true});target.addEventListener('blur',()=>target.removeAttribute('tabindex'),{once:true});}}}));
 window.matchMedia('(min-width:761px)').addEventListener('change',e=>{if(e.matches)closeMenu(false);});
}
document.querySelectorAll('[data-contact="whatsapp"]').forEach(a=>{if(validPhone){a.hidden=false;a.href='https://wa.me/'+phone+'?text='+encodeURIComponent('Olá, Johne! Conheci a Johne Digital e gostaria de conversar sobre um projeto.');}});
document.querySelectorAll('[data-contact="email"]').forEach(a=>{if(validEmail){a.hidden=false;a.href='mailto:'+email;}});
const sticky=document.querySelector('.mobile-cta'),contact=document.querySelector('#contato');if(sticky&&contact&&'IntersectionObserver' in window){new IntersectionObserver(entries=>{sticky.hidden=entries[0].isIntersecting;},{threshold:0}).observe(contact);}
const form=document.querySelector('#brief-form');if(form){const btn=form.querySelector('button');if(validPhone)btn.firstChild.textContent='Continuar no WhatsApp ';else if(validEmail)btn.firstChild.textContent='Continuar por e-mail ';else btn.firstChild.textContent='Copiar mensagem do projeto ';
document.querySelector('#form-note').textContent=validPhone?'Você revisa e envia a mensagem pelo WhatsApp.':validEmail?'A mensagem será aberta no seu aplicativo de e-mail.':'Prepare e copie uma descrição do seu projeto. Os canais de atendimento serão disponibilizados em breve.';
form.addEventListener('submit',async e=>{e.preventDefault();const data=new FormData(form),msg=`Olá, Johne! Meu nome é ${data.get('name')}.\nTenho interesse em: ${data.get('service')}.\n\n${data.get('message')}`;if(validPhone){location.href='https://wa.me/'+phone+'?text='+encodeURIComponent(msg);}else if(validEmail){location.href='mailto:'+email+'?subject='+encodeURIComponent('Projeto — Johne Digital')+'&body='+encodeURIComponent(msg);}else{await copy(msg,document.querySelector('#form-status'));}});}
async function copy(text,status){try{await navigator.clipboard.writeText(text);status.textContent='Copiado!';}catch{status.textContent='Selecione e copie: '+text;}}
const share=document.querySelector('#share-card');if(share)share.addEventListener('click',async()=>{const url='https://johne.digital/contato/',status=document.querySelector('#card-status');if(navigator.share){try{await navigator.share({title:'Johne Digital — Johne Rodrigues',url});}catch(e){if(e.name!=='AbortError')await copy(url,status);}}else await copy(url,status);});
const save=document.querySelector('#save-contact');if(save)save.addEventListener('click',()=>{const lines=['BEGIN:VCARD','VERSION:3.0','N:Rodrigues;Johne;;;','FN:Johne Rodrigues','ORG:Johne Digital','TITLE:Criação de sites e marketing digital','URL:https://johne.digital'];if(validPhone)lines.push('TEL;TYPE=CELL:+'+phone);if(validEmail)lines.push('EMAIL:'+email);lines.push('END:VCARD');const blob=new Blob([lines.join('\r\n')+'\r\n'],{type:'text/vcard;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='Johne-Digital.vcf';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);document.querySelector('#card-status').textContent='Contato preparado para salvar no seu dispositivo.';});
const qrDialog=document.querySelector('#qr-dialog');
if(qrDialog){let qrOpener=null;
 document.querySelectorAll('[data-qr-open]').forEach(button=>button.addEventListener('click',()=>{qrOpener=button;qrDialog.showModal();document.documentElement.classList.add('qr-open');}));
 qrDialog.querySelector('[data-qr-close]').addEventListener('click',()=>qrDialog.close());
 qrDialog.addEventListener('click',event=>{if(event.target!==qrDialog)return;const box=qrDialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)qrDialog.close();});
 qrDialog.addEventListener('close',()=>{document.documentElement.classList.remove('qr-open');if(qrOpener)qrOpener.focus();});
}
})();