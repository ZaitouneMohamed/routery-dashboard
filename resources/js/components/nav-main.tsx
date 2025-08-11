import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid, Building, BusFront, Map } from 'lucide-react';
import AppLogo from './app-logo';

// Flat list of sidebar links
const sidebarNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Drivers',
        url: route('drivers.index'),
        icon: Building,
    },
    {
        title: 'Trucks',
        url: route('trucks.index'),
        icon: Building,
    },
    {
        title: 'Stations',
        url: route('stations.index'),
        icon: Building,
    },
    {
        title: 'Papiers',
        url: route('papiers.index'),
        icon: Building,
    },
    {
        title: 'Consumptions',
        url: route('consumption.index'),
        icon: BusFront,
    },
    {
        title: 'Factures',
        url: route('factures.index'),
        icon: BusFront,
    },
    //{
    //    title: 'Reparations',
    //    url: route('reparations.index'),
    //    icon: BusFront,
    //},
    {
        title: 'Live tracking',
        url: route('live-tracking.map'),
        icon: Map,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {/* Render flat links here */}
                <nav>
                    {sidebarNavItems.map((item) => (
                        <Link
                            key={item.title}
                            href={item.url}
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded transition"
                        >
                            {item.icon && <item.icon size={18} />}
                            <span>{item.title}</span>
                        </Link>
                    ))}
                </nav>
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
