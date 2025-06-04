import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { PhotosService } from "../photos/photos.service";
import { Photo } from "../photos/photos.model";
import { PhotoCardComponent } from "../photos/photo-card/photo-card";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.html',
    styleUrls: ['./favorites.scss'],
    imports: [PhotoCardComponent],
    providers: [],
})
export class FavoritesComponent implements OnInit, OnDestroy {
    private readonly photosService = inject(PhotosService);
    private readonly router = inject(Router);

    private subscription: Subscription;
    favoritePhotos: Photo[] = [];

    constructor() {
        this.subscription = this.photosService.favoritePhotos$.subscribe((photos: Photo[]) => {
            this.favoritePhotos = photos;
        })
    }

    ngOnInit(): void {
        this.photosService.loadFavoritePhotos();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    handlePhotoClick(id: number): void {
        this.router.navigate(['/photos', id]);
    }
}