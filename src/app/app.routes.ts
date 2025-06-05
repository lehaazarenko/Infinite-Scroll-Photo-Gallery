import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./components/photo-gallery/photo-gallery').then((m) => m.PhotoGalleryComponent)
    },
    {
        path: 'favorites',
        pathMatch: 'full',
        loadComponent: () => import('./components/favorites/favorites').then((m) => m.FavoritesComponent)
    },
    {
        path: 'photos/:id',
        pathMatch: 'full',
        loadComponent: () => import('./components/photo/photo').then((m) => m.PhotoComponent)
    },
];
