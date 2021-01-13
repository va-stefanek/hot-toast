import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmojiButtonComponent } from './emoji-button.component';

describe('EmojiButtonComponent', () => {
  let component: EmojiButtonComponent;
  let fixture: ComponentFixture<EmojiButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmojiButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmojiButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
