exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('product')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('product').insert([
        {
          publisher: 'Ardella',
          isbn: 469,
          description: 'Karlee',
          author: 'Anjali',
          series: 'Luciano',
          title: 'quia ut veniam',
          unit_price: 397.33,
          product_tax_code: '81100',
          category_id: 1
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
          category_id: 2
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
          category_id: 1
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
          category_id: 3
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
          category_id: 2
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
          category_id: 1
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
          category_id: 3
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
          category_id: 2
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
          category_id: 3
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
          category_id: 1
        }
      ]);
    });
};
