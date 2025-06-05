import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { PhotosService } from "../../services/photos.service";
import { Photo } from "../../models/photos.model";

@Component({
    selector: 'app-photo',
    templateUrl: './photo.html',
    styleUrls: ['./photo.scss'],
    providers: []
})
export class PhotoComponent implements OnInit {
    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly photosService = inject(PhotosService);
    private readonly router = inject(Router);

    paramMapSubscription: Subscription = new Subscription();
    photoSubscription: Subscription = new Subscription();
    photo: Photo;
    isLoading = false;

    ngOnInit(): void {
        this.paramMapSubscription = this.activatedRoute.paramMap.subscribe(params => {
            const id = params.get('id');

            if (!id) {
                this.navigateToHome();
                return;
            }

            this.subscribeToGetPhoto(+id);
        });
    }

    removeFromFavorites(): void {
        this.photosService.removeFromFavorites(this.photo.id);
        this.router.navigateByUrl('/favorites');
    }

    private subscribeToGetPhoto(id: number): void {
        this.isLoading = true;
        this.photoSubscription = this.photosService.getPhotoFromFavorites(id).subscribe((photo) => {
            this.isLoading = false;
            if (!photo) {
                this.navigateToHome();
                return;
            }

            this.photo = photo;
        });
    }

    private navigateToHome(): void {
        this.router.navigateByUrl('/');
    }
}
