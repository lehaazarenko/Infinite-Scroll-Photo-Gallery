import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { Photo } from "../../models/photos.model";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-photo-card',
    templateUrl: './photo-card.html',
    styleUrls: ['./photo-card.scss'],
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoCardComponent {
    @Input() photo!: Photo;
    @Input() isFavoriteIconVisible = true;
    @Output() clickTrigger = new EventEmitter<number>;

    handleCardClick(): void {
        this.clickTrigger.emit(this.photo.id);
    }
}