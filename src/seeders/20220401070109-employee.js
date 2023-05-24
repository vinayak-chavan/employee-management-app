module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
    'Employees',
    [
      {
        id: '77cb5282-36a6-4c9e-9c8e-84f9cbec0ce7',
        firstName: 'john',
        lastName: 'william',
        middleName: 'devid',
        email: 'admin@gmail.com',
        password: 'a92d2accfd67ae4e8da23772dfdfc277', // bdate in ddmmyyyy formate
        gender: 'male',
        role: 'ADMIN',
        DOB: new Date('25 april, 1992'),
        joiningDate: new Date('12 march, 2019'),
        careerStartDate: new Date('12 march, 2019'),
        knownTech: [1, 5, 7],
        avatar: 'https://employee-avatar.s3.amazonaws.com/77cb5282-36a6-4c9e-9c8e-84f9cbec0ce7',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '483f371d-7768-43cd-81c1-ad4ba8b40c52',
        firstName: 'sara',
        lastName: 'william',
        middleName: 'devid',
        email: 'dev@gmail.com',
        password: 'a92d2accfd67ae4e8da23772dfdfc277', // bdate in ddmmyyyy formate
        gender: 'female',
        role: 'DEV',
        DOB: new Date('25 april, 1994'),
        joiningDate: new Date('12 march, 2018'),
        careerStartDate: new Date('01 july, 2016'),
        knownTech: [8, 9, 10],
        avatar: 'https://employee-avatar.s3.amazonaws.com/483f371d-7768-43cd-81c1-ad4ba8b40c52',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '8ccf51cb-d271-4ba9-bb2d-a59702052e55',
        firstName: 'malin',
        lastName: 'serah',
        middleName: 'kevin',
        email: 'hr@gmail.com',
        password: 'a92d2accfd67ae4e8da23772dfdfc277', // bdate in ddmmyyyy formate
        gender: 'male',
        role: 'HR',
        DOB: new Date('20 april, 1998'),
        joiningDate: new Date('12 march, 2020'),
        careerStartDate: new Date('01 july, 2017'),
        knownTech: [12, 3, 19],
        avatar: 'https://employee-avatar.s3.amazonaws.com/8ccf51cb-d271-4ba9-bb2d-a59702052e55',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'b8cdbc59-bfa1-404f-b6d2-f1a7136d485a',
        firstName: 'alex',
        lastName: 'botez',
        middleName: 'philip',
        email: 'pm@gmail.com',
        password: 'a92d2accfd67ae4e8da23772dfdfc277', // bdate in ddmmyyyy formate
        gender: 'female',
        role: 'PM',
        DOB: new Date('20 march, 1988'),
        joiningDate: new Date('12 march, 2015'),
        careerStartDate: new Date('12 march, 2015'),
        knownTech: [15, 2],
        avatar: 'https://employee-avatar.s3.amazonaws.com/b8cdbc59-bfa1-404f-b6d2-f1a7136d485a',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: queryInterface => queryInterface.bulkDelete('Employees', null, {}),
};