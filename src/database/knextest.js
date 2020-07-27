const { default: connection } = require("./connection");
const { Connection } = require("pg");

import knex from './connection';

async function test() {
    try {
        const res = await knex('user').where('name','lynbaez');

        console.log(res.length);
    } catch(error) {
        console.log(error);
    }
    
}
test().then(()=>{
    console.log("oi");
}).catch(()=>{
    console.log(error);
})
