import {accountService} from "../../../src/services/accountingService/accountServiceImplMongo.js";
import {EmployeeModel, FiredEmployeeModel} from "../../../src/model/EmployeeMongooseModel.js";
import {convertEmployeeToFiredEmployee} from "../../../src/utils/tools.js";

jest.mock("../../../src/model/EmployeeMongooseModel.js");
jest.mock("../../../src/utils/tools.js");

describe('AccountServiceMongoImpl.fireEmployee', () => {
    const service = accountService;
    const mockEmployee = {
        _id: "123",
        firstName: "MockEmp",
        hash: "456789",
        lastName: "MOCK",
        roles: "crew",
        table_num: "tab_num"
    };
    const mockFiredEmployee = {
        firstName: "MockEmp",
        lastName: "MOCK",
        _id: "123",
        table_num:"tab_num",
        fireDate:"now",
    };

    test('Failed test: Employee not exists', () => {
        (EmployeeModel.findByIdAndDelete as jest.Mock).mockReturnValue(null);
        expect(service.fireEmployee("1234")).rejects.toThrow(`Employee with id 1234 not exists`);
        expect(EmployeeModel.findByIdAndDelete).not.toHaveBeenCalledWith("123");
    });

    test('Passed test', async () => {
        (EmployeeModel.findByIdAndDelete as jest.Mock).mockResolvedValue(mockEmployee);
        (convertEmployeeToFiredEmployee as jest.Mock).mockReturnValue(mockFiredEmployee);
        (FiredEmployeeModel as unknown as jest.Mock).mockImplementation(() => ({
            save: jest.fn().mockResolvedValue(mockFiredEmployee)
        }));
        await expect(service.fireEmployee("123")).resolves.toEqual(mockFiredEmployee);
        expect(EmployeeModel.findByIdAndDelete).toHaveBeenCalledWith("123");
        expect(convertEmployeeToFiredEmployee).toHaveBeenCalledWith(mockEmployee);
        expect(FiredEmployeeModel).toHaveBeenCalledWith(mockFiredEmployee);
    });
});