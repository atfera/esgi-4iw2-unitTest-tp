export class Product {
  constructor(name, owner) {
    this.name = name;
    this.owner = owner;
  }

  isValid() {
    const { name, owner } = this;

    if (name == null) {
      return false;
    }

    if (owner == null || !owner.isValid()) {
      return false;
    }

    return true;
  }
}
