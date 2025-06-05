import { Directive, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";

@Directive({
    selector: '[infiniteScroll]'
})
export class InfiniteScrollDirective implements OnInit, OnChanges {
    @Output() reachedEnd: EventEmitter<void> = new EventEmitter<void>();
    @Input() threshold = 20;
    @Input() dataLoaded = false;

    private window!: Window;

    constructor(private el: ElementRef) {}

    ngOnInit(): void {
        this.window = window;
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('ngOnChanges changes', changes);
        if (!this.window || !changes['dataLoaded'].currentValue) return;

        const scrollToBottom = this.getScrollToBottom();
        if (scrollToBottom < this.threshold) {
            this.reachedEnd.emit();
        }
    }

    @HostListener('window:scroll', ['$event.target'])
    windowScrollEvent(target: EventTarget | null) {
        if (!this.dataLoaded) return;
        // calculated whether we are near the end
        const scrollToBottom = this.getScrollToBottom();

        // if the user is near end
        if (scrollToBottom < this.threshold) {
            this.reachedEnd.emit();
        }
    }

    private getScrollToBottom(): number {
        const heightOfWholePage = this.window.document.documentElement.scrollHeight;
        // how big in pixels the element is
        const heightOfElement = this.el.nativeElement.scrollHeight;
        // currently scrolled Y position
        const currentScrolledY = this.window.scrollY;
        // height of opened window - shrinks if console is opened
        const innerHeight = this.window.innerHeight;
        // the area between the start of the page and when this element is visible
        // in the parent component
        const spaceOfElementAndPage = heightOfWholePage - heightOfElement;

        return heightOfElement - innerHeight - currentScrolledY + spaceOfElementAndPage;
    }
}