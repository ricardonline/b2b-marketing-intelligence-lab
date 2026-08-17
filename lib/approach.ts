import type {Approach,Context} from "@/types";
import type {Lang} from "@/components/i18n";
import {ol} from "@/components/i18n";

const objectiveIntent:Record<string,string>={
"Enter a new market":"reduce uncertainty and establish relevance",
"Launch a new solution":"make the offer understandable and credible",
"Generate qualified leads":"create a useful reason for technical dialogue",
"Support sales":"give sales a clear and consistent story",
"Strengthen market position":"reinforce differentiated market relevance",
"Grow in an existing international market":"deepen relevance in an established market"
};

export function buildApproach(c:Context,lang:Lang="en"):Approach{
 const market=ol(lang,c.market),industry=ol(lang,c.industry),topic=ol(lang,c.solution),role=ol(lang,c.role),objective=ol(lang,c.objective);
 if(lang==="de") return {
  hypothesis:`Für ${market} liegt die Chance rund um ${topic} darin, technische Substanz mit den konkreten Fragen der Rolle ${role} zu verbinden. So wird aus einem Anlass eine klare, marktgerechte Argumentation für das Ziel ${objective}.`,
  priorities:["Technische Relevanz","Verständlichkeit","Vertriebsnutzen"],
  value:`Der Nutzen sollte nicht bei Features beginnen, sondern bei der Frage: Was verändert ${topic} für Anwendung, Betrieb, Investition oder Zusammenarbeit? Daraus entsteht eine Argumentation, die Technik und Business verbindet.`,
  core:`${topic}: technische Substanz in einen klaren Kundennutzen übersetzen.`,
  support:`Ein B2B-Ansatz für ${industry}, der Produktwissen, Markt, Entscheider und Vertrieb zusammenführt.`,
  proofs:["Technische Fakten","Anwendungsbezug","Vertriebsfeedback"]
 };
 if(lang==="fr") return {
  hypothesis:`Sur le marché ${market}, l’opportunité autour de ${topic} consiste à relier la substance technique aux questions concrètes du ${role}. Le sujet devient ainsi une argumentation claire et pertinente pour atteindre l’objectif : ${objective}.`,
  priorities:["Pertinence technique","Clarté","Utilité commerciale"],
  value:`La valeur ne commence pas par une liste de fonctionnalités, mais par ce que ${topic} change pour l’application, l’exploitation, l’investissement ou la collaboration.`,
  core:`${topic} : transformer la substance technique en valeur client claire.`,support:`Une approche B2B pour ${industry} reliant produit, marché, décideur et ventes.`,proofs:["Faits techniques","Cas d’usage","Feedback commercial"]};
 if(lang==="es") return {
  hypothesis:`En ${market}, la oportunidad en torno a ${topic} consiste en conectar la sustancia técnica con las preguntas concretas del ${role}. Así, la ocasión se convierte en un argumento claro y relevante para alcanzar el objetivo: ${objective}.`,
  priorities:["Relevancia técnica","Claridad","Utilidad comercial"],
  value:`El valor no empieza con una lista de funciones, sino con lo que ${topic} cambia en la aplicación, operación, inversión o colaboración.`,
  core:`${topic}: convertir la sustancia técnica en un beneficio claro para el cliente.`,support:`Un enfoque B2B para ${industry} que conecta producto, mercado, decisor y ventas.`,proofs:["Datos técnicos","Aplicación","Feedback de ventas"]};
 if(lang==="zh") return {
  hypothesis:`在${market}，围绕${topic}的机会在于把技术实质与${role}真正关心的问题连接起来，从而形成清晰、符合市场需求的论证，并服务于${objective}这一目标。`,
  priorities:["技术相关性","清晰度","销售价值"],
  value:`价值不应从功能清单开始，而应从${topic}对应用、运营、投资或合作方式带来的变化开始。`,
  core:`${topic}：把技术实质转化为清晰的客户价值。`,support:`面向${industry}的B2B方法，将产品、市场、决策者与销售连接起来。`,proofs:["技术事实","应用场景","销售反馈"]};
 const intent=objectiveIntent[c.objective]||"create clear market relevance";
 return {
  hypothesis:`In ${market}, the opportunity around ${topic.toLowerCase()} is to connect technical substance with the questions that matter to the ${role.toLowerCase()}. This turns a business occasion into a clear market argument designed to ${intent}.`,
  priorities:["Technical relevance","Clarity","Sales usefulness"],
  value:`Value should not start with a feature list. It should explain what ${topic.toLowerCase()} changes for the application, operation, investment or collaboration — connecting engineering substance with business relevance.`,
  core:`${topic}: turn technical substance into clear customer value.`,
  support:`A B2B approach for ${industry} that connects product knowledge, market, decision-maker and sales.`,
  proofs:["Technical facts","Application relevance","Sales feedback"]
 };
}
