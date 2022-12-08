const membersModel = require("../../models/members");
const httpMocks = require("node-mocks-http");

membersModel.create = jest.fn();
membersModel.findOne = jest.fn();
membersModel.findOneAndUpdate = jest.fn();

beforeEach(() => {
  let req = httpMocks.createRequest();
  let res = httpMocks.createResponse();
  let next = jest.fn();
});

// Create Members
// describe("Members Create");
