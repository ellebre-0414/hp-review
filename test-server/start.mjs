import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createApp } from './TWIY LEGAL OFFICE/server.mjs';

const root=path.dirname(fileURLToPath(import.meta.url));
const host=process.env.HOST||'127.0.0.1';
const port=Number(process.env.PORT||8787);
const publicOrigin=process.env.PUBLIC_ORIGIN||'';
if (!Number.isInteger(port)||port<1||port>65535) throw new Error('PORTは1〜65535の番号にしてください。');
if (publicOrigin) {
  const url=new URL(publicOrigin);
  if (!['http:','https:'].includes(url.protocol)||url.origin!==publicOrigin||url.username||url.password) throw new Error('PUBLIC_ORIGINは末尾の / やパスを含まないURLにしてください。');
}
if (!['127.0.0.1','localhost'].includes(host)&&!publicOrigin) throw new Error('外部アクセスにはPUBLIC_ORIGINを設定してください。');
const dataDir=process.env.DATA_DIR ? path.resolve(process.env.DATA_DIR) : path.join(root,'.runtime');
const app=createApp({dataDir,publicOrigin});
app.server.listen(port,host,()=>{
  const origin=publicOrigin||`http://127.0.0.1:${port}`;
  console.log(`法律事務所: ${origin}/`);
  console.log(`塾: ${origin}/TWIY%20BRAND%20HP/site/01_current/index.html`);
  console.log(`アパレル: ${origin}/TWIY%20BRAND%20HP/site/01_current/brand.html`);
  if(app.bootstrapToken) console.log(`初回管理者設定（共有禁止）: ${origin}/admin.html#setup=${app.bootstrapToken}`);
});
let closing=false;
for(const signal of ['SIGINT','SIGTERM']) process.on(signal,()=>{
  if(closing)return;closing=true;
  app.server.close(error=>{process.exitCode=error?1:0;});
});
