export default {
  get(key,defaultVal){
    //读取缓存中key属性的值,读到的是个json串,转为对象,
    let val = localStorage.getItem(key)
    return val ? JSON.parse(val) : defaultVal 
  },
  set(key,val){
    console.log('1')
    //localStorage中存储的都是JSon串,对象的字符串形式
    val = JSON.stringify(val)
    localStorage.setItem(key,val)
  }
}