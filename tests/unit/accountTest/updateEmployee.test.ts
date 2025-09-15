import {accountService} from "../../../src/services/accountingService/accountServiceImplMongo.js";
import {EmployeeModel} from "../../../src/model/EmployeeMongooseModel.js";

jest.mock("../../../src/model/EmployeeMongooseModel.js");

describe('AccountServiceMongoImpl.updateEmployee', () => {
    const service = accountService;
    const mockUpdatedEmployee = {
        _id: "123",
        firstName: "MockUpdated",
        hash: "456789",
        lastName: "MOCKUpdated",
        roles: "crew",
        table_num: "tab_num"
    };
    const mockNewData ={
        firstName: "MockUpdated",
        lastName: "MOCKUpdated",
    };

    test('Failed test: Updating failed', async () => {
        (EmployeeModel.findByIdAndUpdate as jest.Mock).mockReturnValue({
            exec: jest.fn().mockResolvedValue(null)
        });
        await expect(service.updateEmployee("1234", mockNewData)).rejects
            .toThrow(`Employee updating failed!`);
    });

    test('Passed test', async () => {
        (EmployeeModel.findByIdAndUpdate as jest.Mock).mockReturnValue({
            exec: jest.fn().mockResolvedValue(mockUpdatedEmployee)
        });
        await expect(service.updateEmployee("123", mockNewData)).resolves.toEqual(mockUpdatedEmployee);
        expect(EmployeeModel.findByIdAndUpdate).toHaveBeenCalledWith(
            {_id: "123"},
            {$set: {firstName: "MockUpdated", lastName: "MOCKUpdated"}},
            {new: true});
    });
});