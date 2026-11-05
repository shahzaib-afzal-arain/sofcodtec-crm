import React, {useState} from 'react';
import {Download, Radio} from 'lucide-react';
import DashboardKpis from './components/DashboardKpis';
import RevenuePanels from './components/RevenuePanels';
import DashboardDealsTable from './components/DashboardDealsTable';
import './dashboard.css';

export default function Dashboard() {
  const [period, setPeriod] = useState('Last 7 Days');
  const [dates, setDates] = useState({start:'', end:''});
  const exportReport = () => {
    const report = {type:'Dashboard demo snapshot', period, ...(period === 'Custom' ? dates : {}), note:'Sample metrics; date selection does not filter undated demo data.', pipelineValue:'$4.82M', qualifiedLeads:1248, technicalAudits:342, averageDealVelocityDays:18.4};
    const url = URL.createObjectURL(new Blob([JSON.stringify(report, null, 2)], {type:'application/json'}));
    const link = document.createElement('a');
    link.href = url; link.download = 'dashboard-demo-report.json'; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return <div className="dashboard-page">
    <header className="dashboard-heading">
      <div><div className="dashboard-breadcrumb">SOFCODTEC / Sales Intelligence</div><h1>E-Commerce Revenue Operations Cockpit</h1><p>Real-time tech-stack vulnerability indexing and sales conversion telemetry across 14,890 tracked stores.</p></div>
      <div className="dashboard-header-actions"><span className="dashboard-live"><Radio size={12}/> Live Stream Active</span><div className="dashboard-periods" role="group" aria-label="Report period">{['Today','Last 7 Days','Month to Date','Custom'].map(value => <button key={value} aria-pressed={period === value} onClick={() => setPeriod(value)}>{value}</button>)}</div><button className="dashboard-control" onClick={exportReport}><Download size={13}/> Export Report</button></div>
    </header>
    <div className="dashboard-date-note">{period === 'Custom' && <div className="dashboard-custom-dates"><label>From <input type="date" value={dates.start} max={dates.end || undefined} onChange={e=>setDates({...dates,start:e.target.value})}/></label><label>To <input type="date" value={dates.end} min={dates.start || undefined} onChange={e=>setDates({...dates,end:e.target.value})}/></label></div>}Demo snapshot · Date selection does not filter sample metrics or records.</div>
    <DashboardKpis/><RevenuePanels/><DashboardDealsTable/>
  </div>;
}
