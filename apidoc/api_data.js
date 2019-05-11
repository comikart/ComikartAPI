define({ "api": [
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
    "groupTitle": "Server",
    "error": {
      "fields": {
        "Error 5XX": [
          {
            "group": "Error 5XX",
            "optional": false,
            "field": "SanitationCheckFailed",
            "description": "<p>Something went wrong with the server.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Server Error",
          "type": "json"
        }
      ]
    }
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
    "filename": "./apidoc/main.js",
    "group": "_home_eric_Documents_work_ComikartAPI_apidoc_main_js",
    "groupTitle": "_home_eric_Documents_work_ComikartAPI_apidoc_main_js",
    "name": ""
  }
] });
