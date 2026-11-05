import React from 'react';
import {statusTabs,statusMatch} from '../leadData';
export default function LeadsStatusTabs({rows,active,onChange}){return <div className="leads-status-tabs" role="group" aria-label="Lead status">{statusTabs.map(([key,label])=><button type="button" key={key} aria-pressed={active===key} onClick={()=>onChange(key)}><span>{label}</span><strong>{rows.filter(row=>statusMatch(row,key)).length}</strong></button>)}</div>;}
