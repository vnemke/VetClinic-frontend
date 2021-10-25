import { NavigationItem } from '../model';

export const navigation: NavigationItem[] = [
    {
        id: 'clinic',
        title: 'Vet Clinic',
        type: 'group',
        icon: 'apps',
        children: [
            {
                id: 'cases',
                title: 'Cases',
                type: 'item',
                icon: 'description',
                url: '/app/cases',
            },
            {
                id: 'pets',
                title: 'Pets',
                type: 'item',
                icon: 'pets',
                url: '/app/pets'
            },
            {
                id: 'services',
                title: 'Services',
                type: 'item',
                icon: 'medication',
                url: '/app/pet-services'
            }
        ]
    },
    {
        id: 'users',
        title: 'User managment',
        type: 'group',
        icon: 'apps',
        children: [
            {
                id: 'users',
                title: 'Users',
                type: 'item',
                icon: 'person',
                url: '/app/users'
            }
        ]
    }
];
