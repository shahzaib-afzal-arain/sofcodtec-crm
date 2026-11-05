import React from 'react';
const technology = [
  {name:'Shopify Plus',detail:'v2024.1',stores:474,arr:'$1.84M',growth:'+14.2%'},
  {name:'Salesforce Commerce Cloud',detail:'Enterprise',stores:299,arr:'$1.15M',growth:'+6.8%'},
  {name:'Magento / Adobe Commerce',detail:'2.4.x',stores:224,arr:'$867K',growth:'-2.4%'},
  {name:'BigCommerce Enterprise',detail:'Multi-Store',stores:151,arr:'$578K',growth:'+9.1%'},
  {name:'Custom Headless',detail:'Next.js / Hydrogen',stores:100,arr:'$385K',growth:'+22.8%'},
];
const alerts = [
  {company:'NordicVibe Apparel',badge:'Score 98.4 (Critical)',critical:true,issue:'Checkout telemetry detected critical 2.4s latency spike on Magento 2.4.3. High probability migration opportunity.',time:'4m ago',owner:'Marcus R.'},
  {company:'LuxLiving Home Decor',badge:'Headless Fix: +4.0',issue:'Core Web Vitals degraded below threshold (FID 340ms). Shopify Plus multi-currency bottleneck confirmed.',time:'12m ago',owner:'Elena R.'},
];
const stages = [
  ['Identified','1,248','100% Base','Dwell: 1.2d'],['Tech Audit','892','71.4% Conv','Dwell: 2.4d'],['Validated','412','46.1% Conv','Dwell: 4.8d'],['Proposal','188','45.6% Conv','Dwell: 5.1d'],['Closed Won','94','50.0% Win','Cycle: 18.4d'],
];
const reps = [
  ['Elena Rostova','Enterprise Mid-Market','$1.42M','104 audits run','142%'],
  ['Marcus Thorne','Shopify Strategist','$1.18M','24 audits run','118%'],
  ['Devon Patel','Headless Platforms','$940K','15 audits run','94%'],
];
export default function RevenuePanels(){return <div className="dashboard-panels">
  <section className="dashboard-panel dashboard-attribution"><div className="dashboard-panel-head"><div><h2>Tech Stack Penetration & Attribution</h2><p>Active e-commerce frameworks correlated with weighted ARR potential</p></div><span className="dashboard-tag dashboard-tag-success">● Audit Verified</span></div><div className="dashboard-attribution-bar" aria-label="Attribution by store count">{technology.map((item,i)=><span key={item.name} className={'dashboard-tech-color-'+i} style={{flex:item.stores}} title={`${item.name}: ${item.stores} stores`}/>)}</div><div className="dashboard-tech-rows">{technology.map((item,i)=><div className="dashboard-tech-row" key={item.name}><span className={'dashboard-tech-dot dashboard-tech-color-'+i}/><span className="dashboard-tech-name">{item.name} <small>{item.detail}</small></span><span>{item.stores} stores</span><strong>{item.arr} ARR</strong><span className={item.growth.startsWith('-')?'dashboard-negative':'dashboard-positive'}>{item.growth}</span></div>)}</div></section>
  <section className="dashboard-panel dashboard-alerts"><div className="dashboard-panel-head"><h2><span className="dashboard-alert-dot"/> Live Audit Triggers</h2><small>Demo feed</small></div>{alerts.map(alert=><article className="dashboard-alert" key={alert.company}><div><h3>{alert.company}</h3><span className={'dashboard-tag '+(alert.critical?'dashboard-tag-danger':'dashboard-tag-info')}>{alert.badge}</span></div><p>{alert.issue}</p><footer><span>Trigger: {alert.time}</span><strong>Auto-assigned: {alert.owner}</strong></footer></article>)}</section>
  <section className="dashboard-panel dashboard-funnel-panel"><div className="dashboard-panel-head"><div><h2>Funnel Velocity & Bottleneck Analysis</h2><p>Stage-through conversion rates and dwell time per validation gate</p></div><small>Weighted: 68.2%<br/>Efficiency</small></div><div className="dashboard-funnel">{stages.map(([title,count,conversion,dwell],i)=><article key={title}><h3>{String(i+1).padStart(2,'0')}. {title}</h3><strong>{count}</strong><span>{conversion}</span><small>{dwell}</small></article>)}</div></section>
  <section className="dashboard-panel dashboard-reps"><div className="dashboard-panel-head"><div><h2>Rep Cadence & Velocity Leaderboard</h2><p>Daily quota pacing & audit-to-meeting ratios</p></div><strong className="dashboard-positive">Top Tier: &gt;85%</strong></div>{reps.map(([name,role,arr,activity,target],i)=><article className="dashboard-rep" key={name}><span className="dashboard-rank">{i+1}</span><div><h3>{name}</h3><small>{role}</small></div><div className="dashboard-rep-metrics"><strong>{arr}</strong><small>{activity}</small></div><span className="dashboard-tag dashboard-tag-info">{target} Target</span></article>)}</section>
  </div>}
