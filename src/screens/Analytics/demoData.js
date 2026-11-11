import {aggregate,period,defaults} from './analyticsData';
/** Illustrative presentation data only. Never reads or writes CRM storage. */
export function demoReport(filters=defaults(),now=new Date()){
 const empty={coverage:[],warnings:[],asOf:new Date(now).toISOString(),leads:[],verification:[],audits:[],opportunities:[],deals:[],activities:[],followups:[],meetings:[],proposals:[]};
 const r=aggregate(empty,filters,now),p=period(filters.preset,filters.from,filters.to,now),factor=Math.max(.1,Math.min(4,p.days/30))*(filters.owner==='all'?1:.28),n=x=>Math.max(1,Math.round(x*factor));
 const names=['Elena Rostova','Marcus Thorne','Devon Patel','Alex Vance'];
 const cents=x=>BigInt(Math.round(x*factor*100)),usd=x=>({USD:cents(x)});
 r.mode='demo';r.preview=true;r.cohortCount=n(3412);r.demoOwners=names;
 r.kpis=r.kpis.map((k,i)=>({...k,label:i===6?'Won-deal estimates':k.label,value:i===6?null:n([3412,1248,1840,56,31,26][i]),displayValue:i===6?'USD '+(1480000*factor/1e6).toFixed(2)+'M':undefined,growth:[8.4,6.8,12.2,4.1,9.7,5.3,7.2][i],note:i===6?'Illustrative won-deal estimates; not recognized revenue or ARR.':'Illustrative demonstration metric; not CRM data.',basis:'Illustrative comparison only.'}));
 const counts=[3412,2550,1840,1248,56,31,26].map(n);
 r.funnel=r.funnel.map((f,i)=>({...f,count:counts[i],cohortPercent:counts[i]/counts[0]*100,conversion:i?counts[i]/counts[i-1]*100:100,velocity:i?[0,1.2,2.4,1.8,3.2,4.1,5.6][i]:null,note:'Illustrative linked-stage progression. Not actual CRM results.'}));
 r.monthly=r.monthly.map((m,i)=>{const weight=(i+1)/(r.monthly.length*(r.monthly.length+1)/2);return {...m,won:usd(1480000*weight),open:usd(5840000*weight),weighted:usd(3120000*weight),target:usd(1750000*weight)};});
 r.currencies=['USD'];r.financial={won:usd(1480000),open:usd(5840000),weighted:usd(3120000)};
 const group=(label,count,q,won,value)=>({label,count:n(count),qualified:n(q),rate:q/count*100,won:n(won),wonValue:usd(value),opportunities:n(q*.7),winRate:won/count*100,average:{USD:BigInt(Math.round(value/won*100))}});
 r.acquisition=[group('Apollo API',1420,568,10,520000),group('Hunter',980,372,7,390000),group('Manual Search',640,192,6,350000),group('CSV Import',372,116,3,220000)];
 r.technology=[group('Shopify Plus',1680,672,14,760000),group('Salesforce Commerce Cloud',720,288,6,410000),group('Magento / Adobe',640,192,4,220000),group('Custom Headless',372,96,2,90000)];
 r.reps=names.map((label,i)=>({label,rank:i+1,won:n([12,7,5,2][i]),value:usd([620000,450000,280000,130000][i]),target:usd([550000,450000,320000,200000][i]),attainment:[112.7,100,87.5,65][i]})).filter(x=>filters.owner==='all'||x.label===filters.owner).map((x,i)=>({...x,rank:i+1}));
 r.activityRanks=[];r.productivity={calls:{logged:n(164),completed:n(108),outcomes:[{label:'Connected',count:n(84)},{label:'Follow-up Required',count:n(24)}]},emails:{logged:n(218),sent:n(184),replies:n(42),drafts:n(34)},meetings:{scheduled:n(56),completed:n(38),reviewLogs:n(18),meetingLogs:n(42)},tasks:{created:n(146),completed:n(112),overdue:n(6),unknownCompletion:0}};
 r.limitations=['DEMO PREVIEW: All figures, targets, comparisons and representative results are deterministic illustrations. They are not actual CRM metrics.','Preview figures scale with the selected period length and representative. They do not represent historical events.','No real CRM records are read, combined or modified in this preview. Switch to Actual CRM Data for source-backed reporting.'];r.warnings=[];r.coverage=[];r.brokenLinks=0;r.unlinkedWon=0;return r;
}
