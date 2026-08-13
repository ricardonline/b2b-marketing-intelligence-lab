export function Label({children}:{children:React.ReactNode}){return <p className="label">{children}</p>}
export function Status({children}:{children:React.ReactNode}){return <span className="status">◇ {children}</span>}
export function SectionTitle({eyebrow,title,copy}:{eyebrow:string;title:string;copy?:string}){return <header className="section-head"><Label>{eyebrow}</Label><h2>{title}</h2>{copy&&<p className="lede">{copy}</p>}</header>}
export function Flow({items,className=""}:{items:string[];className?:string}){return <div className={`flow ${className}`}>{items.map((x,i)=><div key={x} className="flow-item"><span>{x}</span>{i<items.length-1&&<b aria-hidden>↓</b>}</div>)}</div>}
