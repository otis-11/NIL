---
description: Run end-to-end tests on all components (Express server, LiveKit agent, API endpoints)
---

# End-to-End Test

Validates that all three components (Express server, Vercel frontend, LiveKit agent) are functioning correctly.

## Pre-flight

// turbo
1. Verify Node.js is available:
```bash
node --version
```

// turbo
2. Verify dependencies are installed:
```bash
ls node_modules/.package-lock.json && ls agent/node_modules/.package-lock.json
```

## Express Server Tests

3. Start the Express server (if not already running):
```bash
npm start
```

4. Run the endpoint validation script:
```bash
node -e "
const http = require('http');
function get(p,h){return new Promise((r,j)=>{http.get({hostname:'localhost',port:3000,path:p,headers:h||{Accept:'text/html'}},res=>{let b='';res.on('data',d=>b+=d);res.on('end',()=>r({s:res.statusCode,l:res.headers.location||'',b}));}).on('error',j);})}
function post(p,body){return new Promise((r,j)=>{const req=http.request({hostname:'localhost',port:3000,path:p,method:'POST',headers:{'Content-Type':'application/json'}},res=>{let b='';res.on('data',d=>b+=d);res.on('end',()=>r({s:res.statusCode,b}));});req.on('error',j);req.write(JSON.stringify(body));req.end();})}
(async()=>{
  let pass=0,fail=0;
  function check(name,ok){ok?pass++:fail++;console.log((ok?'✅':'❌')+' '+name);}

  let r=await get('/');check('GET / → 302 /login',r.s===302);
  r=await get('/widget');check('GET /widget → 200',r.s===200&&r.b.includes('DOCTYPE'));
  r=await get('/widget/embed.js');check('GET /widget/embed.js → 200',r.s===200);
  r=await post('/widget/api/chat',{message:'hello'});check('POST /widget/api/chat → 200',r.s===200);
  r=await post('/widget/api/chat',{});check('POST /widget/api/chat (empty) → 400',r.s===400);
  r=await get('/dashboard');check('GET /dashboard → 302 /login',r.s===302&&r.l.includes('login'));
  r=await get('/admin');check('GET /admin → 302 /login',r.s===302&&r.l.includes('login'));
  r=await get('/dashboard/api/calls');check('GET /dashboard/api/calls → 302',r.s===302);
  r=await get('/admin/api/calls');check('GET /admin/api/calls → 302',r.s===302);
  r=await get('/auth/google');check('GET /auth/google → 302',r.s===302);

  console.log('\nResult: '+pass+'/'+(pass+fail)+' passed');
  process.exit(fail>0?1:0);
})().catch(e=>{console.error('ERROR:',e.message);process.exit(1)});
"
```

## LiveKit Agent Test

5. Verify the agent TypeScript compiles:
```bash
cd agent && npx tsc --noEmit
```

6. Boot the agent and verify it connects to LiveKit Cloud:
```bash
cd agent && npm run dev
```
Expected output: `registered worker` with LiveKit Cloud server info. Kill with Ctrl+C after verification.

## LiveKit API Credential Test

7. Validate LiveKit API credentials:
```bash
node -e "
const crypto=require('crypto'),https=require('https');
const k=process.env.LIVEKIT_API_KEY,s=process.env.LIVEKIT_API_SECRET,u=process.env.LIVEKIT_URL;
const h=Buffer.from(JSON.stringify({alg:'HS256',typ:'JWT'})).toString('base64url');
const n=Math.floor(Date.now()/1000);
const p=Buffer.from(JSON.stringify({iss:k,nbf:n,exp:n+300,video:{roomList:true}})).toString('base64url');
const sig=crypto.createHmac('sha256',s).update(h+'.'+p).digest('base64url');
const t=h+'.'+p+'.'+sig;
const req=https.request(u.replace('wss://','https://')+'/twirp/livekit.RoomService/ListRooms',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+t}},res=>{let b='';res.on('data',d=>b+=d);res.on('end',()=>{console.log(res.statusCode===200?'✅ LiveKit API: authenticated':'❌ LiveKit API: '+res.statusCode);});});
req.write('{}');req.end();
"
```

## Gemini API Test

8. Validate Google Gemini API key:
```bash
node -e "
const https=require('https');
https.get('https://generativelanguage.googleapis.com/v1beta/models?key='+process.env.GOOGLE_API_KEY,res=>{
  console.log(res.statusCode===200?'✅ Gemini API: valid key':'❌ Gemini API: status '+res.statusCode);
});
"
```
