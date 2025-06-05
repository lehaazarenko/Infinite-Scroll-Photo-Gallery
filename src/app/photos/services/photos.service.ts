import { Injectable } from "@angular/core";
import photosJson from '../../../assets/photos.json';
import { BehaviorSubject, debounceTime, delay, map, Observable, of, timeout } from "rxjs";
import { Photo } from "../photos.model";

@Injectable()
export class PhotosService {
    private allPhotos: Photo[] = [...photosJson];
    private notLoadedPhotos: Photo[] = [];
    private photosSubject = new BehaviorSubject<Photo[]>([]);
    private favoritePhotosSubject = new BehaviorSubject<Photo[]>([]);
    private localStorageFavoritePhotosName = 'favorite-photos';

    // photos$ = this.photosSubject.pipe(delay(this.getRandomDelay()));
    photos$ = this.photosSubject.pipe(delay(1000));
    favoritePhotos$ = this.favoritePhotosSubject.pipe(delay(this.getRandomDelay()));

    constructor() {
        const favoritePhotosIds = this.getFavoritePhotosIdsFromLocalStorage();
        this.allPhotos.forEach((photo) => {
            if (favoritePhotosIds.includes(photo.id.toString())) {
                photo.isFavorite = true;
            }
        });
        this.notLoadedPhotos = [...this.allPhotos];
    }

    initLoadPhotos(count: number): void {
        this.notLoadedPhotos = [...this.allPhotos];
        this.loadPhotos(count);
    }

    loadPhotos(count: number): void {
        const newPhotos = this.getRandomPhotos(count);
        this.photosSubject.next(newPhotos);
    }

    addToFavorite(id: number): void {
        const favoritePhotosIds = this.getFavoritePhotosIdsFromLocalStorage();
        const stringId = id.toString();

        if (!favoritePhotosIds.length){
            localStorage.setItem(this.localStorageFavoritePhotosName, stringId);
            return;
        } else if (!favoritePhotosIds.includes(stringId)) {
            favoritePhotosIds.push(stringId);
            this.setNewFavoritePhotosToLocalStorage(favoritePhotosIds);
        }
    }

    removeFromFavorites(id: number): void {
        if (!this.favoritePhotosSubject.value.length) {
            this.loadFavoritePhotos();
        }

        const filteredFavoritePhotos = this.favoritePhotosSubject.value.filter((photo) => photo.id !== id);
        const filteredFavoritePhotosIds = filteredFavoritePhotos.map((photo) => photo.id.toString());
        this.setNewFavoritePhotosToLocalStorage(filteredFavoritePhotosIds);
        this.favoritePhotosSubject.next(filteredFavoritePhotos);
        const unfavoritedPhoto = this.allPhotos.find((photo) => photo.id === id);
        if (unfavoritedPhoto) unfavoritedPhoto.isFavorite = false;
    }

    loadFavoritePhotos(): void {
        const favoritePhotosIds = this.getFavoritePhotosIdsFromLocalStorage();
        const favoritePhotos = photosJson.filter((photo) => (
            favoritePhotosIds.includes(photo.id.toString())
        ));
        this.favoritePhotosSubject.next(favoritePhotos);
    }

    getPhotoFromFavorites(id: number): Observable<Photo> {
        if (!this.favoritePhotosSubject.value.length) {
            this.loadFavoritePhotos();
        }
        const favoritePhotos = this.favoritePhotosSubject.value;
        return of(favoritePhotos.find((photo) => photo.id === id) as Photo)
            .pipe(
                delay(this.getRandomDelay())
            );
    }

    private getRandomDelay(): number {
        const delay = 200 + Math.floor(Math.random() * 100);
        return delay;
    }

    private setNewFavoritePhotosToLocalStorage(favoritePhotos: string[]): void {
        localStorage.setItem(this.localStorageFavoritePhotosName, favoritePhotos.join(';'));
    }

    private getFavoritePhotosIdsFromLocalStorage(): string[] {
        const favoritePhotos = localStorage.getItem('favorite-photos');
        if (!favoritePhotos) {
            return [];
        }

        const favoritePhotosArray = favoritePhotos.split(';');
        return favoritePhotosArray;
    }

    private getRandomPhotos(count: number): Photo[] {
        const newPhotos = [];
        const maxCount = count > this.notLoadedPhotos.length ? this.notLoadedPhotos.length : count;
        for (let i = 0; i < maxCount; i++) {
            newPhotos.push(this.getRandomPhoto());
        }

        return newPhotos;
    }

    private getRandomPhoto(): Photo {
        const randomIndex = this.getRandomIndex(this.notLoadedPhotos.length);
        const selectedPhoto = this.notLoadedPhotos.splice(randomIndex, 1)[0];
        return selectedPhoto;
    }

    private getRandomIndex(length: number): number {
        return Math.floor(Math.random() * length);
    }
}