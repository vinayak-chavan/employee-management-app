module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
    'EmployeeAcademics',
    [
      {
        employeeId: '77cb5282-36a6-4c9e-9c8e-84f9cbec0ce7',
        highestQualification: 'BE',
        collage: 'VGEC',
        university: 'GTU',
        knownTech: ['Android', 'iOS', 'JavaScript'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        employeeId: '483f371d-7768-43cd-81c1-ad4ba8b40c52',
        highestQualification: 'BCA',
        collage: 'VNSGU',
        university: 'VNSGU',
        knownTech: ['HTML', 'XML', 'JavaScript', 'MongoDB'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        employeeId: '8ccf51cb-d271-4ba9-bb2d-a59702052e55',
        highestQualification: 'ME',
        collage: 'PT',
        university: 'VNSGU',
        knownTech: ['UI/UX', 'python', 'XML', 'HTML'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        employeeId: 'b8cdbc59-bfa1-404f-b6d2-f1a7136d485a',
        highestQualification: 'B. Tech.',
        collage: 'nirma',
        university: 'nirma',
        knownTech: ['Java', 'PHP', 'MongoDB', 'Perl'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {},
  ),

  down: queryInterface => queryInterface.bulkDelete('EmployeeAcademics', null, {}),
};
