import { ToastType } from './hot-toast.model';

export const HOT_TOAST_DEFAULT_TIMEOUTS: {
  [key in ToastType]: number;
} = {
  blank: 3000,
  error: 3000,
  success: 3000,
  loading: 30000,
};
