import { usePage } from '@inertiajs/react';

interface Truck {
    id: number;
    matricule: string;
}

interface Driver {
    id: number;
    full_name: string;
}

interface City {
    id: number;
    name: string;
}

interface FleetData {
    trucks: Truck[];
    drivers: Driver[];
    cities: City[];
}

interface PageProps {
    fleetData?: FleetData;
}

export function useFleetData() {
    const { props } = usePage<PageProps>();

    return {
        trucks: props.fleetData?.trucks || [],
        drivers: props.fleetData?.drivers || [],
        cities: props.fleetData?.cities || [],
        hasFleetData: !!props.fleetData,
    };
}
