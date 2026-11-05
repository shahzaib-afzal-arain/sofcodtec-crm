import React,{useEffect,useRef} from 'react';
import {Link} from 'react-router-dom';
import {BadgeCheck,ExternalLink,Flag} from 'lucide-react';
import {columns,profilePath} from '../leadData';
function initials(value){return value.split(/\s+/).filter(Boolean).map(word=>word[0]).slice(0,2).join('').toUpperCase();}
export default function LeadsTable({rows,selected,visible,onToggle,onSelectPage,onClear}){
  const all=rows.length>0&&rows.every(row=>selected.includes(row.key));const checkbox=useRef(null);
  useEffect(()=>{if(checkbox.current)checkbox.current.indeterminate=!all&&rows.some(row=>selected.includes(row.key));},[rows,selected,all]);
  function cell(row,key){switch(key){
    case 'company':return <Link className="leads-company" to={profilePath(row)}><span className="leads-company-avatar">{initials(row.name)}</span><span><strong>{row.name}{row.status==='Verified'?<BadgeCheck size={11} aria-label="Demo verified"/>:row.status==='Invalid'?<Flag size={11} aria-label="Invalid source status"/>:null}</strong><small>{row.domain}</small></span><ExternalLink size={10}/></Link>;
    case 'platform':return <div className="leads-tech"><span className="leads-chip leads-platform">{row.platform}</span>{row.tech&&row.tech.split(/[,;]+/).map((tech,index)=><span className="leads-chip" key={index}>{tech.trim()}</span>)}</div>;
    case 'gmv':return <strong>{row.gmv||'Not provided'}</strong>;
    case 'score':return <div className={'leads-score '+(row.score===null?'':row.score<50?'leads-score-low':row.score<80?'leads-score-medium':'leads-score-high')}>{row.score===null?<small>Not available</small>:<><span className="leads-score-track" role="meter" aria-label={'Audit score for '+row.name} aria-valuemin={0} aria-valuemax={100} aria-valuenow={row.score}><i style={{width:row.score+'%'}}/></span><strong>{row.score}/100</strong></>}</div>;
    case 'status':return <span className={'leads-verification leads-verification-'+(row.status==='Verified'?'verified':row.status==='Pending'?'pending':'risk')} title={'Source demo status: '+row.status}>● {row.status==='Verified'?'Enriched':row.status}</span>;
    case 'contact':return <div className="leads-contact"><strong>{row.contact||'Not provided'}</strong><small>{row.role||row.email||'No contact details'}</small><small className="leads-owner-label">Owner: {row.owner}</small></div>;
    default:return null;
  }}
  return <div className="leads-table-scroll" role="region" aria-label="Scrollable lead directory" tabIndex={0}><table className="leads-data-table"><thead><tr><th><input ref={checkbox} type="checkbox" checked={all} aria-label="Select all leads on current page" onChange={event=>onSelectPage(event.target.checked)}/></th>{columns.filter(([key])=>visible.includes(key)).map(([key,label])=><th scope="col" key={key}>{label}</th>)}</tr></thead><tbody>{rows.map(row=><tr key={row.key} className={selected.includes(row.key)?'leads-row-selected':''}><td><input type="checkbox" checked={selected.includes(row.key)} aria-label={'Select '+row.name} onChange={()=>onToggle(row.key)}/></td>{columns.filter(([key])=>visible.includes(key)).map(([key])=><td className={'leads-cell-'+key} key={key}>{cell(row,key)}</td>)}</tr>)}{!rows.length&&<tr><td colSpan={visible.length+1} className="leads-empty"><strong>No leads match this view.</strong><p>Try another search or clear the current filters.</p><button className="leads-button" onClick={onClear}>Clear all filters</button></td></tr>}</tbody></table></div>;
}
