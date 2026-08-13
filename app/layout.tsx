import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {title:"B2B Marketing Intelligence Lab",description:"A strategic concept for international B2B marketing leadership."};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
