"use client";

import {useState} from "react";
import {ol,tx,useLanguage} from "./i18n";
import {LanguageDropdown} from "./language-dropdown";
import {ApplicationEdition} from "./application-edition";
import {LocalizedPersonalSection} from "./localized-personal-section";
import {buildApproach} from "@/lib/approach";
import type {Context} from "@/types";

const markets=["Germany","Central Europe","United States","North America","Global"];
const roles=["Technical Director","Design Engineer","Purchasing Manager","Managing Director","Maintenance Manager","Distributor"];
const goals=["Grow in an existing international market","Enter a new market","Launch a new solution","Generate qualified leads","Support sales","Strengthen market position"];
const topics=["New machine or system","New module","New feature or function","New service","New product or component","New partner or distributor","Product update or upgrade","Retrofit or modernization","Trade fair or product launch","Reference project or customer success"];
const base:Context={objective:"Launch a new solution",solution:"New module",market:"Germany",industry:"Mechanical Engineering",role:"Technical Director"};

type Lang=ReturnType<typeof useLanguage>["lang"];

function topicLabel(lang:Lang,v:string){
  const m:Record<string,[string,string,string,string,string]>={
    "New machine or system":["New machine / system","Neue Maschine / Anlage","Nouvelle machine / installation","Nueva máquina / sistema","新机器 / 系统"],
    "New module":["New module","Neues Modul","Nouveau module","Nuevo módulo","新模块"],
    "New feature or function":["New feature / function","Neues Feature / neue Funktion","Nouvelle fonctionnalité","Nueva función","新功能"],
    "New service":["New service","Neuer Service","Nouveau service","Nuevo servicio","新服务"],
    "New product or component":["New product / component","Neues Produkt / Bauteil","Nouveau produit / composant","Nuevo producto / componente","新产品 / 部件"],
    "New partner or distributor":["New partner / distributor","Neuer Partner / Vertriebspartner","Nouveau partenaire / distributeur","Nuevo socio / distribuidor","新合作伙伴 / 经销商"],
    "Product update or upgrade":["Product update / upgrade","Produktupdate / Upgrade","Mise à jour / évolution produit","Actualización / mejora del producto","产品更新 / 升级"],
    "Retrofit or modernization":["Retrofit / modernization","Retrofit / Modernisierung","Rétrofit / modernisation","Retrofit / modernización","改造 / 现代化"],
    "Trade fair or product launch":["Trade fair / product launch","Messe / Produktlaunch","Salon / lancement produit","Feria / lanzamiento de producto","展会 / 产品发布"],
    "Reference project or customer success":["Reference project / customer success","Referenzprojekt / Kundenerfolg","Projet de référence / réussite client","Proyecto de referencia / caso de éxito","标杆项目 / 客户成功"]
  };
  const x=m[v]||[v,v,v,v,v];
  return {en:x[0],de:x[1],fr:x[2],es:x[3],zh:x[4]}[lang];
}

function ComplexityScribble(){
  return <svg viewBox="0 0 420 360" role="img" aria-label="Complexity scribble"><g fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"><path d="M74 167 C34 92 105 35 185 78 C268 121 246 223 169 232 C91 240 45 175 82 118 C126 51 245 50 304 116 C356 175 326 270 246 278 C160 287 86 229 100 155 C116 69 235 36 313 98 C385 155 347 278 253 303 C161 327 70 266 63 184 C57 108 122 53 205 54 C301 55 359 125 344 203 C330 279 244 323 166 291 C90 260 49 183 81 115"/><path d="M127 132 C155 78 236 82 272 130 C308 178 278 246 221 251 C157 257 111 205 126 151 C141 94 215 72 263 108 C313 145 299 218 246 242 C192 267 134 226 128 176 C122 127 166 94 216 101 C264 108 287 150 272 190 C255 235 194 242 160 211 C124 178 142 126 181 112 C225 96 263 126 261 169 C259 208 219 228 185 211 C148 193 150 147 181 127 C215 105 252 128 251 162 C250 195 219 210 192 196 C165 182 166 150 190 137 C215 124 240 142 236 166 C233 189 207 198 190 183 C172 168 184 143 204 141 C223 139 233 157 224 171"/><path d="M95 255 C45 229 31 165 63 121 M295 76 C352 90 382 139 369 195 M326 269 C283 326 203 342 139 309 M111 72 C155 25 228 20 286 55"/><path d="M150 89 C121 137 118 195 150 241 C187 293 270 286 305 229 C340 173 315 99 253 78 C194 59 136 93 117 145 C98 198 129 257 182 274 C239 292 296 255 309 202 C322 148 287 94 232 83 C180 73 131 106 121 156 C110 205 143 250 192 259 C239 267 282 236 288 190 C294 149 266 111 224 106 C183 101 149 128 146 168 C143 205 169 234 206 236 C240 238 269 213 270 178 C271 146 249 121 217 121 C186 121 165 145 166 174 C167 201 188 220 215 217 C240 215 256 194 251 170 C247 147 227 135 207 141 C188 147 181 167 189 184 C198 202 219 205 232 192"/></g></svg>;
}

function DirectionScribble(){
  return <svg viewBox="0 0 760 120" role="img" aria-label="Direction scribble"><path d="M8 65 C35 15 80 18 82 62 C85 108 25 103 31 54 C38 6 122 10 130 60 C139 110 61 111 67 54 C73 5 168 11 176 60 C185 111 108 111 114 52 C120 8 213 7 220 59 C226 105 161 107 163 58 C166 18 250 15 257 61 C262 100 213 103 210 67 C251 82 291 82 328 70 C383 51 439 60 495 68 C559 76 625 70 718 42" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/><path d="M696 31 L727 41 L705 59" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

function PositioningSignals(){
  const {lang}=useLanguage();
  const data=[
    ["◎",tx(lang,"INTERNATIONAL EXPERIENCE","INTERNATIONALE ERFAHRUNG","EXPÉRIENCE INTERNATIONALE","EXPERIENCIA INTERNACIONAL","国际经验"),tx(lang,"Understand markets. Think globally.","Märkte verstehen. Global denken.","Comprendre les marchés. Penser global.","Entender mercados. Pensar globalmente.","理解市场。全球思考。")],
    ["◯◯◯",tx(lang,"PEOPLE & TEAMS","MENSCHEN & TEAMS","PERSONNES & ÉQUIPES","PERSONAS & EQUIPOS","人才与团队"),tx(lang,"Listen. Understand. Develop together.","Zuhören. Verstehen. Gemeinsam entwickeln.","Écouter. Comprendre. Développer ensemble.","Escuchar. Entender. Desarrollar juntos.","倾听。理解。共同发展。")],
    ["↗",tx(lang,"EXPERIENCE & CURIOSITY","ERFAHRUNG & NEUGIER","EXPÉRIENCE & CURIOSITÉ","EXPERIENCIA & CURIOSIDAD","经验与好奇心"),tx(lang,"Experience builds judgment. Curiosity drives progress.","Erfahrung schafft Urteilskraft. Neugier treibt Entwicklung.","L’expérience forge le jugement. La curiosité fait avancer.","La experiencia fortalece el criterio. La curiosidad impulsa el progreso.","经验形成判断力。好奇心推动进步。")]
  ];
  return <div className="hero-signals">{data.map(([icon,title,copy])=><div className="hero-signal" key={title}><span className="signal-icon" aria-hidden="true">{icon}</span><b>{title}</b><p>{copy}</p></div>)}</div>;
}

const plans={
  default:{
    en:["Sales brochure / product sheet + sales presentation","LinkedIn post · email newsletter · website article · YouTube explainer"],
    de:["Vertriebsbroschüre / Produktblatt + Vertriebspräsentation","LinkedIn-Post · E-Mail-Newsletter · Website-Artikel · YouTube-Erklärvideo"],
    fr:["Brochure commerciale / fiche produit + présentation commerciale","Publication LinkedIn · newsletter e-mail · article web · vidéo explicative YouTube"],
    es:["Folleto comercial / ficha de producto + presentación de ventas","Publicación en LinkedIn · newsletter por correo · artículo web · vídeo explicativo en YouTube"],
    zh:["销售手册 / 产品资料页 + 销售演示文稿","LinkedIn 帖子 · 邮件简报 · 官网文章 · YouTube 讲解视频"]
  },
  service:{
    en:["Service one-pager + sales presentation","Customer email · service page · LinkedIn post · sales follow-up"],
    de:["Service-One-Pager + Vertriebspräsentation","Kundenmailing · Service-Seite · LinkedIn-Post · Vertriebs-Follow-up"],
    fr:["Fiche service d’une page + présentation commerciale","E-mail client · page service · publication LinkedIn · suivi commercial"],
    es:["Ficha de servicio de una página + presentación de ventas","Correo a clientes · página de servicio · publicación en LinkedIn · seguimiento comercial"],
    zh:["服务单页 + 销售演示文稿","客户邮件 · 服务页面 · LinkedIn 帖子 · 销售跟进"]
  },
  partner:{
    en:["Partner announcement + sales enablement kit","Press release · LinkedIn post · newsletter · website news"],
    de:["Partner-Ankündigung + Vertriebsunterlagen","Pressemitteilung · LinkedIn-Post · Newsletter · Website-News"],
    fr:["Annonce du partenaire + kit d’aide à la vente","Communiqué de presse · publication LinkedIn · newsletter · actualité web"],
    es:["Anuncio del socio + kit de apoyo a ventas","Nota de prensa · publicación en LinkedIn · newsletter · noticia web"],
    zh:["合作伙伴发布 + 销售支持资料包","新闻稿 · LinkedIn 帖子 · 简报 · 官网新闻"]
  },
  retrofit:{
    en:["Retrofit brochure / checklist + sales presentation","Installed-base email · website article · LinkedIn post · customer call"],
    de:["Retrofit-Broschüre / Checkliste + Vertriebspräsentation","Bestandskunden-Mailing · Website-Artikel · LinkedIn-Post · Telefonkontakt"],
    fr:["Brochure rétrofit / checklist + présentation commerciale","E-mail aux clients installés · article web · publication LinkedIn · appel client"],
    es:["Folleto de retrofit / checklist + presentación de ventas","Correo a clientes instalados · artículo web · publicación en LinkedIn · llamada al cliente"],
    zh:["改造手册 / 检查清单 + 销售演示文稿","存量客户邮件 · 官网文章 · LinkedIn 帖子 · 客户电话沟通"]
  },
  launch:{
    en:["Launch presentation + trade-fair information material","LinkedIn campaign · invitation email · landing page · YouTube teaser"],
    de:["Launch-Präsentation + Messe-Infomaterial","LinkedIn-Kampagne · Einladungsmailing · Landingpage · YouTube-Teaser"],
    fr:["Présentation de lancement + supports d’information salon","Campagne LinkedIn · e-mail d’invitation · landing page · teaser YouTube"],
    es:["Presentación de lanzamiento + material informativo para feria","Campaña en LinkedIn · correo de invitación · landing page · teaser en YouTube"],
    zh:["发布演示文稿 + 展会资料","LinkedIn 活动 · 邀请邮件 · 落地页 · YouTube 预告片"]
  },
  caseStudy:{
    en:["Customer case study + sales presentation","LinkedIn post · YouTube case video · website article · newsletter · PR"],
    de:["Kundenreferenz / Case Study + Vertriebspräsentation","LinkedIn-Post · YouTube-Case-Video · Website-Artikel · Newsletter · PR"],
    fr:["Étude de cas client + présentation commerciale","Publication LinkedIn · vidéo cas client YouTube · article web · newsletter · RP"],
    es:["Caso de éxito de cliente + presentación de ventas","Publicación en LinkedIn · vídeo del caso en YouTube · artículo web · newsletter · PR"],
    zh:["客户案例 + 销售演示文稿","LinkedIn 帖子 · YouTube 案例视频 · 官网文章 · 简报 · 公关"]
  }
} as const;

function activationPlan(lang:Lang,c:Context){
  let key:keyof typeof plans="default";
  if(c.solution==="New service") key="service";
  if(c.solution==="New partner or distributor") key="partner";
  if(c.solution==="Retrofit or modernization") key="retrofit";
  if(c.solution==="Trade fair or product launch") key="launch";
  if(c.solution==="Reference project or customer success") key="caseStudy";
  const [primary,secondary]=plans[key][lang];
  return {primary,secondary};
}

function FutureTeam({lang}:{lang:Lang}){
  const cards=[
    ["01",tx(lang,"RESEARCH & MARKET INSIGHT","RECHERCHE & MARKTBEOBACHTUNG","RECHERCHE & VEILLE MARCHÉ","INVESTIGACIÓN & ANÁLISIS DE MERCADO","研究与市场洞察"),tx(lang,"Monitor markets, competitors and signals. Prepare structured briefings.","Märkte, Wettbewerber und Signale beobachten. Strukturierte Briefings vorbereiten.","Surveiller les marchés, les concurrents et les signaux. Préparer des briefings structurés.","Observar mercados, competidores y señales. Preparar briefings estructurados.","监测市场、竞争对手与信号，并准备结构化简报。")],
    ["02",tx(lang,"CONTENT & ADAPTATION","CONTENT & VARIANTEN","CONTENU & ADAPTATION","CONTENIDO & ADAPTACIÓN","内容与适配"),tx(lang,"Turn one core message into useful variants for markets, roles and formats.","Eine Kernbotschaft in passende Varianten für Märkte, Rollen und Formate übersetzen.","Décliner un message central en variantes adaptées aux marchés, aux rôles et aux formats.","Adaptar un mensaje central a mercados, perfiles y formatos.","将一个核心信息转化为适合不同市场、角色与形式的版本。")],
    ["03",tx(lang,"SALES SUPPORT","VERTRIEBSUNTERSTÜTZUNG","SOUTIEN COMMERCIAL","APOYO A VENTAS","销售支持"),tx(lang,"Prepare product knowledge, arguments and follow-up material for sales.","Produktwissen, Argumente und Follow-up-Material für den Vertrieb vorbereiten.","Préparer les connaissances produit, les arguments et les supports de suivi pour les équipes commerciales.","Preparar conocimiento de producto, argumentos y materiales de seguimiento para ventas.","为销售团队准备产品知识、论据和跟进材料。")],
    ["04",tx(lang,"WORKFLOWS & AUTOMATION","WORKFLOWS & AUTOMATISIERUNG","WORKFLOWS & AUTOMATISATION","FLUJOS DE TRABAJO & AUTOMATIZACIÓN","工作流与自动化"),tx(lang,"Take over defined recurring tasks and connect tools and processes.","Definierte wiederkehrende Aufgaben übernehmen und Tools sowie Prozesse verbinden.","Prendre en charge des tâches récurrentes définies et relier les outils aux processus.","Asumir tareas recurrentes definidas y conectar herramientas y procesos.","承担明确的重复任务，并连接工具与流程。")]
  ];
  return <div className="future-team"><p className="poster-kicker">{tx(lang,"AI & THE TEAM OF THE FUTURE","KI & DAS TEAM DER ZUKUNFT","IA & L’ÉQUIPE DU FUTUR","IA & EL EQUIPO DEL FUTURO","AI 与未来团队")}</p><h3>{tx(lang,"DIGITAL TEAM MEMBERS.\nCLEAR RESPONSIBILITIES.","DIGITALE MITARBEITER.\nKLARE AUFGABEN.","COÉQUIPIERS NUMÉRIQUES.\nRESPONSABILITÉS CLAIRES.","MIEMBROS DIGITALES DEL EQUIPO.\nRESPONSABILIDADES CLARAS.","数字团队成员。\n职责清晰。")}</h3><p className="future-team-intro">{tx(lang,"I am exploring how specialized AI agents can extend a marketing team with additional operational capacity — not as a replacement for leadership or human judgment, but as digital team members for clearly defined tasks.","Ich beschäftige mich damit, wie spezialisierte KI-Agenten ein Marketingteam um zusätzliche operative Kapazität erweitern können – nicht als Ersatz für Führung oder menschliches Urteilsvermögen, sondern als digitale Mitarbeiter für klar definierte Aufgaben.","J’explore comment des agents IA spécialisés peuvent apporter une capacité opérationnelle supplémentaire à une équipe marketing — non pas pour remplacer le leadership ou le jugement humain, mais comme coéquipiers numériques pour des tâches clairement définies.","Exploro cómo agentes de IA especializados pueden ampliar la capacidad operativa de un equipo de marketing — no para sustituir el liderazgo ni el criterio humano, sino como miembros digitales del equipo para tareas claramente definidas.","我关注专业 AI 智能体如何为营销团队增加运营能力——不是替代领导力或人的判断，而是作为承担明确任务的数字团队成员。")}</p><div className="future-team-grid">{cards.map(([n,t,c])=><article key={n}><span>{n}</span><b>{t}</b><p>{c}</p></article>)}</div><strong className="future-team-principle">{tx(lang,"PEOPLE SET DIRECTION. DIGITAL TEAM MEMBERS TAKE ON DEFINED TASKS. LEADERSHIP ORCHESTRATES BOTH.","MENSCHEN GEBEN RICHTUNG. DIGITALE MITARBEITER ÜBERNEHMEN DEFINIERTE AUFGABEN. FÜHRUNG ORCHESTRIERT BEIDES.","LES HUMAINS DONNENT LA DIRECTION. LES COÉQUIPIERS NUMÉRIQUES PRENNENT EN CHARGE DES TÂCHES DÉFINIES. LE LEADERSHIP ORCHESTRE LES DEUX.","LAS PERSONAS MARCAN LA DIRECCIÓN. LOS MIEMBROS DIGITALES DEL EQUIPO ASUMEN TAREAS DEFINIDAS. EL LIDERAZGO ORQUESTA AMBOS.","人确定方向。数字团队成员承担明确任务。领导力协调两者。")}</strong></div>;
}

export default function PosterSite(){
  const {lang}=useLanguage();
  const [draft,setDraft]=useState(base),[ctx,setCtx]=useState(base),[built,setBuilt]=useState(false);
  const a=buildApproach(ctx,lang),plan=activationPlan(lang,ctx);
  const build=()=>{setCtx(draft);setBuilt(true);setTimeout(()=>document.querySelector("#example")?.scrollIntoView({behavior:"smooth"}),40)};
  return <>
    <header className="poster-hero" id="top"><div className="hero-application"><ApplicationEdition/></div><nav><b>B2B MARKETING INTELLIGENCE LAB</b><LanguageDropdown/></nav><div className="hero-stage"><div className="hero-title-row"><h1>{tx(lang,"FROM\nCOMPLEXITY\nTO CLARITY.","VON\nKOMPLEXITÄT\nZU KLARHEIT.","DE LA\nCOMPLEXITÉ\nÀ LA CLARTÉ.","DE LA\nCOMPLEJIDAD\nA LA CLARIDAD.","从复杂\n到清晰。")}</h1><div className="hero-complexity-scribble"><ComplexityScribble/></div></div><div className="hero-lower-row"><div className="hero-copy"><span className="hero-rule"/><p className="poster-intro">{tx(lang,"Product knowledge becomes relevant communication for markets, customers and sales.","Produktwissen wird zu relevanter Kommunikation für Märkte, Kunden und Vertrieb.","Le savoir produit devient une communication pertinente pour les marchés, les clients et les ventes.","El conocimiento de producto se convierte en comunicación relevante para mercados, clientes y ventas.","产品知识转化为面向市场、客户和销售的相关沟通。")}</p><a className="primary poster-cta" href="#lab">{tx(lang,"EXPLORE ONE EXAMPLE →","EIN BEISPIEL ANSEHEN →","VOIR UN EXEMPLE →","VER UN EJEMPLO →","查看示例 →")}</a><div className="hero-direction-scribble"><DirectionScribble/></div><PositioningSignals/></div><figure className="hero-portrait"><img src="/ricardo-portrait.jpg" alt="Ricardo Lavoie"/></figure></div></div></header>

    <section className="poster-problem"><p className="poster-kicker">01 / {tx(lang,"THE CHALLENGE","DIE HERAUSFORDERUNG","LE DÉFI","EL RETO","挑战")}</p><h2>{tx(lang,"ONE BRAND.\nMANY MARKETS.\nRELEVANT MESSAGES.","EINE MARKE.\nVIELE MÄRKTE.\nRELEVANTE BOTSCHAFTEN.","UNE MARQUE.\nPLUSIEURS MARCHÉS.\nDES MESSAGES PERTINENTS.","UNA MARCA.\nMUCHOS MERCADOS.\nMENSAJES RELEVANTES.","一个品牌。\n多个市场。\n相关信息。")}</h2><p>{tx(lang,"The challenge is not producing more content. It is connecting product knowledge with the right market, customer need and sales situation.","Die Herausforderung ist nicht mehr Content. Entscheidend ist, Produktwissen mit dem richtigen Markt, Kundenbedarf und der Vertriebssituation zu verbinden.","Le défi n’est pas de produire plus de contenu, mais de relier le savoir produit au bon marché, au besoin client et à la situation commerciale.","El reto no es producir más contenido, sino conectar el conocimiento del producto con el mercado, la necesidad del cliente y la situación comercial adecuados.","挑战不是生产更多内容，而是把产品知识与正确的市场、客户需求和销售场景连接起来。")}</p></section>

    <section id="lab" className="poster-lab"><p className="poster-kicker">02 / {tx(lang,"EXPLORE A MARKET OPPORTUNITY","MARKTCHANCE ERKUNDEN","EXPLORER UNE OPPORTUNITÉ","EXPLORAR UNA OPORTUNIDAD","探索市场机会")}</p><h2>{tx(lang,"CHOOSE A CONTEXT.\nSEE THE THINKING.","KONTEXT WÄHLEN.\nDENKWEISE ERLEBEN.","CHOISIR UN CONTEXTE.\nVOIR LA LOGIQUE.","ELIGE UN CONTEXTO.\nVE LA LÓGICA.","选择情境。\n查看思路。")}</h2><div className="poster-selectors four"><label><span>{tx(lang,"BUSINESS OCCASION","ANLASS","CONTEXTE MÉTIER","OCASIÓN DE NEGOCIO","业务场景")}</span><select value={draft.solution} onChange={e=>setDraft({...draft,solution:e.target.value})}>{topics.map(x=><option key={x} value={x}>{topicLabel(lang,x)}</option>)}</select></label><label><span>{tx(lang,"MARKET","MARKT","MARCHÉ","MERCADO","市场")}</span><select value={draft.market} onChange={e=>setDraft({...draft,market:e.target.value})}>{markets.map(x=><option key={x} value={x}>{ol(lang,x)}</option>)}</select></label><label><span>{tx(lang,"BUYING ROLE","ENTSCHEIDER","RÔLE DÉCISIONNAIRE","ROL DECISOR","决策角色")}</span><select value={draft.role} onChange={e=>setDraft({...draft,role:e.target.value})}>{roles.map(x=><option key={x} value={x}>{ol(lang,x)}</option>)}</select></label><label><span>{tx(lang,"OBJECTIVE","ZIEL","OBJECTIF","OBJETIVO","目标")}</span><select value={draft.objective} onChange={e=>setDraft({...draft,objective:e.target.value})}>{goals.map(x=><option key={x} value={x}>{ol(lang,x)}</option>)}</select></label></div><button className="primary" onClick={build}>{tx(lang,"BUILD MARKET APPROACH →","MARKTANSATZ ERSTELLEN →","CRÉER L’APPROCHE MARCHÉ →","CREAR ENFOQUE DE MERCADO →","生成市场方案 →")}</button>{built&&<div id="example" className="poster-results four"><article><b>01 / {tx(lang,"MARKET HYPOTHESIS","MARKTHYPOTHESE","HYPOTHÈSE MARCHÉ","HIPÓTESIS DE MERCADO","市场假设")}</b><p>{a.hypothesis}</p></article><article><b>02 / {tx(lang,"VALUE PROPOSITION","NUTZENVERSPRECHEN","PROPOSITION DE VALEUR","PROPUESTA DE VALOR","价值主张")}</b><p>{a.value}</p></article><article><b>03 / {tx(lang,"CORE MESSAGE","KERNBOTSCHAFT","MESSAGE CENTRAL","MENSAJE CENTRAL","核心信息")}</b><h3>{a.core}</h3></article><article className="activation-result"><b>04 / {tx(lang,"RECOMMENDED ACTIVATION","EMPFOHLENE MASSNAHMEN","ACTIVATION RECOMMANDÉE","ACTIVACIÓN RECOMENDADA","推荐行动")}</b><span>{tx(lang,"PRIMARY MEASURE","PRIMÄRE MASSNAHME","MESURE PRINCIPALE","MEDIDA PRINCIPAL","主要措施")}</span><h4>{plan.primary}</h4><span>{tx(lang,"SECONDARY MEASURES","SEKUNDÄRE MASSNAHMEN","MESURES SECONDAIRES","MEDIDAS SECUNDARIAS","辅助措施")}</span><p>{plan.secondary}</p></article><small>{tx(lang,"ONE STRATEGY · MULTIPLE TOUCHPOINTS · SALES-READY","EINE STRATEGIE · MEHRERE TOUCHPOINTS · VERTRIEBSNAH","UNE STRATÉGIE · PLUSIEURS POINTS DE CONTACT · PRÊT POUR LA VENTE","UNA ESTRATEGIA · MÚLTIPLES PUNTOS DE CONTACTO · LISTO PARA VENTAS","一个战略 · 多个触点 · 支持销售")}</small></div>}<FutureTeam lang={lang}/></section>

    <LocalizedPersonalSection/>

    <section className="poster-ai"><p className="poster-kicker">04 / {tx(lang,"MY PRINCIPLE","MEIN PRINZIP","MON PRINCIPE","MI PRINCIPIO","我的原则")}</p><h2>{tx(lang,"AI IS NOT\nTHE STRATEGY.","KI IST NICHT\nDIE STRATEGIE.","L’IA N’EST PAS\nLA STRATÉGIE.","LA IA NO ES\nLA ESTRATEGIA.","AI 不是\n战略。")}</h2><h3>{tx(lang,"EXPERIENCE GUIDES JUDGMENT.\nTECHNOLOGY EXPANDS WHAT IS POSSIBLE.","ERFAHRUNG GIBT URTEILSKRAFT.\nTECHNOLOGIE ERWEITERT, WAS MÖGLICH IST.","L’EXPÉRIENCE GUIDE LE JUGEMENT.\nLA TECHNOLOGIE ÉLARGIT LE CHAMP DES POSSIBLES.","LA EXPERIENCIA GUÍA EL CRITERIO.\nLA TECNOLOGÍA AMPLÍA LO POSIBLE.","经验带来判断力。\n技术拓展可能性。")}</h3></section>

    <section className="poster-close"><p className="poster-kicker">05 / {tx(lang,"THE POINT","DER PUNKT","L’IDÉE","LA IDEA","核心")}</p><h2>{tx(lang,"EXPERIENCE × CURIOSITY.\nJUDGMENT × TECHNOLOGY.\nPEOPLE × CHANGE.","ERFAHRUNG × NEUGIER.\nURTEILSKRAFT × TECHNOLOGIE.\nMENSCHEN × VERÄNDERUNG.","EXPÉRIENCE × CURIOSITÉ.\nJUGEMENT × TECHNOLOGIE.\nHUMAINS × CHANGEMENT.","EXPERIENCIA × CURIOSIDAD.\nCRITERIO × TECNOLOGÍA.\nPERSONAS × CAMBIO.","经验 × 好奇心。\n判断力 × 技术。\n人 × 变革。")}</h2><p>{tx(lang,"This is not a proposal for the client company. It is a purpose-built glimpse into how I think about international B2B marketing leadership.","Dies ist kein Konzeptvorschlag für das Mandantenunternehmen, sondern ein gezielter Einblick in meine Denkweise zu internationaler B2B-Marketingführung.","Il ne s’agit pas d’une proposition pour l’entreprise cliente, mais d’un aperçu ciblé de ma manière de penser le leadership marketing B2B international.","No es una propuesta para la empresa cliente, sino una muestra concreta de cómo entiendo el liderazgo de marketing B2B internacional.","这不是为客户公司提出的方案，而是对我如何思考国际 B2B 营销领导力的简洁展示。")}</p></section>

    <ApplicationEdition footer/><footer className="poster-footer"><div><h2>Ricardo Lavoie, M.A.</h2><p>{tx(lang,"MARKETING STRATEGY · INTERNATIONAL B2B · BRAND · AI & AUTOMATION","MARKETINGSTRATEGIE · INTERNATIONALES B2B · MARKE · KI & AUTOMATISIERUNG","STRATÉGIE MARKETING · B2B INTERNATIONAL · MARQUE · IA & AUTOMATISATION","ESTRATEGIA DE MARKETING · B2B INTERNACIONAL · MARCA · IA & AUTOMATIZACIÓN","营销战略 · 国际 B2B · 品牌 · AI 与自动化")}</p></div><LanguageDropdown/><a href="#top">{tx(lang,"Back to top ↑","Nach oben ↑","Retour en haut ↑","Volver arriba ↑","返回顶部 ↑")}</a></footer>
  </>;
}