declare module 'react-native-tabs-top' {
    import { Component } from 'react'
    import { ViewStyle } from 'react-native'

    interface tabsTopProps {
        /**
         * tab基础数据
         */
        data: Array
        /**
         * 样式
         */
        style?: ViewStyle
        /**
         * 选中的节点序号
         */
        index?: number
        /**
         * 点击的事件
         */
        onChange?: (index: number) => {}
    }
    export default class TabsTop extends Component<tabsTopProps, any> {
    }
}