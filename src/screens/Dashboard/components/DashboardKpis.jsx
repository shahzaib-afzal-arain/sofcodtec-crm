import React from 'react';
import {Wallet, UserCheck, ScanLine, Gauge} from 'lucide-react';
const metrics = [
  {label:'Total Pipeline Value',value:'$4.82M',trend:'+12.4% vs last mo',Icon:Wallet,spark:true},
  {label:'Qualified Leads',value:'1,248',suffix:'88% verified',trend:'+8.1% WoW',note:'98 pending triage',Icon:UserCheck},
  {label:'Technical Audits Completed',value:'342',suffix:'94.2% hit rate',trend:'+16.8% pace',note:'Target: 320/mo',Icon:ScanLine},
  {label:'Average Deal Velocity',value:'18.4',suffix:'days',trend:'3.2 days improved',note:'Cycle benchmark',Icon:Gauge},
];
export default function DashboardKpis(){return <section className="dashboard-kpis" aria-label="Dashboard metrics">{metrics.map(({label,value,suffix,trend,note,Icon,spark})=><article className="dashboard-kpi" key={label}><div className="dashboard-kpi-label">{label}<Icon size={14}/></div><div className="dashboard-kpi-value">{value}<small>{suffix}</small></div><div className="dashboard-kpi-bottom"><span>↗ {trend}</span>{spark?<svg viewBox="0 0 90 24" aria-label="Illustrative pipeline trend" role="img"><polyline points="1,19 16,17 28,20 43,12 57,14 72,8 89,3" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>:<small>{note}</small>}</div></article>)}</section>}
