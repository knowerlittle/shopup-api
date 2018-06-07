const app = require('server/app');
const { request, dropDB, table, mock,
  model: {
    Category,
  },
} = require(__root + 'test/utils');

describe('Unit: Category', () => {
  test('has correct required fields', async () => {
    const category = await new Category(mock.category1).save();

    expect(category.name).toEqual('cat1');
    expect(category.description).toEqual('category 1');
    await dropDB(table.CATEGORIES);
  });
});