import {load as loadTeam} from '../Team/teamData';
export function teamSummary(storage){try{if(storage.getItem('crm-team-state')===null)return {saved:false,roles:0,rules:[],error:''};const {state}=loadTeam(storage);return {saved:true,roles:Object.keys(state.policies).length,rules:state.rules.map(r=>({id:r.id,name:r.name,priority:r.priority,field:r.field,value:r.value,active:r.active})),error:''};}catch{return {saved:false,roles:0,rules:[],error:'Team configuration is unavailable or malformed. No Team data was changed.'};}}
export const settingsBytes=raw=>(raw?.length||0)*2;
