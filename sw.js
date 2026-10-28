const V='ledger-v2';
const CDN='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
const FILES=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil((async()=>{const c=await caches.open(V);await Promise.all(FILES.map(f=>c.add(f).catch(()=>{})));try{await c.add(new Request(CDN,{mode:'cors'}))}catch(_){}self.skipWaiting();})())});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==V)await caches.delete(k);await self.clients.claim();})())});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.hostname.endsWith('supabase.co'))return;
 if(r.mode==='navigate'){e.respondWith(fetch(r).then(x=>{const cp=x.clone();caches.open(V).then(c=>c.put('./index.html',cp));return x}).catch(()=>caches.match('./index.html')));return;}
 if(u.href===CDN||u.origin===location.origin){e.respondWith(caches.match(r).then(m=>{const net=fetch(r).then(x=>{if(x&&(x.ok||x.type==='opaque')){const cp=x.clone();caches.open(V).then(c=>c.put(r,cp))}return x}).catch(()=>m);return m||net;}));}
});
