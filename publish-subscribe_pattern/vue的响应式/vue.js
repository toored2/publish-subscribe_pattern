
//订阅器模型
let Dep = {
    clientList:{},
    listen: function (key,fn) {
        (this.clientList[key] || (this.clientList[key] = [])).push(fn)
    },
    trigger: function () {   //发布消息

        //取出消息名称 类数组转换数组
        let key = Array.prototype.shift.call(arguments) //得到第一个参数，key
        let fns = this.clientList[key]
        if(!fns || fns.length===0){
            return
        }

        for (var i=0,fn; fn = fns[i++]; ){
            fn.apply(this,arguments) //发布消息附带的参数
        }
    },
}

// 劫持的方法

var dataHijack = function ({data, tag, datakey, selector}) {

    let value = ''
    el = document.querySelector(selector)
    Object.defineProperty(data,datakey,{
        get:function () {
            console.log('我获取到值了')
            return value

        },
        set:function(newValue) {
            console.log('我设置了值')
            value = newValue
            Dep.trigger(tag,newValue)
        }
    })
    //绑定观察者
    Dep.listen(tag,function (text) {
        el.innerHTML = text

    })

}

