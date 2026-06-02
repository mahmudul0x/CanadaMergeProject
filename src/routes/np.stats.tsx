// @refresh reset
import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Star } from "lucide-react";
import { Avatar, Card, PageHeader, StatCard } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/np/stats")({ component: () => {
  const data = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d,i)=>({day:d, visits:[5,7,6,8,5,3,2][i]}));
  return (
    <>
      <PageHeader title="My Stats" sub="November performance summary" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard label="Visits Completed" value="142" delta="+18 vs Oct" tone="good" />
        <StatCard label="Avg Rating" value="4.87★" delta="Top 5% of NPs" tone="good" />
        <StatCard label="Avg Visit" value="38 min" delta="Including travel" />
        <StatCard label="KM Traveled" value="1,420" delta="Reimbursable" />
      </div>
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card>
          <h3 className="text-lg mb-3">Visits this week</h3>
          <div className="h-64">
            <ResponsiveContainer><BarChart data={data}><CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.025 240)"/><XAxis dataKey="day" tick={{fontSize:12}}/><YAxis tick={{fontSize:12}}/><Tooltip/><Bar dataKey="visits" fill="oklch(0.52 0.13 245)" radius={[8,8,0,0]}/></BarChart></ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <h3 className="text-lg mb-4">Rating breakdown</h3>
          <ul className="space-y-3">
            {[{s:5,p:82},{s:4,p:14},{s:3,p:4}].map(r=>(
              <li key={r.s} className="flex items-center gap-3 text-sm">
                <span className="flex items-center gap-0.5 w-12 text-warning"><Star className="h-3.5 w-3.5 fill-current"/>{r.s}</span>
                <div className="flex-1 h-2 bg-border rounded-full overflow-hidden"><div className="h-full bg-primary" style={{width:`${r.p}%`}}/></div>
                <span className="w-10 text-right font-semibold">{r.p}%</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-3 border-t border-border pt-4">
            <p className="text-xs font-bold uppercase tracking-wider text-secondary-ink">Recent reviews</p>
            {[{n:"Sarah M.",q:"Incredible. So calm with my daughter."},{n:"David K.",q:"Punctual and thorough."}].map(r=>(
              <div key={r.n} className="flex items-start gap-2.5">
                <Avatar name={r.n} size={28}/>
                <div className="text-sm"><p className="font-semibold">{r.n}</p><p className="text-secondary-ink text-xs">“{r.q}”</p></div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}});