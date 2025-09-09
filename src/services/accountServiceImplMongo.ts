import {AccountingService} from "./accountService.js";
import {Employee, EmployeeDto, FiredEmployee, SavedFiredEmployee} from "../model/Employee.js";
import {EmployeeModel, FiredEmployeeModel} from "../model/EmployeeMongooseModel.js";
import {HttpError} from "../errorHandler/HttpError.js";
import {checkRole} from "../utils/tools.js";

export class AccountServiceImplMongo implements AccountingService{

    async hireEmployee(employee: Employee): Promise<Employee> {
        const empl = await EmployeeModel.findById(employee._id).exec();
        if (empl) throw new HttpError(409, `Employee with id ${empl._id} already exists`);

        // await checkFiredEmployees(employee._id);
        const employeeDoc = new EmployeeModel(employee);
        await employeeDoc.save();
        return employee;
    };

    async fireEmployee(empId: string): Promise<SavedFiredEmployee> {
        const empl = await EmployeeModel.findById(empId);
        if(!empl) throw new HttpError(404, "Employee not found");

        const firedHistory = await FiredEmployeeModel.find({ _id: empId }).exec();
        const alreadyFired = firedHistory.find(
            f => f.firedDate >= empl.hiredDate);

        if(alreadyFired) throw new HttpError(409, "Employee already fired");

        const firedEmployee:FiredEmployee = new FiredEmployeeModel({
            _id:empl._id,
            status:"fired",
            firedDate:new Date(),
            hiredDate:empl.hiredDate,
            role:empl.role
        });

        await FiredEmployeeModel.create(firedEmployee);
        await empl.deleteOne();
        return firedEmployee;
    };

    updateEmployee(empId: string, employee: EmployeeDto): Promise<Employee> {
        throw "";
    };

    changePassword(empId: string, newPassword: string): Promise<void> {
        return Promise.resolve(undefined);
    };

    async getEmployeeById(id: string): Promise<Employee> {
        const employee = await EmployeeModel.findById(id).lean();
        if(!employee) throw new HttpError(404, "Employee not found");
        return employee;
    };

    async getAllEmployees(): Promise<SavedFiredEmployee[]> {
        const employees = await EmployeeModel.find().exec();
        const firedEmpl = await FiredEmployeeModel.find().exec();

        const activeEmployees:Employee[] = employees.map(empl => ({
            _id:empl._id,
            table_num: empl.table_num,
            hash:empl.hash,
            firstName:empl.firstName,
            lastName:empl.lastName,
            hiredDate:empl.hiredDate,
            role:empl.role
        }));

        const firedEmployees:FiredEmployee[] = firedEmpl.map(empl => ({
            _id:empl._id,
            status:"fired",
            firedDate:empl.firedDate,
            hiredDate:empl.hiredDate,
            role:empl.role
        }));

        return [...activeEmployees, ...firedEmployees];
    };

    async setRole(id: string, newRole: string): Promise<Employee> {
        const employee = await this.getEmployeeById(id);
        const updated = await EmployeeModel.findOneAndUpdate(
            {_id:employee._id},
            {$set: {role: newRole}},
            {new: true}
        ).lean().exec();
        if (!updated) throw new HttpError(404, "Employee updating failed!");
        return updated as Employee;
    };

};

export const accountService = new AccountServiceImplMongo();