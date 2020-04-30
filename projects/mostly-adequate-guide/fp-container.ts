import { compose } from './fp-primitives'

class Container {
  constructor(private __value) {
  }

  static of(value) {
    return new this(value)
  }

  map(f) {
    return Container.of(f(this.__value))
  }
}

class Maybe {
  constructor(private __value) {
  }

  static of(value) {
    return new this(value)
  }

  isPresented() {
    return this.__value != null
  }

  map(f) {
    return this.isPresented() ? Maybe.of(f(this.__value)) : Maybe.of(null);
  };

  join() {
    return this.isPresented() ? this.__value : Maybe.of(null)
  }
}

class IO {
  constructor(public unsafePerformIO) {
  }

  static of(f) {
    return new this((() => f))
  }

  map(f) {
    return new IO(compose(f, this.unsafePerformIO));
  };

  join() {
    return this.unsafePerformIO()
  }
}

export {
  Container,
  IO,
  Maybe
}

