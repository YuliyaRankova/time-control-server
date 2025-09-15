import {EmployeeModel} from "../../../src/model/EmployeeMongooseModel.js";
import {accountService} from "../../../src/services/accountingService/accountServiceImplMongo.js";

jest.mock("../../../src/model/EmployeeMongooseModel.js");

describe('AccountServiceMongoImpl.getAllEmployees', () => {
    const service = accountService;
    const mockEmployee = {
        firstName: "MockEmp",
        lastName: "MOCK",
        _id: "123",
        table_num:"tab_num",
        fireDate:"now",
    };
    const mockSavedFiredEmployees = [mockEmployee];

    test('Failed test: Employees not found', async () => {
        (EmployeeModel.find as jest.Mock).mockReturnValue({
            exec: jest.fn().mockResolvedValue(null)
        });
        await expect(service.getAllEmployees()).rejects.toThrow(`Employees not found`);
    });

    test('Passed test', async () => {
        (EmployeeModel.find as jest.Mock).mockReturnValue({
            exec: jest.fn().mockResolvedValue(mockSavedFiredEmployees)
        });
        const employees = await service.getAllEmployees();
        expect(employees).toHaveLength(1);
        expect(employees[0]).toEqual(mockEmployee);
    });
});