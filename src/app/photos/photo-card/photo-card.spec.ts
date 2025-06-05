import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing"
import { PhotoCardComponent } from "./photo-card";
import { ComponentRef } from "@angular/core";
import { Photo } from "../photos.model";
import { By } from "@angular/platform-browser";

describe('LoadingComponent', () => {
    let fixture: ComponentFixture<PhotoCardComponent>;
    let component: PhotoCardComponent;
    let el: ComponentRef<PhotoCardComponent>;
    let mockPhoto: Photo;

    beforeEach((async () => {
        await TestBed.configureTestingModule({
            imports: [PhotoCardComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PhotoCardComponent);
        component = fixture.componentInstance;
        el = fixture.componentRef;
        mockPhoto = {
            href: 'https://fastly.picsum.photos/id/435/200/300.jpg?hmac=gSfIK7r5rB4f3aJq0RTylep967d4sBRbIUuAOuq433o',
            id: 2,
            isFavorite: false
        };
    });

    it('should create photo card component', () => {
        expect(component).toBeTruthy();
    });

    it('should call handleCardClick on click', fakeAsync(() => {
        el.setInput('photo', mockPhoto);
        fixture.detectChanges();
        spyOn(component, 'handleCardClick');
        const card = fixture.debugElement.nativeElement.querySelector('[data-testid="photo-card-2"]');
        card.click();
        tick();
        expect(component.handleCardClick).toHaveBeenCalled();
    }));

    it('should have favorite icon if isFavoriteIconVisible is set to true', () => {
        el.setInput('isFavoriteIconVisible', true);
        el.setInput('photo', mockPhoto);
        fixture.detectChanges();
        const favoriteIcon = fixture.debugElement.query(By.css('[data-testid="photo-card-favorite-icon"]'));
        expect(favoriteIcon).not.toBeNull();
    });

    it('should not have favorite icon if isFavoriteIconVisible is set to false', () => {
        el.setInput('isFavoriteIconVisible', false);
        el.setInput('photo', mockPhoto);
        fixture.detectChanges();
        const favoriteIcon = fixture.debugElement.query(By.css('[data-testid="photo-card-favorite-icon"]'));
        expect(favoriteIcon).toBeNull();
    });
});