import { v4 as uuidv4 } from "uuid";
import { idGenerator } from "./lib";

class Manager {
  private id: number = idGenerator();
  private guid: string = uuidv4();
  constructor(
    private firstName: string,
    private lastName: string,
    private department: number,
    private created: Date
  ) {}
  get() {
    return {
      id: this.id,
      guid: this.guid,
      firstName: this.firstName,
      lastName: this.lastName,
      department: this.department,
      created: this.created,
    };
  }
}
export default Manager;
