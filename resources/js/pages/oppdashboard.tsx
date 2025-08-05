import React from 'react';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppHeader } from '@/components/app-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const metrics = [
  {
    name: 'Users',
    value: '1,245',
    change: '+5.2%',
    badge: 'Active',
    badgeVariant: 'default',
    icon: (
      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
    ),
  },
  {
    name: 'Revenue',
    value: '$8,430',
    change: '+2.1%',
    badge: 'Monthly',
    badgeVariant: 'secondary',
    icon: (
      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 16v-4" /></svg>
    ),
  },
  {
    name: 'Orders',
    value: '320',
    change: '-1.3%',
    badge: 'Today',
    badgeVariant: 'outline',
    icon: (
      <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 7a2 2 0 012-2h14a2 2 0 012 2m-2 0v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7m5 4h4" /></svg>
    ),
  },
  {
    name: 'Pending',
    value: '18',
    change: '+0.8%',
    badge: 'Pending',
    badgeVariant: 'destructive',
    icon: (
      <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
  },
];

const Dashboard: React.FC = () => {
  const today = new Date().toLocaleDateString();

  return (
    <AppShell variant="sidebar">
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-h-screen bg-muted/50">
          <AppHeader />
          <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-1">Welcome back 👋</h1>
                <p className="text-muted-foreground">Here's your dashboard overview for {today}</p>
              </div>
              <div>
                <Separator className="my-2 md:hidden" />
                <button className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-2 text-primary-foreground shadow hover:bg-primary/90 transition-colors">
                  Download Report
                </button>
              </div>
            </div>
            {/* Metrics Cards */}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-10">
              {metrics.map((metric, idx) => (
                <Card key={metric.name} className={cn('animate-fade-in-up', 'transition-transform duration-500 hover:scale-105 hover:shadow-lg')} style={{ animationDelay: `${idx * 100}ms` }}>
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    {metric.icon}
                    <div className="ml-auto">
                      <Badge variant={metric.badgeVariant as any}>{metric.badge}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                    <div className="text-sm text-muted-foreground">{metric.name}</div>
                    <div className={cn('text-xs font-semibold', metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500')}>{metric.change}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {/* Chart Card */}
            <Card className="animate-fade-in-up">
              <CardHeader>
                <CardTitle>Weekly Activity</CardTitle>
                <CardDescription>Overview of activity for the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full h-64 flex items-center justify-center">
                  {/* Simple SVG Chart Placeholder */}
                  <svg viewBox="0 0 400 150" className="w-full h-full">
                    <polyline
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="4"
                      points="0,120 50,100 100,80 150,90 200,60 250,80 300,40 350,60 400,30"
                      className="animate-dash"
                    />
                    <circle cx="300" cy="40" r="6" fill="#6366f1" className="animate-pulse" />
                  </svg>
                </div>
              </CardContent>
            </Card>
            {/* Animations */}
            <style>{`
              @keyframes fade-in-up {
                0% { opacity: 0; transform: translateY(40px); }
                100% { opacity: 1; transform: translateY(0); }
              }
              .animate-fade-in-up {
                animation: fade-in-up 0.8s cubic-bezier(0.4,0,0.2,1) both;
              }
              @keyframes dash {
                to {
                  stroke-dashoffset: 0;
                }
              }
              .animate-dash {
                stroke-dasharray: 1000;
                stroke-dashoffset: 1000;
                animation: dash 2s ease-in-out forwards;
              }
            `}</style>
          </main>
        </div>
      </div>
    </AppShell>
  );
};

export default Dashboard;
