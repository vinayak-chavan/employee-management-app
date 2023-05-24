module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
    'Pocs',
    [
      {
        field: 'Appraisal',
        employeeId: '77cb5282-36a6-4c9e-9c8e-84f9cbec0ce7',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        field: 'Salary',
        employeeId: '8ccf51cb-d271-4ba9-bb2d-a59702052e55',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        field: 'Project Related Issue',
        employeeId: 'b8cdbc59-bfa1-404f-b6d2-f1a7136d485a',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        field: 'Leave Issue',
        employeeId: '77cb5282-36a6-4c9e-9c8e-84f9cbec0ce7',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        field: 'Front Desk',
        employeeId: 'b8cdbc59-bfa1-404f-b6d2-f1a7136d485a',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        field: 'Bonus',
        employeeId: 'b8cdbc59-bfa1-404f-b6d2-f1a7136d485a',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        field: 'Salary Slip',
        employeeId: '8ccf51cb-d271-4ba9-bb2d-a59702052e55',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {},
  ),

  down: queryInterface => queryInterface.bulkDelete('Pocs', null, {}),
};
