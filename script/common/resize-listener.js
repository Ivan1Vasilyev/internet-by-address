import { debounce } from '../utils/helpers.js';
import { RESIZE_DURATION } from '../utils/constants.js';

export default class ResizeListener {
  constructor(target, handlers) {
    this._target = target;
    this._handlers = handlers;
  }

  setResizeListeners = () => {
    this._target.addEventListener('resize', debounce(this._resizeHandler, RESIZE_DURATION));
  };

  _resizeHandler = () => {
    const { innerWidth } = this._target;

    this._handlers.forEach((handler) => handler(innerWidth));
  };
}
