const request = require('supertest');
const { app } = require('../index');
const { getAllEmployees, getEmployeeById } = require('../employees');
const http = require('http');

jest.mock('../employees', () => ({
  ...jest.requireActual('../employees'),
  getAllEmployees: jest.fn(),
  getEmployeeById: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe('Employee API Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET /employees should return all employees with status 200', async () => {
    const mockEmployees = [
      {
        employeeId: 1,
        name: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        departmentId: 1,
        roleId: 1,
      },
      {
        employeeId: 2,
        name: 'Priya Singh',
        email: 'priya.singh@example.com',
        departmentId: 2,
        roleId: 2,
      },
    ];
    getAllEmployees.mockReturnValue(mockEmployees);

    const response = await request(server).get('/employees');
    expect(response.status).toBe(200);
    expect(response.body.employees).toEqual(mockEmployees);
  });

  it('GET /employees/details/:id should return a specific employee by ID with status 200', async () => {
    const mockEmployee = {
      employeeId: 1,
      name: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      departmentId: 1,
      roleId: 1,
    };
    getEmployeeById.mockReturnValue(mockEmployee);

    const response = await request(server).get('/employees/details/1');
    expect(response.status).toBe(200);
    expect(response.body.employee).toEqual(mockEmployee);
  });

  it('GET /employees should correctly invoke the getAllEmployees function', async () => {
    const mockEmployees = [
      {
        employeeId: 1,
        name: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        departmentId: 1,
        roleId: 1,
      },
    ];
    getAllEmployees.mockReturnValue(mockEmployees);

    const response = await request(server).get('/employees');
    expect(getAllEmployees).toHaveBeenCalled();
    expect(response.body.employees).toEqual(mockEmployees);
  });
});
