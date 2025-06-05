import { ComponentFixture, TestBed } from "@angular/core/testing"
import { LoadingComponent } from "./loading";

describe('LoadingComponent', () => {
    let fixture: ComponentFixture<LoadingComponent>;
    let component: LoadingComponent;

    TestBed.configureTestingModule({}).compileComponents();

    it('should create loading component',() => {
        fixture = TestBed.createComponent(LoadingComponent);
        component = fixture.componentInstance;
        expect(component).toBeTruthy();
    })
})