define({ "api": [
  {
    "type": "get",
    "url": "/api/product/:id",
    "title": "Request Product By Id",
    "version": "1.0.0",
    "name": "GETProductById",
    "group": "Product",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object[]",
            "optional": false,
            "field": "List",
            "description": "<p>product information array.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n   {\n     \"id\": 1,\n     \"first_name\": \"john\",\n     \"last_name\": \"doe\",\n     \"role_id\": 2\n   }",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "ID",
            "description": "<p>returns a product by id.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>server couldnt process the request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Server Error\n{\n     \"error\": \"server was unable to process the request.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./api/controllers/productController.js",
    "groupTitle": "Product"
  },
  {
    "type": "get",
    "url": "/api/product",
    "title": "Request All Products",
    "version": "1.0.0",
    "name": "GETProducts",
    "group": "Product",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object[]",
            "optional": false,
            "field": "List",
            "description": "<p>product information array.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n [\n   {\n     \"id\": 1,\n     \"first_name\": \"john\",\n     \"last_name\": \"doe\",\n     \"role_id\": 2\n    },\n ]",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "query",
            "optional": false,
            "field": "Category",
            "description": "<p>returns all products in the category</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>server couldnt process the request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Server Error\n{\n     \"error\": \"server was unable to process the request.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./api/controllers/productController.js",
    "groupTitle": "Product"
  },
  {
    "type": "get",
    "url": "/",
    "title": "Request Sanitation Check",
    "version": "1.0.0",
    "name": "GETSanitationCheck",
    "group": "Server",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Status",
            "description": "<p>Connected</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"Connected\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./server.js",
    "groupTitle": "Server"
  },
  {
    "type": "post",
    "url": "/api/user/login",
    "title": "Request Login",
    "version": "1.0.0",
    "name": "POSTLogin",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "User",
            "description": "<p>User profile information</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"first_name\": \"john\",\n  \"last_name\": \"doe\",\n  \"role_id\": 2\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "IncorrectCredentials",
            "description": "<p>email or password is incorrect</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Client Error\n{\n     \"error\"; \"incorrect email or password\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./api/controllers/userController.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/user/register",
    "title": "Request Register",
    "version": "1.0.0",
    "name": "POSTRegister",
    "group": "User",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 CREATED\n{}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "IncorrectCredentials",
            "description": "<p>Email already exists.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Client-Error\n{\n     \"error\"; \"email already exists\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./api/controllers/userController.js",
    "groupTitle": "User"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./docs/main.js",
    "group": "_home_eric_Documents_work_ComikartAPI_docs_main_js",
    "groupTitle": "_home_eric_Documents_work_ComikartAPI_docs_main_js",
    "name": ""
  }
] });
