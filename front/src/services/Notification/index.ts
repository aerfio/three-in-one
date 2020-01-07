import { toast } from 'react-toastify';
import { Service } from "../types";

export class NotificationService extends Service {
  success(message: string) {
    toast.success(message, { position: toast.POSITION.BOTTOM_RIGHT })
  }

  error(message: string) {
    toast.error(message, { position: toast.POSITION.BOTTOM_RIGHT })
  }

  warning(message: string) {
    toast.warn(message, { position: toast.POSITION.BOTTOM_RIGHT })
  }
}