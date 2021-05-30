/*const md5 = require('crypto').createHash('md5');
let key = '21';
// timestamp of the expiration time in future
let exp = (Date.now() / 1000 | 0) + 246060;
let streamId = '/live/1';
console.log(exp+'-'+md5.update(streamId+'-'+exp+'-'+key).digest('hex'));
