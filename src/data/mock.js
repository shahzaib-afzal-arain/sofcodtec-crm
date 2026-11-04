export const companies=[
 {name:'Kith & Kin Apparel',domain:'kithandkin.store',platform:'Shopify Plus',tech:'Klaviyo',gmv:'$42.8M',score:94,contact:'Elena Rostova',role:'VP Digital Commerce',email:'e.rostova@kithandkin.store',stage:'Opportunity Validated',amount:'$38,000',owner:'Marcus R.',status:'Verified'},
 {name:'NovaVibe Hydration',domain:'drinknovavibe.com',platform:'Shopify Plus',tech:'Recharge',gmv:'$18.5M',score:88,contact:'Marcus Vance',role:'Head of Ecom',email:'m.vance@drinknovavibe.com',stage:'Contacted',amount:'$25,000',owner:'Elena R.',status:'Verified'},
 {name:'Aura Minimalist Living',domain:'aurahome.co.uk',platform:'Magento 2.4',tech:'Algolia',gmv:'$64.2M',score:72,contact:'Christian Meyer',role:'CTO & Infrastructure',email:'c.meyer@aurahome.co.uk',stage:'Discovery Scheduled',amount:'$52,000',owner:'Devon P.',status:'Risky'},
 {name:'Bloom Skincare',domain:'bloomlabs.com',platform:'BigCommerce',tech:'Yotpo',gmv:'$9.4M',score:83,contact:'Sarah Jenkins',role:'Growth Marketing',email:'s.jenkins@bloomlabs.com',stage:'Proposal Sent',amount:'$18,000',owner:'Alex V.',status:'Pending'},
 {name:'Terra & Cloud Gear',domain:'terracloud.de',platform:'SFCC',tech:'Salesforce',gmv:'$91.0M',score:96,contact:'Lukas Hartmann',role:'Managing Director',email:'l.hartmann@terracloud.de',stage:'Qualified',amount:'$76,000',owner:'Elena R.',status:'Verified'},
 {name:'OmniHealth Labs',domain:'omnihealthsupps.io',platform:'WooCommerce',tech:'Mailchimp',gmv:'$3.2M',score:48,contact:'David Ross',role:'Founder & CEO',email:'d.ross@omnihealthsupps.io',stage:'New Lead',amount:'$12,000',owner:'Marcus R.',status:'Invalid'},
 {name:'Velvet & Pine Furnishings',domain:'velvetpine.fr',platform:'Shopify Plus',tech:'Sanity CMS',gmv:'$27.4M',score:91,contact:'Camille Dubois',role:'Head of Product',email:'c.dubois@velvetpine.fr',stage:'Contacted',amount:'$45,000',owner:'Devon P.',status:'Verified'},
 {name:'SolePace Running',domain:'solepace.com',platform:'BigCommerce',tech:'Feedonomics',gmv:'$14.1M',score:85,contact:'Tariq Al-Mansouri',role:'VP Growth & Ads',email:'t.ali@solepace.com',stage:'Qualified',amount:'$28,000',owner:'Alex V.',status:'Verified'},
 {name:'Crafted Logic Instruments',domain:'craftedlogic.io',platform:'Shopify Plus',tech:'Okendo',gmv:'$11.8M',score:89,contact:'Zoe Van Der Berg',role:'Head of Tech',email:'z.van@craftedlogic.io',stage:'Proposal Sent',amount:'$21,000',owner:'Elena R.',status:'Verified'},
 {name:'HydroQuench Gear',domain:'hydroquench.com',platform:'Shopify Plus',tech:'Recharge',gmv:'$22.0M',score:93,contact:'Liam O’Connor',role:'Director of DTC',email:'liam@hydroquench.com',stage:'New Lead',amount:'$32,000',owner:'Marcus R.',status:'Verified'}
];
export const activities=[
 {type:'Audit',title:'Technical Architecture & Audit Pitch Review',company:'Aura Minimalist Living',detail:'Demoed mobile LCP latency bottleneck and confirmed priority technical improvements.',time:'3:30 PM'},
 {type:'Call',title:'Follow-up Discovery Call',company:'Kith & Kin Apparel',detail:'Confirmed Monday scheduling and readiness to move into technical scoping.',time:'11:15 AM'},
 {type:'Email',title:'Sent Commercial Scope & Retainer Agreement',company:'Terra & Cloud Gear',detail:'Shared phase-based pricing and timeline with the procurement team.',time:'09:40 AM'},
 {type:'Meeting',title:'Quick confirmation on technical sign-off',company:'NovaVibe Hydration',detail:'Sent agenda and validated pending requirements.',time:'4:00 PM'},
 {type:'Note',title:'Internal SDR Handover & Audit Summary',company:'ChronoCraft Horology',detail:'Qualified prospect and passed context to account executive.',time:'3:00 PM'}
];
export const tasks=[
 {priority:'HIGH',type:'Phone Call',company:'OmniHealth Labs',contact:'David Ross',task:'Resolve invalid MX and DNS status with founder',due:'Overdue'},
 {priority:'HIGH',type:'Email Outreach',company:'Aura Minimalist Living',contact:'Christian Meyer',task:'Deliver Opportunity Audit Follow-up',due:'Today, 2:30 PM'},
 {priority:'HIGH',type:'Email Outreach',company:'Kith & Kin Apparel',contact:'Elena Rostova',task:'Send formal proposal for review',due:'Today, 4:00 PM'},
 {priority:'MEDIUM',type:'WhatsApp',company:'NovaVibe Hydration',contact:'Marcus Vance',task:'Check in about sign-off for exchange',due:'Jun 20'},
 {priority:'MEDIUM',type:'Phone Call',company:'Terra & Cloud Gear',contact:'Lukas Hartmann',task:'Discuss contract extension and next steps',due:'Jun 20'}
];
export const initials=name=>name.split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase();
