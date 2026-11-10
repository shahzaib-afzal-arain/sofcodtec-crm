import {companies} from '../../data/mock';
import {read as readAudits,result as sampleResult} from '../AuditCenter/auditData';

export const KEY='crm-opportunity-sheets-state';
export const statuses=['New Lead','Under Review','Contacted','Discovery Scheduled','Qualified','Opportunity Validated','Pitch Ready','Proposal Sent'];
export const priorities=['Critical','High','Medium','Low'];
const next={
 'New Lead':['Under Review','Contacted'],
 'Under Review':['Contacted','Discovery Scheduled','Qualified'],
 Contacted:['Under Review','Discovery Scheduled'],
 'Discovery Scheduled':['Under Review','Qualified'],
 Qualified:['Under Review','Opportunity Validated'],
 'Opportunity Validated':['Under Review','Pitch Ready'],
 'Pitch Ready':['Under Review','Proposal Sent'],
 'Proposal Sent':['Under Review']
};
export const allowedStatuses=r=>[r.status,...next[r.status]];
export const readiness=r=>({ 'New Lead':10,'Under Review':25,Contacted:35,'Discovery Scheduled':50,Qualified:65,'Opportunity Validated':80,'Pitch Ready':95,'Proposal Sent':100 }[r.status]);
export const isPitchReady=r=>['Pitch Ready','Proposal Sent'].includes(r.status);
export const money=value=>value===null?'Estimate unavailable':new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(value);
export function findings(audit){return audit.cards.filter(c=>c.score!==null&&c.score<80).map(c=>({...c}));}
export function fixtureRows(){return companies.slice(0,6).map((c,i)=>{
 const issues=findings(sampleResult(i));
 return {id:'sample:'+c.domain,leadId:c.domain,auditId:null,name:c.name,domain:c.domain,platform:c.platform,contact:c.contact,status:c.stage,priority:priorities[[0,2,0,1,1,2][i]],value:Number(c.amount.replace(/[^\d.]/g,'')),title:issues[0].finding,findings:issues,auditStatus:'Sample findings only',source:'Opportunity demo fixture',updatedAt:null};
});}
function validRows(rows){
 const strings=['id','leadId','name','domain','platform','contact','title','source','auditStatus'];
 if(!Array.isArray(rows)||rows.some(r=>!r||strings.some(k=>typeof r[k]!=='string')||!r.id||!statuses.includes(r.status)||!priorities.includes(r.priority)||(r.auditId!==null&&typeof r.auditId!=='string')||(r.value!==null&&(!Number.isFinite(r.value)||r.value<0))||(r.updatedAt!==null&&(!Number.isFinite(Date.parse(r.updatedAt))))||!Array.isArray(r.findings)||!r.findings.length||r.findings.some(f=>!f||['title','finding','impact','recommendation','outreach','metrics'].some(k=>typeof f[k]!=='string')||!Number.isFinite(f.score)||f.score<0||f.score>100)))throw new Error('Opportunity storage needs review. Existing data has not been overwritten.');
 if(new Set(rows.map(r=>r.id)).size!==rows.length)throw new Error('Duplicate stored opportunity IDs; data unchanged.');
 return rows;
}
export function read(storage){const raw=storage.getItem(KEY);if(raw===null)return fixtureRows();let state;try{state=JSON.parse(raw);}catch{throw new Error('Opportunity storage is malformed; data unchanged.');}if(state?.version!==1)throw new Error('Unsupported opportunity storage version; data unchanged.');return validRows(state.records);}
export function save(storage,rows){read(storage);validRows(rows);storage.setItem(KEY,JSON.stringify({version:1,records:rows}));}
export function discover(storage){return readAudits(storage).filter(a=>a.status==='completed'&&findings(a.result).length).map(a=>({id:'audit:'+a.id,leadId:a.leadId,auditId:a.id,name:a.name,domain:a.domain,platform:a.platform,contact:'',status:'New Lead',priority:Math.min(...findings(a.result).map(f=>f.score))<65?'High':'Medium',value:null,title:findings(a.result)[0].finding,findings:findings(a.result),auditStatus:'Demo completed',source:'Audit Center demo intake',updatedAt:null}));}
export function append(rows,candidates){const ids=new Set(rows.map(r=>r.id)),audits=new Set(rows.map(r=>r.auditId).filter(Boolean));const added=[];for(const r of candidates){if(ids.has(r.id)||(r.auditId&&audits.has(r.auditId)))continue;validRows([r]);added.push(r);ids.add(r.id);if(r.auditId)audits.add(r.auditId);}return {rows:[...rows,...added],added:added.length};}
export function transition(rows,ids,status){if(!statuses.includes(status))throw new Error('Unsupported opportunity status.');let changed=0,skipped=0;const records=rows.map(r=>{if(!ids.includes(r.id))return r;if(r.status===status||!allowedStatuses(r).includes(status)){skipped++;return r;}changed++;return {...r,status,updatedAt:new Date().toISOString()};});return {rows:records,changed,skipped};}
export const emptyFilters=()=>({search:'',status:'all',priority:'all',platform:'all',value:'all',readiness:'all',sort:'value-desc'});
export function filter(rows,f){const out=rows.filter(r=>[r.name,r.domain,r.platform,r.title,r.contact,...r.findings.map(x=>x.finding)].join(' ').toLowerCase().includes(f.search.trim().toLowerCase())&&(f.status==='all'||r.status===f.status)&&(f.priority==='all'||r.priority===f.priority)&&(f.platform==='all'||r.platform===f.platform)&&(f.value==='all'||(r.value!==null&&(f.value==='low'?r.value<25000:f.value==='mid'?r.value>=25000&&r.value<50000:r.value>=50000)))&&(f.readiness==='all'||(f.readiness==='ready'?isPitchReady(r):!isPitchReady(r))));return out.sort((a,b)=>f.sort==='latest'?(Date.parse(b.updatedAt)||0)-(Date.parse(a.updatedAt)||0):f.sort==='priority'?priorities.indexOf(a.priority)-priorities.indexOf(b.priority):f.sort==='readiness'?readiness(b)-readiness(a):a.value===null?b.value===null?0:1:b.value===null?-1:f.sort==='value-asc'?a.value-b.value:b.value-a.value);}
export function statistics(rows){return {active:rows.reduce((n,r)=>n+r.findings.length,0),critical:rows.filter(r=>r.priority==='Critical').length,validated:rows.filter(r=>['Opportunity Validated','Pitch Ready','Proposal Sent'].includes(r.status)).length,ready:rows.filter(isPitchReady).length};}
export const disclaimer='Frontend demo: illustrative technical findings and deal estimates; no live crawl, AI analysis or verified revenue uplift. Status changes are local planning decisions, not proof of outreach, qualification or proposal delivery.';
export function summary(r){return `${r.name} (${r.domain})\n${r.title}\nPlatform: ${r.platform}\nOpportunity: ${r.status} | Priority: ${r.priority}\nEstimated deal value: ${money(r.value)}${r.value!==null?' (sample estimate; not revenue uplift)':''}\nSource: ${r.source} | Audit: ${r.auditStatus}\n${r.findings.map(f=>`${f.title} (${f.score}/100 health): ${f.finding}. ${f.metrics}\nPotential impact: ${f.impact}\nRecommendation: ${f.recommendation}\nTalking point: ${f.outreach}`).join('\n\n')}\nRevenue impact: Estimate unavailable - additional business data required.\n${disclaimer}`;}
const escape=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function report(rows){return '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Opportunity pitch report</title><style>body{font:15px/1.6 Arial;color:#102d4b;max-width:900px;padding:24px;margin:auto}section{break-before:page;border-top:2px solid #007c8a;margin:20px 0}section:first-of-type{break-before:auto}pre{font:inherit;white-space:pre-wrap;overflow-wrap:anywhere}@media print{body{padding:0}}</style></head><body><h1>Opportunity Pitch Report</h1><p>'+escape(disclaimer)+'</p>'+rows.map(r=>'<section><h2>'+escape(r.name)+'</h2><pre>'+escape(summary(r))+'</pre></section>').join('')+'</body></html>';}
const cell=value=>{const v=String(value??'');return '"'+(/^[=+@\-\t\r]/.test(v)?"'":'')+v.replaceAll('"','""')+'"';};
export function csv(rows){return '\uFEFF'+[['Opportunity ID','Lead ID','Audit ID','Company','Domain','Platform','Contact','Opportunity Status','Audit Status','Priority','Estimated Deal USD','Readiness Score','Title','Source','Last Local Update','Demo Disclaimer'],...rows.map(r=>[r.id,r.leadId,r.auditId,r.name,r.domain,r.platform,r.contact,r.status,r.auditStatus,r.priority,r.value,readiness(r),r.title,r.source,r.updatedAt??'No local activity',disclaimer])].map(r=>r.map(cell).join(',')).join('\r\n');}
export function download(content,name,type){const url=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
