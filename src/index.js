import React,{ Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Dimensions
} from 'react-native';

const dimen = Dimensions.get('window');
const deviceWidth = dimen.width;

function px(size) {

    return Math.round(deviceWidth / 750 * size);
}
/**
 * tab组件头部
 * props    data    tab列表
 * props    style   样式
 * props    index   默认选中的序号
 * props    onChange    选中
 */
export default class TabBar extends Component {

    static defaultProps = {
        data: [],
        index: -1,
        onChange: () => { },
    }
    constructor(props) {
        super(props);
        this.state = {
            index: props.index,
        }
        this.scroll = null;
        this.laout_list = []
        this.scrollW = 0;
    }
    render() {
        return <View style={[tabBarStyle.tab, this.props.style]}>
            <ScrollView ref={e => this.scroll = e}
                horizontal directionalLockEnabled
                showsHorizontalScrollIndicator={false}
                snapToAlignment="center">
                {this.props.data.map((item, index) =>
                    <TouchableOpacity onPress={() => this.setIndex(index)} onLayout={e => this.setLaout(e.nativeEvent.layout, index)} key={item.id} style={tabBarStyle.itemBtn}>
                        <Text style={[tabBarStyle.item, this.state.index === index ? tabBarStyle.active : null]} > {item.name}</Text>
                        <View style={[tabBarStyle.line, this.state.index === index ? tabBarStyle.active2 : null]}></View>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
    }
    scroll = null;
    laout_list = []
    scrollW = 0;

    shouldUpdate = true;
    shouldComponentUpdate() {
        if (!this.shouldUpdate) return false;
        return !(this.shouldUpdate = false);
    }
    componentWillReceiveProps(pp) {
        if (pp.index != this.props.index) {
            this.setState({ index: pp.index })
            setTimeout(() => {
                this.setIndex(pp.index, false);
            }, 200);
        }
    }
    setLaout(layout, index) {
        this.laout_list[index] = layout;
        this.scrollW += layout.width;
    }

    setIndex(index, bl = true) {
        this.setState({ index })
        if (!this.scroll) return;
        let layout = this.laout_list[index];
        let rx = deviceWidth / 2;
        let sx = layout.x - rx + layout.width / 2;
        if (sx < 0) sx = 0;
        sx < this.scrollW - deviceWidth && this.scroll.scrollTo({ x: sx, animated: bl });
        sx >= this.scrollW - deviceWidth && this.scroll.scrollToEnd({ animated: bl });
        this.props.onChange && this.props.onChange(index);
        this.shouldUpdate = true;
    }
}
const tabBarStyle = StyleSheet.create({
    tab: {
        backgroundColor: '#fbfafc',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        borderBottomColor: '#efefef',
        borderBottomWidth: px(1),
        height: 40
    },
    itemBtn: {
        paddingHorizontal: 12,
        paddingTop: 2,
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center"
    },
    item: {
        fontSize: px(28),
        color: "#858385",
    },
    active: {
        color: "#d0648f"
    },
    line: {
        width: 20,
        height: 2,
        backgroundColor: "#fbfafc",
        marginTop: 5,
        marginBottom: 2,
    },
    active2: {
        backgroundColor: "#d0648f"
    },
    sortimg: {
        width: 55,
        height: 40,
    }
});