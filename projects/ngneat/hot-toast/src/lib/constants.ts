import { ToastType } from './hot-tast.model';

export const HOT_TOAST_DEFAULT_TIMEOUTS: {
  [key in ToastType]: number;
} = {
  blank: 4000,
  error: 4000,
  success: 2000,
  loading: 30000,
};
