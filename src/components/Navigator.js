import { StackNavigator } from 'react-navigation';
import Home from '../containers/Home';
import Article from '../containers/Article';
import Info from '../containers/Info';

export default StackNavigator({
    Main: { screen: Home },
    Article: { screen: Article },
    Info: { screen: Info },
});
