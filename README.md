- To install project run `npm install --legacy-peer-deps`
- create `.env` file by copy paste `.env copy` file and rename it to `.env`
- To run project, do `npm run start:dev`
- Login via `localhost:8000/auth/login` and do `POST` method with body

```json
{
  "email": "admin@gmail.com",
  "password": "1234567890"
}
```

- You will get an user with role ADMIN
- Get token on key `accessToken` and attach token in header `Authorization` with value `Bearer tokengoeshere`
- do CRUD on `localhost:8000/book` with correct token.
- other credentials are

```json
[
  {
    "email": "elizabethneumann915@planet.biz",
    "password": "123456"
  },
  {
    "email": "abubakar.clark233@orange.info",
    "password": "123456"
  },
  {
    "email": "keikochanthara258@club-internet.com",
    "password": "123456"
  }
]
```

- You will get an user with role USER
- When do Create, update, delete on `/book` you can see the log in terminal
- To run unit test do `npm run test`
- You can see migrations file on `src/migrations`
- You can also see api docs on `localhost:8000/docs`
