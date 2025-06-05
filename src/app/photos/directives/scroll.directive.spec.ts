import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { PhotosComponent } from "../photos";
import { DebugElement } from "@angular/core";
import { InfiniteScrollDirective } from "./scroll.directive";
import { PhotosService } from "../services/photos.service";

describe('InfiniteScrollDirective', () => {
    let fixture: ComponentFixture<PhotosComponent>;
    let component: PhotosComponent;
    let el: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PhotosComponent],
            providers: [PhotosService]
        }).compileComponents();

        fixture = TestBed.createComponent(PhotosComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        fixture.detectChanges();
    }));

    it('should create directive', () => {
        let mockEl = {
            nativeElement: document.createElement('div')
        };
        const directive = new InfiniteScrollDirective(mockEl);
        expect(directive).toBeTruthy();
    });

    it('should not emit event if dataLoaded is false', () => {
        let mockEl = {
            nativeElement: document.createElement('div')
        };
        const directive = new InfiniteScrollDirective(mockEl);
        spyOn(directive.reachedEnd, 'emit');
        directive.dataLoaded = false;
        directive.ngOnChanges(
            {
                dataLoaded: {
                    currentValue: false,
                    previousValue: true,
                    firstChange: false,
                    isFirstChange: () => false
                }
            }
        );
        expect(directive.reachedEnd.emit).not.toHaveBeenCalled();
    });

    it('should emit event if dataLoaded is true', () => {
        let mockEl = {
            nativeElement: document.createElement('div')
        };
        const directive = new InfiniteScrollDirective(mockEl);
        spyOn(directive.reachedEnd, 'emit');
        directive.dataLoaded = false;
        directive['window'] = window;
        directive.ngOnChanges(
            {
                dataLoaded: {
                    currentValue: true,
                    previousValue: false,
                    firstChange: false,
                    isFirstChange: () => false
                }
            }
        );
        expect(directive.reachedEnd.emit).toHaveBeenCalled();
    });
});