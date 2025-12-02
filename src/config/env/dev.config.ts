export default () => ({
  PORT: process.env.PORT,
  db: {
    url: process.env.DB_URL,
  },
  jwt: {
    secret: process.env.jwt_secret,
  },
  email:{
    email:process.env.EMAIL,
    password:process.env.PASSWORD
  }
});
