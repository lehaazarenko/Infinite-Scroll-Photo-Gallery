import { Component, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { PhotosService } from "../photos.service";
import { Photo } from "../photos.model";

@Component({
    selector: 'app-photo',
    templateUrl: './photo.html',
    styleUrls: ['./photo.scss'],
    providers: []
})
export class PhotoComponent {
    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly photosService = inject(PhotosService);
    private readonly router = inject(Router);

    paramMapSubscription: Subscription;
    photoSubscription: Subscription = new Subscription();
    photo: Photo;

    constructor() {
        this.paramMapSubscription = this.activatedRoute.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
                this.subscribeToGetPhoto(+id);
            } else {
                this.router.navigateByUrl('/');
            }
        });
    }

    removeFromFavorites(): void {
        this.photosService.removeFromFavorites(this.photo.id);
        this.router.navigateByUrl('/favorites');
    }

    private subscribeToGetPhoto(id: number): void {
        this.photoSubscription = this.photosService.getPhoto(id).subscribe((photo) => {
            this.photo = photo;
        });
    }
}
