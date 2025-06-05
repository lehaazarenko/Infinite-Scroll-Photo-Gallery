import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { PhotosService } from "../../services/photos.service";
import { Photo } from "../../models/photos.model";
import { PhotoCardComponent } from "../photo-card/photo-card";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { LoadingComponent } from "../loading/loading";

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.html',
    styleUrls: ['./favorites.scss'],
    imports: [PhotoCardComponent, LoadingComponent],
    providers: [],
})
export class FavoritesComponent implements OnInit, OnDestroy {
    private readonly photosService = inject(PhotosService);
    private readonly router = inject(Router);

    private subscription: Subscription;
    favoritePhotos: Photo[] = [];
    isLoading = true;

    constructor() {
        this.subscription = this.photosService.favoritePhotos$.subscribe((photos: Photo[]) => {
            this.favoritePhotos = photos;
            this.isLoading = false;
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