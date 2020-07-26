module.exports = {

  development: {
    client:'postgresql',
    connection: {
        host:'localhost',
        user:'teste',
        password:'12345',
        database:'teste',
    },
    migrations:{
        tableName: 'migrations',
        directory:'./src/database/migrations'
    },
  },

  staging: {
    client:'postgresql',
    connection: {
        host:'localhost',
        user:'teste',
        password:'12345',
        database:'teste',
    },
    migrations:{
        tableName: 'Migrations',
        diretory:''
    },
  },
  production: {
    client:'postgresql',
    connection: {
        host:'localhost',
        user:'teste',
        password:'12345',
        database:'teste',
    },
    migrations:{
        tableName: 'Migrations',
        diretory:''
    }
  }
};
