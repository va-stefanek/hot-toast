import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { HotToastService } from './hot-toast.service';

describe('HotToastService', () => {
  let spectator: SpectatorService<HotToastService>;
  const createService = createServiceFactory(HotToastService);

  beforeEach(() => (spectator = createService()));

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});
