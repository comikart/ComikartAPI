const mockDb = require('mock-knex');

const knex = require('../../db/knex');
const service = require('../../api/services/productService');
const development = require('../../knexfile').development;

const tracker = mockDb.getTracker();
const db = knex(development);

beforeAll(() => {
  mockDb.mock(db);
});

beforeEach(() => {
  tracker.install();
});

afterEach(() => {
  tracker.uninstall();
});

afterAll(() => {
  mockDb.unmock(db);
});

describe('Test productService', () => {
  describe('Test findAllProducts', () => {
    it('Should return all products', done => {
      const products = [
        {
          publisher: 'Ardella',
          isbn: 469,
          description: 'Karlee',
          author: 'Anjali',
          series: 'Luciano',
          title: 'quia ut veniam',
          unit_price: 397.33,
          product_tax_code: '81100',
          category_id: 1,
        },
        {
          publisher: 'Jonas',
          isbn: 430,
          description: 'Jimmy',
          author: 'Hillard',
          series: 'Kacey',
          title: 'maiores earum quibusdam',
          unit_price: 349,
          product_tax_code: '81100',
          category_id: 2,
        },
        {
          publisher: 'Lisette',
          isbn: 911,
          description: 'Carleton',
          author: 'Genesis',
          series: 'Sydnie',
          title: 'est deleniti sint',
          unit_price: 360,
          product_tax_code: '81100',
          category_id: 1,
        },
        {
          publisher: 'Juliana',
          isbn: 738,
          description: 'Dovie',
          author: 'Marielle',
          series: 'Rhett',
          title: 'ipsum repellendus non',
          unit_price: 885,
          product_tax_code: '81100',
          category_id: 3,
        },
        {
          publisher: 'Kay',
          isbn: 431,
          description: 'Lemuel',
          author: 'Irma',
          series: 'Brannon',
          title: 'enim in expedita',
          unit_price: 832,
          product_tax_code: '81100',
          category_id: 2,
        },
        {
          publisher: 'Estelle',
          isbn: 513,
          description: 'Clotilde',
          author: 'Derick',
          series: 'Derrick',
          title: 'modi vel nostrum',
          unit_price: 569,
          product_tax_code: '81100',
          category_id: 1,
        },
        {
          publisher: 'Sylvester',
          isbn: 490,
          description: 'Tomas',
          author: 'Gust',
          series: 'Isabelle',
          title: 'distinctio quia fugit',
          unit_price: 928,
          product_tax_code: '81100',
          category_id: 3,
        },
        {
          publisher: 'Karen',
          isbn: 937,
          description: 'Ivah',
          author: 'Lew',
          series: 'Irma',
          title: 'voluptatem ut exercitationem',
          unit_price: 820,
          product_tax_code: '81100',
          category_id: 2,
        },
        {
          publisher: 'Jaclyn',
          isbn: 634,
          description: 'Cortez',
          author: 'Sallie',
          series: 'Nia',
          title: 'aspernatur sunt ut',
          unit_price: 191,
          product_tax_code: '81100',
          category_id: 3,
        },
        {
          publisher: 'Raphael',
          isbn: 859,
          description: 'Kiara',
          author: 'Amari',
          series: 'Mossie',
          title: 'ea atque asperiores',
          unit_price: 968,
          product_tax_code: '81100',
          category_id: 1,
        },
      ];
      const page = 5;
      const count = 20;

      tracker.on('query', query => {
        const regex = /select\s\*\sfrom\s"product"\slimit\s\$1\soffset\s\$2/;
        expect(regex.test(query.sql)).toBe(true);
        expect(query.bindings.length).toBe(2);
        expect(query.method).toBe('select');
        query.response(products);
      });

      return service.findAllProducts(page, count).then(res => {
        expect(res).toEqual(products);
        done();
      });
    });
  });

  
});
