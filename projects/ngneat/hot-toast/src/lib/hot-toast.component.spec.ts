import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { HotToastComponent } from './hot-toast.component';

describe('HotToastComponent', () => {
  let spectator: Spectator<HotToastComponent>;
  const createComponent = createComponentFactory(HotToastComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
