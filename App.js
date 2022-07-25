import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  Animated,
  View,
  Switch,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import chetan from './assets/chetan.jpg';
import {Provider} from 'react-redux';
import {store} from './store';
import {useSelector} from 'react-redux';
import {getToggleState} from './slices/DarkModeSlice';
import {useDispatch} from 'react-redux';
import {toggleState} from './slices/DarkModeSlice';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';

let persistor = persistStore(store);
const AppContent = () => {
  const darkModeStatus = useSelector(getToggleState);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const offsetValue = useState(new Animated.Value(0))[0];
  const scaleValue = useState(new Animated.Value(1))[0];
  const closeButtonOffset = useState(new Animated.Value(0))[0];
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#344fa1" />
      <View
        style={{
          justifyContent: 'flex-start',
          padding: 20,
          paddingVertical: 40,
        }}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGNhcnRvb24lMjBhdmF0YXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
          }}
          style={{
            height: 100,
            width: 100,
            borderRadius: 100,
            marginTop: 8,
          }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
            marginTop: 20,
          }}>
          Chetan Gamne
        </Text>

        <TouchableOpacity>
          <Text style={{color: 'white'}}>Profile</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 50,
          }}>
          <Text style={{color: 'white', fontSize: 20}}>Dark Mode</Text>
          <Switch
            trackColor={{false: '#767577', true: '#344fa1'}}
            thumbColor={'white'}
            onValueChange={() => {
              dispatch(toggleState());
            }}
            value={darkModeStatus}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            flexGrow: 1,
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: 18,
            }}>
            Discipline is Hard! But With{'\n'}right tool it is magic!
          </Text>
        </View>
      </View>
      {/* overlay View */}
      <View
        style={{
          flexGrow: 1,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        <HomeScreen
          offsetValue={offsetValue}
          scaleValue={scaleValue}
          closeButtonOffset={closeButtonOffset}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
        />
      </View>
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#041955',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});

export default App;
