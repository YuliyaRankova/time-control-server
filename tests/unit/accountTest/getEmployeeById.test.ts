import {accountService} from "../../../src/services/accountingService/accountServiceImplMongo.js";
import {EmployeeModel} from "../../../src/model/EmployeeMongooseModel.js";

jest.mock("../../../src/model/EmployeeMongooseModel.js")

describe('AccountServiceMongoImpl.getEmployeeById', () => {
    const service = accountService;

     test('Failed test: employee not found', async () => {
         (EmployeeModel.findById as jest.Mock).mockReturnValue({
             exec: jest.fn().mockResolvedValue(null)
         });
         await expect(service.getEmployeeById("UNKNOWN")).rejects.toThrow(`Employee with id UNKNOWN not found`);
     });

     test('Passed test', async () => {
         const mockEmployee = {
             _id: "123",
             firstName: "MockEmp",
             hash: "456789",
             lastName: "MOCK",
             roles: "crew",
             table_num: "tab_num"
         };
         (EmployeeModel.findById as jest.Mock).mockReturnValue({
             exec: jest.fn().mockResolvedValue(mockEmployee)
         });
         await expect(service.getEmployeeById("123")).resolves.toEqual(mockEmployee);
         expect(EmployeeModel.findById).toHaveBeenCalledWith("123");
     });
 });