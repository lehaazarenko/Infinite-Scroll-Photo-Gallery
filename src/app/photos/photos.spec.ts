import { ComponentFixture, TestBed } from "@angular/core/testing"
import { PhotosComponent } from "./photos"
import { PhotosService } from "./services/photos.service";
import { By } from "@angular/platform-browser";
import { of } from 'rxjs';
import { Photo } from "./photos.model";

// class PhotosMockService {
//     photos$: of(mockPhotos)
// };

const mockPhotos: Photo[] = [
    {
        id: 1,
        href: 'bluh_bluh',
        isFavorite: false
    },
    {
        id: 2,
        href: 'bluh_bluh_2',
        isFavorite: true
    }
]

describe('Photos Component', () => {
    let fixture: ComponentFixture<PhotosComponent>;
    let component: PhotosComponent;
    let photosServiceMock: jasmine.SpyObj<PhotosService>;

    beforeEach(async () => {
        photosServiceMock = jasmine.createSpyObj('PhotosService', [
            'initLoadPhotos',
            'loadPhotos',
            'addToFavorite',
            'photos$'
        ]);
        TestBed.configureTestingModule({
            imports: [PhotosComponent],
            providers: [
                {
                    provide: PhotosService,
                    useValue: photosServiceMock
                }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        photosServiceMock.photos$ = of(mockPhotos);
        fixture = TestBed.createComponent(PhotosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create Photos Component', () => {
        expect(component).toBeTruthy();
    });

    it('should have loading component when isLoading set to true', () => {
        component.isLoading = true;
        fixture.detectChanges();
        const icon = fixture.debugElement.query(By.css('[data-testid="loading-spinner-icon"]'));
        expect(icon).not.toBeNull();
    });

    xit('should not have loading component when isLoading set to false', () => {
        component.isLoading = false;
        fixture.detectChanges();
        const icon = fixture.debugElement.query(By.css('[data-testid="loading-spinner-icon"]'));
        expect(icon).toBeNull();
    });

    it('should call initLoadPhotos in photosSerivce', () => {
        expect(photosServiceMock.initLoadPhotos).toHaveBeenCalled();
    });

    it('should call loadPhotos in photosService', () => {
        component.isLoading = false;
        component.loadMorePhotos();
        fixture.detectChanges();
        expect(photosServiceMock.loadPhotos).toHaveBeenCalled();
    });

    it('should not call loadPhotos if isLoading is true', () => {
        component.isLoading = true;
        component.loadMorePhotos();
        fixture.detectChanges();
        expect(photosServiceMock.loadPhotos).not.toHaveBeenCalled();
    });

    it('should not call loadPhotos if total is reached', () => {
        component.isLoading = false;
        component['total'] = mockPhotos.length;
        component.loadMorePhotos();
        fixture.detectChanges();
        expect(photosServiceMock.loadPhotos).not.toHaveBeenCalled();
    });

    it('should call handleCardClick on card click', () => {
        spyOn(component, 'handleCardClick');
        const card = fixture.debugElement.nativeElement.querySelector('[data-testid="photo-card-1"]');
        card.click();
        fixture.detectChanges();
        expect(component.handleCardClick).toHaveBeenCalled();
    });

    it('should call addToFavorite in handleCardClick', () => {
        component.handleCardClick(2);
        expect(photosServiceMock.addToFavorite).toHaveBeenCalled();
    });
});