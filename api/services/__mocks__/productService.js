const products = [
    {
        id: 1,
        "publisher": "Ardella",
        "isbn": 469,
        "description": "Karlee",
        "author": "Anjali",
        "series": "Luciano",
        "title": "quia ut veniam",
        "unit_price": 397,
        "product_code": "8a9197a27983170a2d4faf09f0a6de1683be",
        category_id: 1,
      },
      {
        id: 2,
        "publisher": "Jonas",
        "isbn": 430,
        "description": "Jimmy",
        "author": "Hillard",
        "series": "Kacey",
        "title": "maiores earum quibusdam",
        "unit_price": 349,
        "product_code": "9ee2d5afe2680f24e8c53dd44b235279784f",
        category_id: 2,
      },
      {
        id: 3,
        "publisher": "Lisette",
        "isbn": 911,
        "description": "Carleton",
        "author": "Genesis",
        "series": "Sydnie",
        "title": "est deleniti sint",
        "unit_price": 360,
        "product_code": "68b49e1e00463e8c9384ac4fe1fa9879f222",
        category_id: 1,
      },
      {
        id: 4,
        "publisher": "Juliana",
        "isbn": 738,
        "description": "Dovie",
        "author": "Marielle",
        "series": "Rhett",
        "title": "ipsum repellendus non",
        "unit_price": 885,
        "product_code": "8abd6874f3363547a7f90be9d0865c60e545",
        category_id: 3,
      },
      {
        id: 5,
        "publisher": "Kay",
        "isbn": 431,
        "description": "Lemuel",
        "author": "Irma",
        "series": "Brannon",
        "title": "enim in expedita",
        "unit_price": 832,
        "product_code": "29131cf328d0593ef29da269dfc0e892fad3",
        category_id: 2,
      },
      {
        id: 6,
        "publisher": "Estelle",
        "isbn": 513,
        "description": "Clotilde",
        "author": "Derick",
        "series": "Derrick",
        "title": "modi vel nostrum",
        "unit_price": 569,
        "product_code": "fb9ca8fb864da9a231d5f7783fedde2ac825",
        category_id: 1,
      },
      {
        id: 7,
        "publisher": "Sylvester",
        "isbn": 490,
        "description": "Tomas",
        "author": "Gust",
        "series": "Isabelle",
        "title": "distinctio quia fugit",
        "unit_price": 928,
        "product_code": "5745129ca82fb7e1e18187678b63a2f32323",
        category_id: 3,
      },
      {
        id: 8,
        "publisher": "Karen",
        "isbn": 937,
        "description": "Ivah",
        "author": "Lew",
        "series": "Irma",
        "title": "voluptatem ut exercitationem",
        "unit_price": 820,
        "product_code": "ee106be8a93b1970c96a463995118d77d02d",
        category_id: 2,
      },
      {
        id: 9,
        "publisher": "Jaclyn",
        "isbn": 634,
        "description": "Cortez",
        "author": "Sallie",
        "series": "Nia",
        "title": "aspernatur sunt ut",
        "unit_price": 191,
        "product_code": "5b945578611fa6ef7df12fb4413a0b495c1c",
        category_id: 3,
      },
      {
        id: 10,
        "publisher": "Raphael",
        "isbn": 859,
        "description": "Kiara",
        "author": "Amari",
        "series": "Mossie",
        "title": "ea atque asperiores",
        "unit_price": 968,
        "product_code": "18c317dac4e3022f7f531547b3502e505cac",
        category_id: 1,
      }
]

const findAllProducts = () => 
    new Promise((resolve, reject) => {
        resolve(products);
    });

const findProductById = (id) => 
    new Promise((resolve, reject) => {
        const product = products.find((product) => product.id === id);

        product ? resolve(product) : reject(product);
    });

module.exports = {
    findAllProducts,
    findProductById
}