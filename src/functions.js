import { pbkdf2, randomBytes } from "crypto";
import { promisify } from "util";

// POST request using fetch API
export async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
}

// GET request using fetch API
export async function getData(url=''){
    const response = await fetch(url);
    return response.json();
}

export function checkOcurrence(string,array) {
    return array.filter((e) =>{return e===string}).length
}

export const randomBytesAsync = promisify(randomBytes);
export const pbkdf2Async = promisify(pbkdf2);

export async function encodePassword(string) {
  var salt = (await randomBytesAsync(502)).toString('hex');
  const buffer = (await pbkdf2Async(string, salt.toString('hex'), 100000, 502,  'sha512')).toString('hex')
  const clientBits = (await randomBytesAsync(5)).toString('hex');
  const serverbits = await postData('http://localhost/dnd_api/accessnode/user/bits');
  const newpw = serverbits+buffer+clientBits; 
  return [newpw,salt]
}

export async function verifyUser(username,password) {
  const userlist = await getData('http://localhost/dnd_api/accessnode/user/list');
  const n = checkOcurrence(username,userlist);  
  if (n===1) {
    const salt = (await postData('http://localhost/dnd_api/accessnode/user/salt',{u:username}))[0].salt;
    const buffer = (await pbkdf2Async(password, salt, 100000, 502,  'sha512')).toString('hex');
    const check = (await postData('http://localhost/dnd_api/accessnode/user/get',{u:username,p:buffer}))
    return check==="match"? 0:2
  }
  else {
    return 1 //0=username and password are correct, 1=username does not exist, 2=password is wrong
  }

}

export function parseCookies(cookieString) {
  const cookies=Object.assign({},...cookieString.split(',').map((e) => {const f={}; f[e.split('=')[0]]=e.split('=')[1];return f}));
  return cookies;
}