module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
    'Technologies',
    [
      {
        techName: 'Java',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        techName: 'C++',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        techName: 'C#',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        techName: 'Objective-C',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        techName: 'Perl',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        techName: 'PHP',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        techName: 'RubyonRails',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        techName: 'Android',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        techName: 'iOS',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        techName: 'HTML',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        techName: 'XML',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        techName: 'ReactJs',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        techName: 'ReactNative',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        techName: 'JavaScript',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        techName: 'python',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        techName: 'NodeJs',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        techName: 'MongoDB',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        techName: 'viwJs',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        techName: 'UI/UX',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {},
  ),

  down: queryInterface => queryInterface.bulkDelete('Technologies', null, {}),
};
