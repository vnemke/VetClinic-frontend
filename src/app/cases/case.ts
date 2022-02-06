export interface Case {
    id: number;
    name: string;
    petId: number;
    pet: any;
    diagnosis: string;
    description: string;
    date: Date;
    therapyId: number;
    therapies: any;
    controls: any;
    xrays: any;
    vetId: number;
    vetCases: any;
    petServiceId: number;
    casePetServices: any;
    isPaid: boolean;
}
