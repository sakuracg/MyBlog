import Vue from 'vue'
import {
    Button, Container, Header, Aside, Footer, Menu, MenuItem,
    Submenu, Main, Row, Col, Input, Avatar, Tooltip, Message,
    Form, FormItem, Loading, Upload, Radio, RadioGroup, RadioButton,
    MessageBox, Select, Option, Backtop
} from 'element-ui'

Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Footer)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Main)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Avatar)
Vue.use(Tooltip)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Loading)
Vue.use(Upload)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Select)
Vue.use(Option)
Vue.use(Backtop)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
