const host = process.env.HOST || 'localhost:5000';
const schemes = process.env.NODE_ENV === 'production' ? ['https'] : ['http'];
module.exports = {
  preSpec: {
    host: host,
    schemes: schemes,
    tags: [
      { name: 'Server', description: 'Server base path' },
      { name: 'User', description: 'User Resource Operations' },
      { name: 'Product', description: 'Product Resource Operations' },
      { name: 'Admin', description: 'Admin Resource Operations' },
    ],
    paths: {
      '/': {
        get: { tags: ['Server'], summary: 'sanitation check' },
      },
      '/api/user': {
        get: { tags: ['User'] },
      },
      '/api/user/login': {
        post: { tags: ['User'] },
      },
      '/api/user/logout': {
        get: { tags: ['User'] },
      },
      '/api/user/register': {
        post: { tags: ['User'] },
      },
      '/api/user/{id}': {
        get: { tags: ['User'] },
      },
      '/api/user/{id}/cart': {
        get: { tags: ['User'] },
        post: { tags: ['User'] },
      },
      '/api/user/{id}/cart/{product_id}': {
        get: { tags: ['User'] },
        put: { tags: ['User'] },
        delete: { tags: ['User'] },
      },
      '/api/user/{id}/wishlist': {
        get: { tags: ['User'] },
        post: { tags: ['User'] },
      },
      '/api/user/{id}/wishlist/{product_id}': {
        get: { tags: ['User'] },
      },
      '/api/user/{id}/paymentoption/': {
        get: { tags: ['User'] },
        post: { tags: ['User'] },
      },
      '/api/user/{id}/paymentoption/{paymentoption_id}': {
        get: { tags: ['User'] },
        put: { tags: ['User'] },
        delete: { tags: ['User'] },
      },
      '/api/user/{id}/purchase/': {
        get: { tags: ['User'] },
        post: { tags: ['User'] },
      },
      '/api/user/{id}/purchase/{purchase_id}': {
        get: { tags: ['User'] },
      },
      '/api/product': {
        get: { tags: ['Product'] },
      },
      '/api/product/{id}': {
        get: { tags: ['Product'] },
      },
      '/api/product/coupon': {
        get: { tags: ['Product'] },
        post: { tags: ['Product'] },
      },
      '/api/product/coupon/{coupon_id}': {
        get: { tags: ['Product'] },
        delete: { tags: ['Product'] },
      },
      '/api/product/coupon/{code}': {
        get: { tags: ['Product'] },
      },
      '/api/product/{product_id}/coupon': {
        get: { tags: ['Product'] },
      },
      '/api/product/{product_id}/review/': {
        get: { tags: ['Product'] },
        post: { tags: ['Product'] },
      },
      '/api/product/{product_id}/review/{review_id}': {
        get: { tags: ['Product'] },
        delete: { tags: ['Product'] },
      },
      '/api/product/{product_id}/review/{review_id}/comment': {
        get: { tags: ['Product'] },
        post: { tags: ['Product'] },
      },
      '/api/product/{product_id}/review/{review_id}/comment/{comment_id}': {
        delete: { tags: ['Product'] },
      },
      '/api/product/{product_id}/review/{review_id}/helpful': {
        post: { tags: ['Product'] },
      },
      '/api/admin/clients': {
        get: { tags: ['Admin'] },
      },
      '/api/admin/purchases': {
        get: { tags: ['Admin'] },
      },
      '/api/admin/purchases/{id}': {
        get: { tags: ['Admin'] },
        put: { tags: ['Admin'] },
      },
      '/api/admin/total-purchases': {
        get: { tags: ['Admin'] },
      },
      '/api/admin/sales': {
        get: { tags: ['Admin'] },
      },
      '/api/admin/products': {
        get: { tags: ['Admin'] },
        post: { tags: ['Admin'] },
      },
      '/api/admin/products/{product_id}': {
        get: { tags: ['Admin'] },
        put: { tags: ['Admin'] },
        delete: { tags: ['Admin'] },
      },
      '/api/admin/products/{product_id}/reviews': {
        get: { tags: ['Admin'] },
      },
      '/api/admin/products/{product_id}/reviews/{review_id}': {
        get: { tags: ['Admin'] },
      },
      '/api/admin/products/{product_id}/reviews/{review_id}/comments': {
        get: { tags: ['Admin'] },
      },
      '/api/admin/products/{product_id}/reviews/{review_id}/comments/{comment_id}': {
        get: { tags: ['Admin'] },
      },
      '/api/admin/products/{product_id}/reviews/{review_id}/helpful': {
        get: { tags: ['Admin'] },
      },
    },
    definitions: {
      Role: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          description: {
            type: 'string',
          },
        },
      },
      User: {
        required: ['email', 'password'],
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          first_name: {
            type: 'string',
          },
          last_name: {
            type: 'string',
          },
          email: {
            type: 'string',
            format: 'email',
          },
          password: {
            type: 'string',
            format: 'password',
          },
          date_created: {
            type: 'string',
            format: 'date-time',
          },
          role_id: {
            $ref: '#/definitions/Role',
          },
        },
      },
      Product: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          title: {
            type: 'string',
          },
          unit_price: {
            type: 'number',
            format: 'double',
          },
          is_discontinued: {
            type: 'boolean',
          },
          author: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
          series: {
            type: 'string',
          },
          paperback: {
            type: 'string',
          },
          publisher: {
            type: 'string',
          },
          isbn: {
            type: 'integer',
            format: 'int64',
          },
          weight: {
            type: 'integer',
            format: 'int64',
          },
          dimensions: {
            type: 'string',
          },
          category: {
            $ref: '#/definitions/Category',
          },
        },
      },
      Category: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          description: {
            type: 'string',
          },
        },
      },
      Status: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          description: {
            type: 'string',
          },
        },
      },
      Invoice: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          sub_total: {
            type: 'number',
            format: 'double',
          },
          tax: {
            type: 'number',
            format: 'double',
          },
          shipping: {
            type: 'number',
            format: 'double',
          },
          total: {
            type: 'number',
            format: 'double',
          },
          payment_id: {
            $ref: '#/definitions/Payment_Option',
          },
        },
      },
      Payment_Type: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          title: {
            type: 'string',
          },
        },
      },
      Payment_Option: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          credit_card: {
            type: 'string',
          },
          address_one: {
            type: 'string',
          },
          address_two: {
            type: 'string',
          },
          full_name: {
            type: 'string',
          },
          country: {
            type: 'string',
          },
          postal_code: {
            type: 'string',
          },
          exp_month: {
            type: 'string',
          },
          exp_year: {
            type: 'string',
          },
          security_number: {
            type: 'integer',
          },
          active: {
            type: 'boolean',
          },
          user_id: {
            $ref: '#/definitions/User',
          },
          type_id: {
            $ref: '#/definitions/Payment_Type',
          },
        },
      },
      Purchase: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          date_created: {
            type: 'string',
            format: 'date-time',
          },
          address_one: {
            type: 'string',
          },
          address_two: {
            type: 'string',
          },
          full_name: {
            type: 'string',
          },
          city: {
            type: 'string',
          },
          state: {
            type: 'string',
          },
          zip: {
            type: 'string',
          },
          country: {
            type: 'string',
          },
          phone: {
            type: 'string',
          },
          email: {
            type: 'string',
            format: 'email',
          },
          status_id: {
            $ref: '#/definitions/Status',
          },
          user_id: {
            $ref: '#/definitions/User',
          },
          invoice_id: {
            $ref: '#/definitions/Invoice',
          },
        },
      },
      Purchase_Product: {
        type: 'object',
        properties: {
          purchase_id: {
            $ref: '#/definitions/Purchase',
          },
          product_id: {
            $ref: '#/definitions/Product',
          },
          quantity: {
            type: 'integer',
          },
        },
      },
      Review: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          score: {
            type: 'integer',
          },
          date_created: {
            type: 'string',
            format: 'date-time',
          },
          title: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
          product_id: {
            $ref: '#/definitions/Product',
          },
          user_id: {
            $ref: '#/definitions/User',
          },
        },
      },
      Comment: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          date_created: {
            type: 'string',
            format: 'date-time',
          },
          description: {
            type: 'string',
          },
          user_id: {
            $ref: '#/definitions/User',
          },
          review_id: {
            $ref: '#/definitions/Review',
          },
        },
      },
      Helpful: {
        type: 'object',
        properties: {
          review_id: {
            $ref: '#/definitions/Review',
          },
          user_id: {
            $ref: '#/definitions/User',
          },
        },
      },
      Cart: {
        type: 'object',
        properties: {
          user_id: {
            $ref: '#/definitions/User',
          },
          product_id: {
            $ref: '#/definitions/Product',
          },
          quantity: {
            type: 'integer',
          },
        },
      },
      Wish_List: {
        type: 'object',
        properties: {
          user_id: {
            $ref: '#/definitions/User',
          },
          product_id: {
            $ref: '#/definitions/Product',
          },
          quantity: {
            type: 'integer',
          },
        },
      },
    },
  },
};
