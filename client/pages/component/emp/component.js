Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'default value',
    },
    
  },
  data: {
    // 这里是一些组件内部数据
    someData: 'someData value',
    A:[{a:1,B:2},'B','C']
  },
  methods: {
    _myPrivateMethod: function () {
      
      // 内部方法建议以下划线开头
      this.replaceDataOnPath(['A', 0, 'B'], new Date().getMilliseconds()) // 这里将 data.A[0].B 设为 'myPrivateData'
      this.applyDataUpdates()
    },
    onMyButtonTap: function () {
      this._myPrivateMethod()
    },
    onTap: function () {
      console.log('start')
      var myEventDetail = {a:"hahah"} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    }
  }

})