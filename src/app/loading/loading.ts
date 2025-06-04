import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'app-loading',
    templateUrl: './loading.html',
    styleUrls: ['./loading.scss']
})
export class LoadingComponent {
    @Output() initLoading = new EventEmitter<void>();

    ngOnInit(): void {
        // for testing
        console.log('Loading init!!!');
    }

    ngAfterViewInit(): void {
        this.initLoading.emit();
    }

    ngOnDestroy(): void {
        // for testing
        console.log('Loading destroyed');
    }
}