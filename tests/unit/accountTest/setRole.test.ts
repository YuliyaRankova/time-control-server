import {accountService} from "../../../src/services/accountingService/accountServiceImplMongo.js";
import {EmployeeModel} from "../../../src/model/EmployeeMongooseModel.js";
jest.mock("../../../src/model/EmployeeMongooseModel.js");

describe('AccountServiceMongoImpl.setRole', () => {
    const service = accountService;
    const mockEmployee = {
        _id: "123",
        firstName: "MockEmp",
        hash: "456789",
        lastName: "MOCK",
        roles: "newRole",
        table_num: "tab_num"
    };

    test('Failed test: Employee not found', async () => {
        (EmployeeModel.findByIdAndUpdate as jest.Mock).mockReturnValue({
            exec: jest.fn().mockResolvedValue(null)
        });
        await expect(service.setRole("UNKNOWN", "newRole")).rejects
            .toThrow(`Employee updating failed!`);
    });

    test('Passed test', async () => {
        (EmployeeModel.findByIdAndUpdate as jest.Mock).mockReturnValue({
            exec: jest.fn().mockResolvedValue(mockEmployee)
        });
        await expect(service.setRole("123", "newRole")).resolves.toEqual(mockEmployee);
        expect(EmployeeModel.findByIdAndUpdate).toHaveBeenCalledWith(
            {_id: "123"},
            {$set: {roles: "newRole"}},
            {new: true});
    });

});