//默认暴露,对象,其中get 方法读取浏览器本地存储数据,
//其中set 方法,将数据写入浏览器本地,
export default{
  //属性名,和默认值
  get(key,defaultValue){
    let result = localStorage.getItem(key)
    result = JSON.parse(result)
    return (result ? result : defaultValue)
  },
  set(key,val){
    //写入的数据是JSON串,对象的字符串形式
    let result = JSON.stringify(val)
    localStorage.setItem(key,result)
  }
}