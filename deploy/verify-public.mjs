#!/usr/bin/env node
// Read-only HTTP smoke tests. Does not create registrations or alter production data.
const site=process.env.SITE_URL ?? 'https://event.ayenehouse.ir';
const api=process.env.API_URL ?? 'https://api.event.ayenehouse.ir';
const key=process.env.SUPABASE_PUBLISHABLE_KEY;
if(!key){console.error('Set SUPABASE_PUBLISHABLE_KEY to the NEW self-hosted public key');process.exit(2)}
let failures=0;
async function check(name,url,init,verify){
 try {
   const response=await fetch(url,{...init,signal:AbortSignal.timeout(15000)});
   const body=await response.text();
   const result=verify(response,body);
   console.log((result?'PASS ':'FAIL ')+name+' ['+response.status+']');
   if(!result)failures++;
 } catch(e){console.error('FAIL '+name+': '+e.message);failures++}
}
const headers={'apikey':key,'Authorization':'Bearer '+key,'Content-Type':'application/json'};
await check('homepage',site+'/',{},(r,t)=>r.ok&&t.includes('id="root"'));
await check('tracking route',site+'/#tracking',{},(r,t)=>r.ok&&t.includes('id="root"'));
await check('admin route',site+'/#admin',{},(r,t)=>r.ok&&t.includes('id="root"'));
await check('public settings RPC',api+'/rest/v1/rpc/get_public_settings',{method:'POST',headers,body:'{}'},(r,t)=>{
 try{let x=JSON.parse(t);return r.ok&&typeof x==='object'&&('public.registration_enabled' in x)}catch{return false}
});
await check('reject invalid admin token',api+'/rest/v1/rpc/cms_admin_session_valid',
 {method:'POST',headers,body:JSON.stringify({p_token:'invalid-smoke-test-token'})},
 (r,t)=>r.ok&&t.trim()==='false');
await check('deny records with invalid admin token',api+'/rest/v1/rpc/cms_list_registrations',
 {method:'POST',headers,body:JSON.stringify({p_token:'invalid-smoke-test-token'})},
 (r)=>r.status>=400&&r.status<500);
await check('deny private file download',api+'/functions/v1/cms-file-download',
 {method:'POST',headers,body:JSON.stringify({token:'invalid-smoke-test-token',path:'invalid/file.pdf'})},
 (r)=>r.status===401);
console.log(failures?failures+' smoke test(s) failed':'All read-only smoke tests passed');
process.exitCode=failures?1:0;
