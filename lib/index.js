'use strict';var _createClass=function(){function c(d,e){for(var g,f=0;f<e.length;f++)g=e[f],g.enumerable=g.enumerable||!1,g.configurable=!0,'value'in g&&(g.writable=!0),Object.defineProperty(d,g.key,g)}return function(d,e,f){return e&&c(d.prototype,e),f&&c(d,f),d}}(),_react=require('react'),_react2=_interopRequireDefault(_react);Object.defineProperty(exports,'__esModule',{value:!0});require('./index.scss');var _searchBox=require('./searchBox'),_searchBox2=_interopRequireDefault(_searchBox),_searchList=require('./searchList'),_searchList2=_interopRequireDefault(_searchList);function _interopRequireDefault(c){return c&&c.__esModule?c:{default:c}}function _asyncToGenerator(c){return function(){var d=c.apply(this,arguments);return new Promise(function(e,f){function g(h,j){try{var k=d[h](j),l=k.value}catch(m){return void f(m)}return k.done?void e(l):Promise.resolve(l).then(function(m){g('next',m)},function(m){g('throw',m)})}return g('next')})}}function _classCallCheck(c,d){if(!(c instanceof d))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(c,d){if(!c)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return d&&('object'==typeof d||'function'==typeof d)?d:c}function _inherits(c,d){if('function'!=typeof d&&null!==d)throw new TypeError('Super expression must either be null or a function, not '+typeof d);c.prototype=Object.create(d&&d.prototype,{constructor:{value:c,enumerable:!1,writable:!0,configurable:!0}}),d&&(Object.setPrototypeOf?Object.setPrototypeOf(c,d):c.__proto__=d)}var Main=function(c){function d(e){_classCallCheck(this,d);var f=_possibleConstructorReturn(this,(d.__proto__||Object.getPrototypeOf(d)).call(this,e));f.search=function(l){clearTimeout(f.loop),f.loop=setTimeout(function(){if(1>l.length)return void f.setState({searchList:[]});var m=new RegExp('^'+l),n=f.city.filter(function(o){return null!==o.e_cname.match(m)||null!==o.e_name.match(m)||null!==o.name.match(m)});f.setState({searchList:n})},300)},f.chooseItem=function(l){var m=f.props.chooseItem;m(l);var n=localStorage.getItem('xl_city_choose_box_lately');n=n?JSON.parse(n):[];var o=!1;n.forEach(function(p){p.name===l.name&&(o=!0)}),o||(n=[l].concat(n.slice(0,1)),localStorage.setItem('xl_city_choose_box_lately',JSON.stringify(n)))};var _this$props=f.props,g=_this$props.cityList,h=_this$props.hotCity,j=_this$props.currentCity,k=[];return f.city=[],g&&(f.city=Object.values(g).reduce(function(l,m){return l.concat(m)},[]),k=Object.keys(g)),f.state={searchList:[],hotCity:h||[],currentCity:j||null,CITY:g||null,CHAR:k},f}return _inherits(d,c),_createClass(d,[{key:'componentWillMount',value:function(){var f=_asyncToGenerator(regeneratorRuntime.mark(function g(){var h,j,k;return regeneratorRuntime.wrap(function(m){for(;;)switch(m.prev=m.next){case 0:return m.next=2,import('./cityList.js');case 2:h=m.sent,j=h.default,k=Object.keys(j),this.setState({CITY:j,CHAR:k}),this.city=Object.values(j).reduce(function(n,o){return n.concat(o)},[]);case 7:case'end':return m.stop();}},g,this)}));return function e(){return f.apply(this,arguments)}}()},{key:'componentDidMount',value:function componentDidMount(){}},{key:'render',value:function render(){var n=this,e=this.props.placeholder,_state=this.state,f=_state.CITY,g=_state.CHAR,h=_state.searchList,j=_state.currentCity,k=_state.hotCity,l=localStorage.getItem('xl_city_choose_box_lately');l=l?JSON.parse(l):[];var m=[];return g.forEach(function(o){if(f[o]&&0<f[o].length){var p=f[o].map(function(q){return _react2.default.createElement('p',{key:q.c_name,onClick:function onClick(){return n.chooseItem(q)}},q.name)});m.push(_react2.default.createElement('div',{key:o,id:o,className:o+' item-box'},_react2.default.createElement('h5',null,o),_react2.default.createElement('div',null,p)))}}),_react2.default.createElement('div',{className:'xl_city_choose_box'},_react2.default.createElement('div',{className:'over-div'},_react2.default.createElement(_searchBox2.default,{ref:'serachBox',placeholder:e,onChange:this.search})),_react2.default.createElement('div',{className:'xl_city_choose_content-box'},_react2.default.createElement(_searchList2.default,{chooseItem:function chooseItem(o){n.refs.serachBox.searchBlur(!0),n.setState({searchList:[]}),n.chooseItem(o)},showList:h}),_react2.default.createElement(CharList,{goPage:function goPage(o){if(f[o]&&!(1>f[o].length)){var p=document.querySelector('.xl_city_choose_box'),q=document.querySelector('.xl_city_choose_box #'+o).getBoundingClientRect().y;p.scrollTop+=q-50}},list:g}),_react2.default.createElement('div',null,_react2.default.createElement('div',{className:'xl_city_choose_list'},_react2.default.createElement('div',{className:'lately-city-box'},_react2.default.createElement('h5',null,'\u5B9A\u4F4D/\u6700\u8FD1\u8BBF\u95EE'),_react2.default.createElement('div',null,j?_react2.default.createElement('p',{onClick:function onClick(){n.chooseItem(j)},className:'lately-city-item'},_react2.default.createElement('img',{src:require('./dingwei.png'),alt:''}),j.name):'',l.map(function(o){return _react2.default.createElement('p',{onClick:function onClick(p){n.chooseItem(p)}},o.name)}))),_react2.default.createElement('div',{className:'hot-city-box'},_react2.default.createElement('h5',null,'\u70ED\u95E8\u57CE\u5E02'),_react2.default.createElement('div',null,k.map(function(o){return _react2.default.createElement('p',{onClick:function onClick(p){n.chooseItem(p)}},o.name)}))),_react2.default.createElement('div',{className:'list-item'},m)))))}}]),d}(_react2.default.Component);function CharList(c){var d=c.list,e=c.goPage;return _react2.default.createElement('div',{className:'xl_city_choose_char-list'},d.map(function(f){return _react2.default.createElement('p',{className:'hover-bg',onClick:function onClick(){return e(f)}},f)}))}exports.default=Main;