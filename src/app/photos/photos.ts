import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { PhotosService } from "./photos.service";
import { Photo } from "./photos.model";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { debounceTime, Subscription } from "rxjs";
import { PhotoCardComponent } from "./photo-card/photo-card";
import { LoadingComponent } from "../loading/loading";

@Component({
    selector: 'app-photos',
    templateUrl: './photos.html',
    styleUrls: ['./photos.scss'],
    imports: [FontAwesomeModule, PhotoCardComponent, LoadingComponent],
    providers: []
})
export class PhotosComponent implements OnInit, OnDestroy {
    private readonly photosService = inject(PhotosService);

    private numberOfLoadingItems = 10;
    private subscription: Subscription;
    private total = 29;
    photos: Photo[] = [];
    isLoading = true;

    constructor() {
        this.subscription = this.photosService.photos$.pipe(
            debounceTime(1000)
        ).subscribe((photos: Photo[]) => {
            if (photos.length) {
                this.photos = [...this.photos, ...photos]
            }
            this.isLoading = false;
        });
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.photosService.initLoadPhotos(this.numberOfLoadingItems);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    loadMorePhotos(): void {
        this.isLoading = true;
        if (this.photos.length !== this.total) {
            this.photosService.loadPhotos(this.numberOfLoadingItems);
        }
    }

    handleCardClick(id: number): void {
        this.photosService.addToFavorite(id);
        const cickedPhoto = this.photos.find((photo) => photo.id === id);
        if (cickedPhoto){
            cickedPhoto.isFavorite = true;
        }
    }
}