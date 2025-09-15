import {accountService} from "../../../src/services/accountingService/accountServiceImplMongo.js";
import {EmployeeModel} from "../../../src/model/EmployeeMongooseModel.js";
import {Employee} from "../../../src/model/Employee.js";
import {checkFiredEmployees} from "../../../src/utils/tools.js";

jest.mock("../../../src/model/EmployeeMongooseModel.js");
jest.mock("../../../src/utils/tools.js");

describe('AccountServiceMongoImpl.hireEmployee', () => {
    const service = accountService;
    const mockEmployee = {
        _id: "123",
        firstName: "MockEmp",
        hash: "456789",
        lastName: "MOCK",
        roles: "crew",
        table_num: "tab_num"
    };
    //=============== 1st scenario: employee already exists ==================
    test('Failed test: Employee already exists', () => {
        (EmployeeModel.findById as jest.Mock).mockReturnValue({
            exec: jest.fn().mockResolvedValue(mockEmployee)
        });
        expect(service.hireEmployee(mockEmployee as Employee)).rejects.toThrow(`Employee with id ${mockEmployee._id} already exists`);
        expect(EmployeeModel.findById).toHaveBeenCalledWith(mockEmployee._id);
    });

    test('Failed test: Employee was fired earlier', async () => {
        (EmployeeModel.findById as jest.Mock).mockReturnValue({
            exec: jest.fn().mockResolvedValue(null)
        });
        (checkFiredEmployees as jest.Mock).mockRejectedValue(new Error("mock Error"));
        await expect(service.hireEmployee(mockEmployee as Employee)).rejects.toThrow("mock Error");
        expect(EmployeeModel.findById).toHaveBeenCalledWith(mockEmployee._id);
        expect(checkFiredEmployees).toHaveBeenCalledWith(mockEmployee._id);
    });

    test('Passed test', async () => {
        (EmployeeModel.findById as jest.Mock).mockReturnValue({
            exec: jest.fn().mockResolvedValue(null)
        });
        (checkFiredEmployees as jest.Mock).mockResolvedValue(undefined);
        (EmployeeModel as unknown as jest.Mock).mockImplementation(() => {
            save: jest.fn().mockResolvedValue(mockEmployee)
        });

        const result = await service.hireEmployee(mockEmployee as Employee);
        expect(EmployeeModel.findById).toHaveBeenCalledWith(mockEmployee._id);
        expect(checkFiredEmployees).toHaveBeenCalledWith(mockEmployee._id);
        expect(result).toEqual(mockEmployee);
    });
});