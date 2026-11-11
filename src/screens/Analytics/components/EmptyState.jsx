import React from 'react';
import {BarChart3} from 'lucide-react';
export default function EmptyState({title,children,next}){return <div className="an-empty-state"><BarChart3 size={23} aria-hidden="true"/><strong>{title}</strong><p>{children}</p>{next&&<small>{next}</small>}</div>}
