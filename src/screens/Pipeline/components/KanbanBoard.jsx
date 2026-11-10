import React,{useState} from 'react';
import {User,Calendar,GripVertical} from 'lucide-react';
import {initials} from '../../../data/mock';
import {stages,money,defaults} from '../pipelineData';
export default function KanbanBoard({rows,onMove,onOpen}){
 const [dragging,setDragging]=useState(null),[over,setOver]=useState(null);
 return <div className="sp-board" role="region" aria-label="Sales stages, horizontally scrollable" tabIndex={0}>{stages.map(stage=>{
 const deals=rows.filter(r=>r.stage===stage);
 return <section key={stage} className={'sp-column'+(over===stage?' sp-drop-target':'')} aria-label={stage+' stage'} onDragOver={e=>{if(dragging){e.preventDefault();e.dataTransfer.dropEffect='move';setOver(stage);}}} onDragLeave={e=>{if(!e.currentTarget.contains(e.relatedTarget))setOver(null);}} onDrop={e=>{e.preventDefault();if(dragging)onMove(dragging.id,stage,dragging.revision);setDragging(null);setOver(null);}}>
  <header className="sp-column-head"><span className={'sp-stage-dot sp-dot-'+stages.indexOf(stage)}/><h2>{stage}</h2><span>{deals.length}</span><strong>{money(deals.reduce((n,r)=>n+r.value,0))}</strong></header>
  {deals.map(r=><article className={'sp-deal'+(dragging?.id===r.id?' sp-dragging':'')} key={r.id} draggable onDragStart={e=>{e.dataTransfer.setData('text/plain',r.id);e.dataTransfer.effectAllowed='move';setDragging({id:r.id,revision:r.revision});}} onDragEnd={()=>{setDragging(null);setOver(null);}}>
   <div className="sp-deal-heading"><span className="sp-avatar">{initials(r.company)}</span><div><button className="sp-company" onClick={()=>onOpen(r)}>{r.company}</button><small>{r.domain||'Domain not supplied'}</small></div><span className={'sp-priority sp-priority-'+r.priority.toLowerCase()}>{r.priority}</span></div><p className="sp-deal-title">{r.title}</p><div className="sp-value-row"><strong>{money(r.value)}</strong><span className="sp-tag">{r.platform}</span></div><p><User size={11}/>{r.contact||'Contact not supplied'}</p><p><User size={11}/>{r.owner} · {r.source}</p>{r.nextActivity&&<p className="sp-next"><Calendar size={11}/>{r.followUpOn||'No date'} · {r.nextActivity}</p>}<div className="sp-deal-meta"><span>Close: {r.expectedClose||'Not supplied'}</span><span>{r.probability}% · {r.probabilityMode==='stage'?'stage default':'custom'}</span></div><div className="sp-deal-meta"><span>Lead score: {r.score??'Unknown'}</span><span>{r.updatedAt?'Local update '+new Date(r.updatedAt).toLocaleDateString():'Demo snapshot'}</span></div><div className="sp-deal-actions"><button onClick={()=>onOpen(r)}>View / Edit Deal</button><label><GripVertical size={11}/><span className="sp-sr-only">Move {r.company} to stage</span><select aria-label={'Move '+r.company+' to stage'} value={r.stage} onChange={e=>onMove(r.id,e.target.value,r.revision)}>{stages.map(s=><option key={s}>{s}</option>)}</select></label></div>
  </article>)}
  {!deals.length&&<p className="sp-empty-stage">No matching deals. {dragging?'Drop here to move.':''}</p>}
 </section>;
 })}</div>;
}
