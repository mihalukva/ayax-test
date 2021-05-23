import moment from "moment";
import Manager from "../services/Manager";
import Department from "../services/department";
import { getRandomIntInclusive } from "../services/lib";

function generateDepartmentList() {
  const departmentList: any = {};
  for (let index = 0; index < 5; index++) {
    const department = new Department(
      "Dep_" + index,
      moment
        .utc()
        .subtract(index * 1000 * 60 * 60 * 24)
        .toDate()
    ).get();
    departmentList[department.id] = department;
  }
  return departmentList;
}

function generateDb() {
  const departments = generateDepartmentList();
  const managerList: any = {};
  for (let index = 0; index < 15; index++) {
    const random = getRandomIntInclusive(0, 4);
    const depArr = Object.entries(departments);
    const dep: any = depArr[random][1];
    const manager = new Manager(
      "Ivan_" + index,
      "Inanov_" + index,
      dep.id,
      moment
        .utc()
        .subtract(index * 1000 * 60 * 60 * 24)
        .toDate()
    ).get();
    managerList[manager.id] = manager;
  }
  return {
    manager: managerList,
    departments: departments,
  };
}

const db = generateDb();
console.log(db);

export default db;
