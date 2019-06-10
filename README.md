# **Comikart API**

[**API Documentation**](https://limitless-beyond-88728.herokuapp.com/api-docs/#/) |
[**Database Diagram**](https://app.sqldbm.com/SQLServer/Share/5H2-0kg10YZwWam3E5O6CkGFrngIE8md_DYjF4jNYw0)

[![CircleCI](https://circleci.com/gh/comikart/ComikartAPI.svg?style=svg)](https://circleci.com/gh/comikart/ComikartAPI)
[![codecov](https://codecov.io/gh/comikart/ComikartAPI/branch/master/graph/badge.svg)](https://codecov.io/gh/comikart/ComikartAPI)

## Requirements

- `.env` file is required for loading up environement variables.
  - `SECRET` - random hash
  - `SALT_ROUNDS` - set the salt rounds for passwords
  - `TAXJAR_API_KEY` - api key for getting tax query

<p style="color: #A13A3A; font-weight: bold;">
  ** must have a postgres database running and connected before running the knex commands! **
</p>

```
npm install
npm knex migrate:latest
npm knex seed:run
```
