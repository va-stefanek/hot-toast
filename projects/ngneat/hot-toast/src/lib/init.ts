import { HotToastService } from './hot-toast.service';

export function init(toastService: HotToastService): any {
  return () => {
    toastService.init();
  };
}
