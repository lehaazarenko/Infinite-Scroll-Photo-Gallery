import { TestBed } from "@angular/core/testing";
import { PhotosService } from "./photos.service";

describe('PhotosService', () => {
    let service: PhotosService;
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PhotosService]
        })
        service = TestBed.inject(PhotosService);
        localStorage.removeItem('favorite-photos');
    });

    it('service should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call loadPhotos when calling initLoadPhotos', () => {
        spyOn(service, 'loadPhotos');
        service.initLoadPhotos(5);
        expect(service.loadPhotos).toHaveBeenCalled();
    });

    it('should return random photos from getRandomPhotos', () => {
        const count = 5;
        service.initLoadPhotos(count);
        expect(service['getRandomPhotos'](count).length).toBeGreaterThan(0);
    });

    it('should add to favorite when localstorage is clear', () => {
        const id = 2;
        service.addToFavorite(id);
        const favoriteIdsFromLocalStorage = service['getFavoritePhotosIdsFromLocalStorage']();
        const favoriteIdExistsInLocalStorage = favoriteIdsFromLocalStorage?.includes(id.toString());
        expect(favoriteIdExistsInLocalStorage).toBeTrue();
    });

    it('should add to favorite when localstorage already has saved items', () => {
        service.addToFavorite(1);
        service.addToFavorite(3);
        const id = 2;
        service.addToFavorite(id);
        const favoriteIdsFromLocalStorage = service['getFavoritePhotosIdsFromLocalStorage']();
        const favoriteIdExistsInLocalStorage = favoriteIdsFromLocalStorage?.includes(id.toString());
        expect(favoriteIdExistsInLocalStorage).toBeTrue();
    });

    it('should remove from favorite', () => {
        service.addToFavorite(1);
        service.addToFavorite(3);
        const id = 2;
        service.addToFavorite(id);
        service.removeFromFavorites(id);
        const favoriteIdsFromLocalStorage = service['getFavoritePhotosIdsFromLocalStorage']();
        const favoriteIdExistsInLocalStorage = favoriteIdsFromLocalStorage?.includes(id.toString());
        expect(favoriteIdExistsInLocalStorage).toBeFalse();
    });

    it('getRandomDelay should return number between 200 and 300', () => {
        const randomDelay = service['getRandomDelay']();
        expect(randomDelay).toBeGreaterThanOrEqual(200);
        expect(randomDelay).not.toBeGreaterThanOrEqual(300);
    });

    it('should not return photo on getPhotoFromFavorites if not added', (done: DoneFn) => {
        const id = 2;
        service.getPhotoFromFavorites(id).subscribe((data) => {
            expect(data).not.toBeDefined();
            done();
        });
    });

    it('should return photo on getPhotoFromFavorites if added', (done: DoneFn) => {
        const id = 2;
        service.addToFavorite(id);
        service.getPhotoFromFavorites(id).subscribe((data) => {
            expect(data).toBeDefined();
            done();
        });
    });
});