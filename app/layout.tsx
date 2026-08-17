import type { Metadata } from "next";
import "./globals.css";
import "./strategy-brief.css";
import "./personal.css";
import "./language.css";
import "./poster.css";
import "./hero-refinement.css";
import "./lab-refinement.css";
import "./next-step.css";
export const metadata: Metadata = {title:"B2B Marketing Intelligence Lab",description:"A concise work sample for international B2B marketing leadership."};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
