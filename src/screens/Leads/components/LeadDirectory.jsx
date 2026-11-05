import React,{useEffect,useMemo,useState} from 'react';
import {Link,useSearchParams} from 'react-router-dom';
import {Upload,Radio} from 'lucide-react';
import {columns,defaultFilters,loadLeads,filterLeads,exportRecords,downloadCsv} from '../leadData';
import LeadsStatusTabs from './LeadsStatusTabs';
import LeadsFilters from './LeadsFilters';
import LeadsTable from './LeadsTable';
import LeadsPagination from './LeadsPagination';
import LeadsBulkActions from './LeadsBulkActions';

export default function LeadDirectory(){
  const [params]=useSearchParams();const query=params.get('search')||'';
  const [loaded]=useState(()=>loadLeads(globalThis.localStorage));const [rows,setRows]=useState(loaded.rows);
  const [filters,setFilters]=useState(()=>({...defaultFilters(),search:query}));const [tab,setTab]=useState('all');
  const [visible,setVisible]=useState(columns.map(([key])=>key));const [selected,setSelected]=useState([]);
  const [page,setPage]=useState(1);const [pageSize,setPageSize]=useState(10);const [notice,setNotice]=useState('');
  useEffect(()=>{setFilters(current=>({...current,search:query}));setPage(1);},[query]);
  const matching=useMemo(()=>filterLeads(rows,filters,tab),[rows,filters,tab]);
  const currentPage=Math.min(page,Math.max(1,Math.ceil(matching.length/pageSize)));const shown=matching.slice((currentPage-1)*pageSize,currentPage*pageSize);
  const selectedRows=rows.filter(row=>selected.includes(row.key));const exportRows=exportRecords(rows,matching,selected);
  const owners=[...new Set(rows.map(row=>row.owner))].sort();
  const updateFilters=next=>{setFilters(next);setPage(1);};const clear=()=>{setFilters(defaultFilters());setTab('all');setPage(1);};
  const toggle=key=>setSelected(current=>current.includes(key)?current.filter(value=>value!==key):[...current,key]);
  const selectPage=checked=>setSelected(current=>checked?[...new Set([...current,...shown.map(row=>row.key)])]:current.filter(key=>!shown.some(row=>row.key===key)));
  const assign=owner=>{setRows(current=>current.map(row=>selected.includes(row.key)?{...row,owner}:row));setNotice(`${selected.length} lead${selected.length===1?'':'s'} assigned locally to ${owner}. Assignment lasts for this session only.`);};
  return <>
    <div className="leads-local-actions"><Link className="leads-button" to="/workflow/import" title="Demo import workflow; CSV upload is not connected"><Upload size={13}/> Import CSV <small>Demo</small></Link></div>
    <header className="leads-heading"><div className="leads-introduction"><div className="leads-breadcrumb">SOFCODTEC / Sales Intelligence</div><h1>Lead Directory & Pipeline Intelligence</h1><p>High-volume e-commerce intelligence, revenue classification, and full-stack technical health audits.</p></div><div className="leads-heading-badges"><span className="leads-total"><strong>{rows.length.toLocaleString()}</strong> Loaded leads</span><span className="leads-sync" title="Local demo snapshot; external synchronization is not connected"><Radio size={12}/> Live Sync <small>Demo</small></span></div><LeadsStatusTabs rows={rows} active={tab} onChange={value=>{setTab(value);setPage(1);}}/></header>
    <details className="leads-demo-rules"><summary>Demo data & status rules</summary><p>High ICP Fit: audit score ≥85 (demo proxy). Needs Audit: zero or unavailable score. Verified Enriched: source status Verified. Churn Risk: source status Risky or Invalid (demo proxy). These are sample classifications, not live verification or predictive scores. Tab counts cover all loaded records; filters narrow the active view.</p><p>Import opens a demo workflow. Bulk audit/cadence links carry selected lead IDs in the URL; destination screens still show their generic demos and do not apply that selection automatically.</p></details>
    {loaded.warning&&<p className="leads-warning" role="status">{loaded.warning}</p>}
    <LeadsFilters filters={filters} onChange={updateFilters} onClear={clear} owners={owners} visible={visible} onColumns={setVisible} exportCount={exportRows.length} onExport={()=>downloadCsv(exportRows)}/>
    <section className="leads-directory" aria-label="Lead directory"><div className="leads-results-status"><span aria-live="polite">{matching.length} matching of {rows.length} loaded leads</span><span>{selectedRows.length} selected{selectedRows.length>0?` · ${selectedRows.filter(row=>matching.some(match=>match.key===row.key)).length} match this view`:''}</span></div><LeadsTable rows={shown} selected={selected} visible={visible} onToggle={toggle} onSelectPage={selectPage} onClear={clear}/></section>
    {notice&&<p className="leads-session-notice" role="status">{notice}</p>}
    {selectedRows.length>0&&<LeadsBulkActions rows={selectedRows} visibleCount={selectedRows.filter(row=>matching.some(match=>match.key===row.key)).length} owners={owners} onAssign={assign} onClear={()=>{setSelected([]);setNotice('');}}/>}
    <LeadsPagination page={currentPage} pageSize={pageSize} total={matching.length} onPage={setPage} onPageSize={value=>{setPageSize(value);setPage(1);}}/>
  </>;
}
