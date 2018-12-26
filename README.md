# react-native-tabs

![](http://resource.guofangchao.com/github/rn-tabs-top.gif)

#### 项目介绍
tab标签的头部组件.点击触发跳转事件并将触发的tab移动到app中间位置.

内部使用渲染优化,没有变化的时候不再重复刷新渲染结果.

![](http://resource.guofangchao.com/tab-yanshi.gif)
#### 安装教程

1. 安装tabs组件.`npm i --save react-native-tabs-top`
2. 引用组件.
3. 添加需要的props

#### 使用说明

申明tab组件用到的key和显示用的名称
``` javascript
this.setState({tablist:[{id:1,name:"tab1"}]})
```

在合适的地方写好组件和他们的触发事件
``` javascript
<TabBar ref={e => this.tabs = e}
    index={this.state.index}
    data={this.state.tablist}
    onChange={index => {}} />
```

#### tab切换内容

简单的切换可以使用View的显示隐藏来切换,这里的显示内容可以做一个缓存,无需每次都创建.
``` javascript
    {index===0 && <View></View>}
    {index===1 && <View></View>}
```

配合组件来切换,之类使用的是`react-native-scrollable-tab-view`组件.
``` javascript
   <TabView page={this.state.activeTab}
        initialPage={0} 
        onChangeTab={(i) => this.ChangeTab(i)}>
        {this.state.tabs.map((item, index) => <View />)}
    </TabView>
```