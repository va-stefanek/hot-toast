import { AfterViewInit, Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CodeHighlightService } from 'src/app/core/services/code-highlight.service';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
})
export class CodeComponent implements OnInit, AfterViewInit {
  @Input() language: string;
  @Input() class: string;

  @ViewChild('code') codeTemplateRef: ElementRef<HTMLElement>;

  constructor(private codeHighlightService: CodeHighlightService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.codeHighlightService.highlightElement(this.codeTemplateRef.nativeElement);
  }
}
