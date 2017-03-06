import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    InteractionManager,
    TouchableOpacity,
    View,
    Text,
    Image
} from 'react-native';
/**
 * https://github.com/lelandrichardson/react-native-parallax-view
 * npm install react-native-parallax-view --save
 * 安装后
 * react-native-parallax-view@2.0.6对react-native-scrollable-mixin@1.0.1有依赖。
 */
import ParallaxView from 'react-native-parallax-view';
import { fetchPostInfo } from '../actions/circle';

class CircleDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        const { navigator } = this.props;
    }

    componentWillMount() {
        InteractionManager.runAfterInteractions(() => {
            this.fetchPostInfo();
        });
    }

    render() {
        const { circle, navigator } = this.props;
        return (
            <View style = {{flex: 1}}>
                <ParallaxView 
                    ref = {component => this._scrollView = component}
                    backgroundSource = {require('../../images/avatar.jpg')}
                    windowHeight = {200}
                    header = {HEADER}
                    scrollableViewStyle = {{backgroundColor: 'white'}}>
                    <View style = {{flex: 1}}>
                        <Text> ... scrollview content</Text>
                        <Text style={styles.loremText}>
                            Lorem ipsum dolor sit amet, magna assum officiis ut duo, audire elaboraret in cum. Praesent periculis nam
                            cu, an dicunt detracto nam. Nec salutandi iracundia ut, mea ea probo detraxit, ferri vituperatoribus est eu.
                            Populo nemore qualisque vis te, at numquam persequeris duo.
                            </Text>
                            <Text style={styles.loremText}>
                            Oportere indoctum scriptorem eos an, ne erant scripta repudiare est, cetero principes vim ea. Unum bonorum
                            volutpat eu mea. Per fugit democritum in, omnis dicam ignota no quo. Quem justo erant sit eu, augue nulla
                            feugiat ut mea, ex accumsan quaestio pro. Eum propriae imperdiet referrentur ne. Deleniti singulis inimicus
                            an vim, ne qui mazim definitiones reprehendunt.
                            </Text>
                            <Text style={styles.loremText}>
                            No soluta aliquip disputando sit. Porro oporteat no vim. Per ad evertitur concludaturque. Ad vim brute
                            mandamus, nostrum maluisset no quo, nostrum ancillae scribentur ea sed. Quem odio consulatu vel an, ludus
                            abhorreant sententiae id ius.
                            </Text>
                            <Text style={styles.loremText}>
                            In mea menandri sapientem, quo gloriatur adolescens voluptatibus ei. Eu detraxit adolescens ius. Usu quando
                            mandamus dissentiet et, persius apeirian dissentias in has. Pri id ignota mnesarchum honestatis, ei sed
                            appareat sententiae consequuntur. Et magna ullamcorper est, mundi nusquam te eam. Graecis vivendum has in,
                            cum appetere appellantur an.
                            </Text>
                            <Text style={styles.loremText}>
                            Assum iisque forensibus an his, est adhuc errem aliquip ad, et ocurreret accommodare pri. Ne usu nostrud
                            minimum, option latine consectetuer quo ut. Sed meis accumsan ea, ne per dolores quaerendum. Cibo aperiam
                            repudiare at vix, putant virtute instructior per in. Alii quas persius et nam.
                            </Text>
                            <Text style={styles.loremText}>
                            Etiam intellegat sea in. Impedit vivendo imperdiet cu sea, usu cu adhuc mucius necessitatibus, cu unum
                            habemus dissentiunt vel. Reque affert vituperatoribus et per. Ut vim inani veniam concludaturque, sonet
                            elaboraret consectetuer ne eos.
                            </Text>
                            <Text style={styles.loremText}>
                            An latine perpetua consetetur usu, novum indoctum vulputate in ius. Ad altera fierent percipitur eam, saepe
                            tation deserunt mei an. Harum primis nam no, ius no habeo dolorum voluptatum. Sonet dissentias dissentiet
                            vel in, te has discere accumsan.
                            </Text>
                            <TouchableOpacity onPress={() => {this._scrollView.scrollTo({x: 0, y: 0, animated: true});}}>
                                <Text style={{color: '#00A7FF'}}>
                                    Scroll to top
                                </Text>
                            </TouchableOpacity>
                    </View>
                </ParallaxView>
            </View>
        );
    }

    /**
     * 获取文章详情
     */
    fetchPostInfo() {
        var { dispatch, rowData } = this.props;
        dispatch(fetchPostInfo(rowData.postId, rowData.tagList[0].tagId));
    }
}

let { width, height } = Dimensions.get('window');
var styles = StyleSheet.create({
    loremText: {
        color: '#353535',
        paddingBottom: 10
    }
});

var HEADER = (
    <Text style = {{fontSize: 16, color: 'black'}}>Header Content</Text>
);

module.exports = CircleDetail;