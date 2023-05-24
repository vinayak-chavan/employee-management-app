module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
    'EmployeeTeches',
    [
      {
        techId: 1,
        employeeId: '77cb5282-36a6-4c9e-9c8e-84f9cbec0ce7',
      },
      {
        techId: 5,
        employeeId: '77cb5282-36a6-4c9e-9c8e-84f9cbec0ce7',
      },
      {
        techId: 7,
        employeeId: '77cb5282-36a6-4c9e-9c8e-84f9cbec0ce7',
      },
      {
        techId: 8,
        employeeId: '483f371d-7768-43cd-81c1-ad4ba8b40c52',
      },
      {
        techId: 9,
        employeeId: '483f371d-7768-43cd-81c1-ad4ba8b40c52',
      },
      {
        techId: 10,
        employeeId: '483f371d-7768-43cd-81c1-ad4ba8b40c52',
      },
      {
        techId: 12,
        employeeId: '8ccf51cb-d271-4ba9-bb2d-a59702052e55',
      },
      {
        techId: 3,
        employeeId: '8ccf51cb-d271-4ba9-bb2d-a59702052e55',
      },
      {
        techId: 19,
        employeeId: '8ccf51cb-d271-4ba9-bb2d-a59702052e55',
      },
      {
        techId: 15,
        employeeId: 'b8cdbc59-bfa1-404f-b6d2-f1a7136d485a',
      },
      {
        techId: 2,
        employeeId: 'b8cdbc59-bfa1-404f-b6d2-f1a7136d485a',
      },
    ], {},
  ),

  down: queryInterface => queryInterface.bulkDelete('EmployeeTeches', null, {}),
};
