import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {getTask} from '../slices/TaskDataSlice';
import {getToggleState} from '../slices/DarkModeSlice';
import ModalComponent from '../components/ModalComponent';
import {removeTask} from '../slices/TaskDataSlice';

const ShowTask = ({title}) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.ShowTask}>
      <BouncyCheckbox
        size={30}
        fillColor="#344fa1"
        textStyle={{fontFamily: 'JosefinSans-Regular'}}
        style={{flex: 0.1}}
      />
      <Text style={{flex: 0.8, color: 'white', fontSize: 18}}>{title}</Text>
      <TouchableOpacity
        onPress={() => {
          dispatch(removeTask(title));
        }}>
        <AntDesign name="delete" color="#A7171A" size={25} />
      </TouchableOpacity>
    </View>
  );
};

const HomeScreen = ({offsetValue, scaleValue, setShowMenu, showMenu}) => {
  const data = useSelector(getTask);
  const darkMode = useSelector(getToggleState);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Animated.View
      style={{
        padding: 20,
        flex: 1,
        backgroundColor: `${darkMode ? '#344fa1' : 'white'}`,
        transform: [{scale: scaleValue}, {translateX: offsetValue}],
        borderRadius: showMenu ? 15 : 0,
      }}>
      <TouchableOpacity
        onPress={() => {
          setShowMenu(!showMenu);
          Animated.timing(scaleValue, {
            toValue: showMenu ? 1 : 0.88,
            duration: 300,
            useNativeDriver: true,
          }).start();

          Animated.timing(offsetValue, {
            toValue: showMenu ? 0 : 280,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }}>
        <View style={styles.header}>
          {showMenu ? (
            <AntDesign
              name="close"
              color={darkMode ? 'white' : '#344fa1'}
              size={25}
            />
          ) : (
            <Feather
              name="menu"
              color={darkMode ? 'white' : '#344fa1'}
              size={25}
            />
          )}
        </View>
      </TouchableOpacity>
      <Text style={darkMode ? styles.heading1 : styles.heading2}>
        What's up, Chetan!
      </Text>
      <Text
        style={darkMode ? styles.smallHeading1 : styles.smallHeading2}
        opacity={1}>
        TODAYS'S TASKS
      </Text>
      <ScrollView>
        {data.map((item, index) => {
          return <ShowTask title={item.title} key={index} />;
        })}
      </ScrollView>
      <TouchableOpacity>
        <AntDesign
          name="pluscircle"
          size={50}
          color={darkMode ? 'white' : '#344fa1'}
          style={styles.floatingPlus}
          onPress={() => {
            setModalVisible(true);
          }}
        />
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <ModalComponent setModalVisible={setModalVisible} />
      </Modal>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
  },
  heading1: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 35,
    paddingVertical: 10,
  },
  heading2: {
    color: '#344fa1',
    fontWeight: 'bold',
    fontSize: 35,
    paddingVertical: 10,
  },
  smallHeading1: {
    color: 'white',
    paddingVertical: 10,
    opacity: 0.8,
  },
  smallHeading2: {
    color: '#344fa1',
    paddingVertical: 10,
    opacity: 0.8,
  },
  ShowTask: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
    color: 'white',
    backgroundColor: '#041955',
    padding: 12,
    alignItems: 'center',
    borderRadius: 10,
    elevation: 6,
  },
  floatingPlus: {
    position: 'absolute',
    right: 10,
    bottom: 20,
  },
});

export default HomeScreen;
