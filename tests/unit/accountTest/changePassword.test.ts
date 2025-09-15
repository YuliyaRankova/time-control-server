import {EmployeeModel} from "../../../src/model/EmployeeMongooseModel.js";
import {accountService} from "../../../src/services/accountingService/accountServiceImplMongo.js";
import bcrypt from "bcryptjs";

jest.mock("../../../src/model/EmployeeMongooseModel.js");
jest.mock("bcryptjs");

describe('AccountServiceMongoImpl.changePassword', () => {
    const service = accountService;
    const mockChangedPasswEmployee = {
        _id: "123",
        firstName: "MockEmp",
        hash: "MockHash",
        lastName: "MOCK",
        roles: "crew",
        table_num: "tab_num"
    };

    test('Failed test: updating failed', async () => {
        (bcrypt.hashSync as jest.Mock).mockReturnValue("MockHash");
        (EmployeeModel.findByIdAndUpdate as jest.Mock).mockReturnValue({
            exec: jest.fn().mockResolvedValue(null)
        });
        await expect(service.changePassword("1234", "987")).rejects.toThrow("Employee updating failed!");
    });

    test('Passed test', async () => {
        (bcrypt.hashSync as jest.Mock).mockReturnValue("MockHash");
        (EmployeeModel.findByIdAndUpdate as jest.Mock).mockReturnValue({
            exec: jest.fn().mockResolvedValue(mockChangedPasswEmployee)
        });
        await expect(service.changePassword("123", "12345")).resolves.not.toThrow();
        expect(bcrypt.hashSync).toHaveBeenCalledWith("12345", 10);
        expect(EmployeeModel.findByIdAndUpdate).toHaveBeenCalledWith(
            {_id: "123"},
            {$set: {hash: "MockHash"}},
            {new: true}
        );
    });
});