import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-iframe-container',
  templateUrl: './iframe-container.component.html',
  styleUrl: './iframe-container.component.css'
})
export class IframeContainerComponent {
  @Input() url: string | null = null;
  safeUrl: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['url'] && changes['url'].currentValue) {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(changes['url'].currentValue);
    }
  }
}
