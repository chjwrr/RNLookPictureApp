const { isString } = require('./dataType');
import {
    AsyncStorage
} from 'react-native'
let lt = AsyncStorage;
const storage = {
  save (key, value) {
    if (!isString(key) || !value) {
      throw new Error(415)
    }
    console.log('save:', value)
    lt.setItem(key, JSON.stringify(value))
  },
    async fetch (key) {
    if (!isString(key)) {
      throw new Error(415)
    }
    try{
        const  abc = await lt.getItem(key);
        return JSON.parse(abc) || null
    } catch (error){
        throw new Error(415)
    }
  },
  remove (key) {
    if (!isString(key)) {
      throw new Error(415)
    }
    lt.removeItem(key)
  },
  clear () {
    lt.clear()
  }
}
module.exports = storage
