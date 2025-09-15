import {AccountingService} from "./accountService.js";
import {Employee, EmployeeDto, SavedFiredEmployee, UpdateEmployeeDto} from "../../model/Employee.js";
import {EmployeeModel, FiredEmployeeModel} from "../../model/EmployeeMongooseModel.js";
import {HttpError} from "../../errorHandler/HttpError.js";
import {checkFiredEmployees, checkRole, convertEmployeeToFiredEmployee} from "../../utils/tools.js";
import {consoleLogger} from "../../Logger/winston.js";
import bcrypt from "bcryptjs";

export class AccountServiceImplMongo implements AccountingService{

    async hireEmployee(employee: Employee): Promise<Employee> {
        const temp = await EmployeeModel.findById(employee._id).exec();
        if(temp) throw  new HttpError(409, `Employee with id ${employee._id} already exists`);

        await checkFiredEmployees(employee._id)
        const empDoc = new EmployeeModel(employee);
        await empDoc.save();
        return employee;
    };

    async fireEmployee(empId: string): Promise<SavedFiredEmployee> {
        const temp = await EmployeeModel.findByIdAndDelete(empId);
        if (!temp) throw new HttpError(404, `Employee with id ${empId} not exists`);

        const fired:SavedFiredEmployee = convertEmployeeToFiredEmployee(temp as Employee);
        const firedDoc = new FiredEmployeeModel(fired);
        await firedDoc.save();
        return fired;
    };

    async updateEmployee(empId: string, employee: UpdateEmployeeDto): Promise<Employee> {
        const updated = await EmployeeModel.findByIdAndUpdate({_id:empId},
            {$set: {firstName: employee.firstName, lastName: employee.lastName}},
            {new: true}).exec();
        if (!updated) throw new HttpError(404, "Employee updating failed!");
        return updated;
    };

    async changePassword(empId: string, newPassword: string): Promise<void> {
        const updated = await EmployeeModel.findByIdAndUpdate({_id:empId},
            {$set: {hash: bcrypt.hashSync(newPassword, 10)}},
            {new: true}).exec();
        if (!updated) throw new HttpError(404, "Employee updating failed!");
    };

    async getEmployeeById(id: string): Promise<Employee> {
        const employee = await EmployeeModel.findById(id).exec();
        if (!employee) throw new HttpError(404, `Employee with id ${id} not found`);
        return employee;
    };

    async getAllEmployees(): Promise<SavedFiredEmployee[]> {
        const result = await EmployeeModel.find({}).exec();
        if(!result) throw new HttpError(404, `Employees not found`);
        return result as SavedFiredEmployee[];
    };

    async setRole(id: string, newRole: string): Promise<Employee> {
        const updated = await EmployeeModel.findByIdAndUpdate({_id: id}, {
            $set: {roles: newRole}},
            {new: true})
            .exec();
        consoleLogger.info(`updated: ${updated}`)
        if (!updated) throw new HttpError(404, "Employee updating failed!");
        return updated as Employee;
    };

    async getEmployeeByTabNum(tabNum: string) {
        const emp = await EmployeeModel.findOne({table_num: tabNum});
        if(!emp) throw new HttpError(404, `Employee with table number: ${tabNum} not found`)
        return emp as Employee;
    };

};

export const accountService = new AccountServiceImplMongo();