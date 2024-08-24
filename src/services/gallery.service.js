import { BehaviorSubject } from "rxjs";

class _GalleryService {
  #$images = new BehaviorSubject([]);

  get $images() {
    return this.#$images.asObservable();
  }

  addImage(i) {
    const images = this.#$images.value;
    images.push(i);
    this.#$images.next(images);
  }
}

const GalleryService = Object.freeze(new _GalleryService());
export default GalleryService;
