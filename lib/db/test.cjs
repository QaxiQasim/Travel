const { Client } = require('pg');
const client = new Client({ connectionString: 'postgresql://postgres.peqlupbkjtxlarbmhewm:Qasim%40254922@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres' });
client.connect()
  .then(() => client.query('select "price_aed" from "activities" where id=1'))
  .then(res => console.log(res.rows))
  .catch(console.error)
  .finally(() => client.end());
