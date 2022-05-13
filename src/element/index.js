// 导入自己需要的组件
import {
  Button,
  Header,
  Container,
  Main,
  Row,
  Col,
  Tabs,
  TabPane,
  MenuItem,
  Submenu,
  Menu,
  Aside,
  Carousel,
  CarouselItem,
  Dialog,
  Form,
  FormItem,
  Select,
  Option,
  Input,
  Upload,
  MessageBox,
  Message,
  Card,
  Image,
  DatePicker,
  Table,
  TableColumn,
  Pagination,
  Progress,
} from "element-ui";
const element = {
  install: function (Vue) {
    Vue.use(Progress);
    Vue.use(TableColumn);
    Vue.use(Pagination);
    Vue.use(Table);
    Vue.use(DatePicker);
    Vue.use(Message);
    Vue.use(Image);
    Vue.use(Card);
    Vue.use(Button);
    Vue.use(Header);
    Vue.use(Container);
    Vue.use(Main);
    Vue.use(Row);
    Vue.use(Col);
    Vue.use(Tabs);
    Vue.use(TabPane);
    Vue.use(MenuItem);
    Vue.use(Submenu);
    Vue.use(Menu);
    Vue.use(Aside);
    Vue.use(Carousel);
    Vue.use(CarouselItem);
    Vue.use(Dialog);
    Vue.use(Form);
    Vue.use(FormItem);
    Vue.use(Select);
    Vue.use(Option);
    Vue.use(Input);
    Vue.use(Upload);
    Vue.prototype.$confirm = MessageBox.confirm;
  },
};
export default element;
