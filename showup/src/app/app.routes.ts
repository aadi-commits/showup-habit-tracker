import { Routes } from '@angular/router';
import { Layout } from './core/layout/layout';

export const routes: Routes = [
    {
        path: '',
        component: Layout,
        children:[
            {
                path: 'dashboard',
                loadComponent: () => 
                    import('./core/features/dashboard/dashboard').then(m => m.Dashboard)
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    }
];
