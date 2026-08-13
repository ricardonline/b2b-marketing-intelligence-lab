export const options={
 objective:["Grow in an existing international market","Enter a new market","Launch a new solution","Generate qualified leads","Support sales","Strengthen market position"],
 solution:["Modular production system","Industrial automation solution","Production technology platform","Technical service solution","Industrial component system"],
 market:["Germany","United States","France","United Kingdom","Central Europe","North America","Global"],
 industry:["Industrial Manufacturing","Mechanical Engineering","Packaging","Material Handling","Automotive","Agricultural Machinery"],
 role:["Technical Director","Design Engineer","Purchasing Manager","Managing Director","Maintenance Manager","Distributor"]};
export const roleRules:Record<string,{priorities:string[];proofs:string[];lens:string}>={
 "Technical Director":{priorities:["Operational reliability","Integration into existing systems","Lifecycle performance"],proofs:["Reliability","Integration","Lifecycle value"],lens:"technical continuity and controllable implementation"},
 "Design Engineer":{priorities:["Technical integration","Application performance","Reduced engineering complexity"],proofs:["Compatibility","Engineering support","Design flexibility"],lens:"clear interfaces and lower design complexity"},
 "Purchasing Manager":{priorities:["Total cost visibility","Supplier reliability","Commercial transparency"],proofs:["Lifecycle cost","Supply confidence","Transparency"],lens:"predictable lifecycle cost and supplier dependability"},
 "Managing Director":{priorities:["Operational resilience","Investment confidence","Scalable competitiveness"],proofs:["Business continuity","Scalability","Long-term value"],lens:"a credible route from investment to operational value"},
 "Maintenance Manager":{priorities:["Serviceability","Parts availability","Reduced disruption"],proofs:["Maintainability","Support","Uptime planning"],lens:"simpler maintenance and dependable operational support"},
 Distributor:{priorities:["Portfolio fit","Sales readiness","Reliable supplier support"],proofs:["Market fit","Enablement","Partner support"],lens:"a proposition that is easy to position, support and sell"}};
export const marketRules:Record<string,{tone:string;emphasis:string;term:string;cta:string;format:string}>={
 Germany:{tone:"Precise, evidence-led and technically detailed",emphasis:"engineering quality and lifecycle assurance",term:"automation system",cta:"Review the technical concept",format:"Technical brief"},
 "United States":{tone:"Direct, outcome-led and concise",emphasis:"operational impact and speed to value",term:"automation solution",cta:"Schedule a technical consultation",format:"Application story"},
 France:{tone:"Contextual, consultative and brand-conscious",emphasis:"partnership and application expertise",term:"solution d’automatisation",cta:"Discuss your application",format:"Expert perspective"},
 "United Kingdom":{tone:"Pragmatic, clear and proof-oriented",emphasis:"risk control and whole-life value",term:"automation solution",cta:"Explore the practical fit",format:"Solution guide"},
 Global:{tone:"Clear, neutral and globally consistent",emphasis:"adaptability and consistent support",term:"industrial automation solution",cta:"Explore the solution",format:"Master message"}};
export const strategicSteps=["Understand the market","Translate technology into relevance","Build a clear value proposition","Create one strong core message","Connect marketing, communications and sales","Adapt to international markets","Learn from customer and sales response","Scale what works"];
export const system=["Product & expert knowledge","Market understanding","Customer relevance","Value proposition","Core message","Message architecture","Marketing / Corporate & PR / Sales","International markets","Engagement","Sales opportunity","Learning loop ↺"];
