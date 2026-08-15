"use client";
import {tx,useLanguage,type Lang} from "./i18n";

const options:{code:Lang;label:string}[]=[
 {code:"en",label:"English"},
 {code:"de",label:"Deutsch"},
 {code:"fr",label:"Français"},
 {code:"es",label:"Español"},
 {code:"zh",label:"中文"}
];

export function LanguageDropdown(){
 const {lang,setLang}=useLanguage();
 return <label className="language-dropdown">
   <span>{tx(lang,"Select language","Sprache auswählen","Choisir la langue","Seleccionar idioma","选择语言")}</span>
   <select value={lang} onChange={e=>setLang(e.target.value as Lang)} aria-label={tx(lang,"Select language","Sprache auswählen","Choisir la langue","Seleccionar idioma","选择语言")}>
     {options.map(o=><option key={o.code} value={o.code}>{o.label}</option>)}
   </select>
 </label>
}
