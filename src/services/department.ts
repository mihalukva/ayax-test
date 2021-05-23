import { idGenerator } from "./lib";

class Department {
  private id: number = idGenerator();
  constructor(private name: string, private created: Date) {}
  get() {
    return {
      id: this.id,
      name: this.name,
      created: this.created,
    };
  }
}
export default Department;
