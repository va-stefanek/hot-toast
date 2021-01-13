import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CodeHighlightService } from 'src/app/core/services/code-highlight.service';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
})
export class CodeComponent implements OnInit, OnChanges {
  @Input() language = 'typescript';
  @Input() containerClass: string;
  @Input() snippet: string;

  @ViewChild('code') codeTemplateRef: ElementRef<HTMLElement>;

  constructor(private codeHighlightService: CodeHighlightService) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.codeTemplateRef && this.codeTemplateRef.nativeElement) {
      setTimeout(() => {
        this.codeHighlightService.highlightElement(this.codeTemplateRef.nativeElement);
      });
    }
  }
}
