import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid, Map, CarTaxiFrontIcon, Truck, ListStartIcon, ChartBarBig, FileChartLine, SettingsIcon, NotepadText, Building2, Pilcrow, RadioIcon, Users } from 'lucide-react';
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
        icon: CarTaxiFrontIcon,
    },
    {
        title: 'Trucks',
        url: route('trucks.index'),
        icon: Truck,
    },
    {
        title: 'Stations',
        url: route('stations.index'),
        icon: ListStartIcon,
    },
    {
        title: 'Papiers',
        url: route('papiers.index'),
        icon: NotepadText,
    },
    {
        title: 'Consumptions',
        url: route('consumption.index'),
        icon: ChartBarBig,
    },
    {
        title: 'Factures',
        url: route('factures.index'),
        icon: FileChartLine,
    },
    {
        title: 'Reparations',
        url: route('reparations.index'),
        icon: SettingsIcon,
    },
    {
        title: 'Devices',
        url: route('device.index'),
        icon: RadioIcon,
    },
    {
        title: 'Live tracking',
        url: route('live-tracking.map'),
        icon: Map,
    },
    {
        title: 'Villes',
        url: route('reparations.index'),
        icon: Building2,
    },
    {
        title: 'Types',
        url: route('live-tracking.map'),
        icon: Pilcrow,
    },
    {
        title: 'Users',
        url: route('live-tracking.map'),
        icon: Users,
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
