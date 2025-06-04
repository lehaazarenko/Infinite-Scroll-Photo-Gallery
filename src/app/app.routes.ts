import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./photos/photos').then((m) => m.PhotosComponent)
    },
    {
        path: 'favorites',
        pathMatch: 'full',
        loadComponent: () => import('./favorites/favorites').then((m) => m.FavoritesComponent)
    },
    {
        path: 'photos/:id',
        pathMatch: 'full',
        loadComponent: () => import('./photos/photo/photo').then((m) => m.PhotoComponent)
    },
];
