Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'default value',
      observer: function (newVal, oldVal) {
        console.log(this.data)
        console.log(this.dataset)
        console.log(this.id)
        console.log(this.is)
      }
    },
    
  },
  data: {
    // 这里是一些组件内部数据
    someData: 'someData value',
    A:[{a:1,B:2},'B','C']
  },
  methods: {
    _propertiesChange: function (newVal, oldVal) {
      console.log(oldVal + '变成' + newVal)
    },
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
      this.triggerEvent('myaaaevent', myEventDetail, myEventOption)
      console.log('end')
    }
  },
  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () {
    console.log("进入组件");
    this.setData({
      someData: "new someData",
      innerText: "new defaultData"
    })
   },
  moved: function () { },
  detached: function () { },

})