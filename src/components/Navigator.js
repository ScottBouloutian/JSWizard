import { StackNavigator } from 'react-navigation';
import Home from '../containers/Home';
import Article from '../containers/Article';

export default StackNavigator({
    Main: { screen: Home },
    Article: { screen: Article },
});