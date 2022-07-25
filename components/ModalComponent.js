import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {getToggleState} from '../slices/DarkModeSlice';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {addTask} from '../slices/TaskDataSlice';

const ModalComponent = ({setModalVisible}) => {
  const dispatch = useDispatch();
  const darkMode = useSelector(getToggleState);
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text) {
      console.log(text);
      dispatch(addTask({title: text}));
      setModalVisible(false);
    }
  };

  return (
    <View style={darkMode ? styles.container2 : styles.container1}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          paddingVertical: 20,
          paddingHorizontal: 30,
        }}
        onPress={() => {
          setModalVisible(prevstate => !prevstate);
        }}>
        <View>
          <AntDesign
            name="closecircleo"
            size={35}
            color={darkMode ? 'white' : 'black'}
          />
        </View>
      </TouchableOpacity>
      <View
        style={{
          flex: 0.7,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TextInput
          style={{
            width: '80%',
            fontSize: 30,
            color: `${darkMode ? 'white' : '344fa1'}`,
          }}
          autoFocus={true}
          placeholderTextColor={darkMode ? '#f5f5f5' : '#d3d3d3'}
          numberOfLines={1}
          blurOnSubmit={true}
          onChangeText={setText}
          maxLength={23}
          value={text}
          placeholder="Enter A New Task"
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <Pressable
          onPress={() => {
            handleSubmit();
          }}
          style={{
            flex: 0.2,
            backgroundColor: `${darkMode ? 'white' : '#041955'}`,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            elevation: 14,
            margin: 10,
            borderRadius: 50,
          }}>
          <Text
            style={{
              color: `${darkMode ? '#344fa1' : 'white'}`,
              fontWeight: '600',
            }}>
            ADD TASK
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    backgroundColor: 'white',
    height: '100%',
  },
  container2: {
    backgroundColor: '#344fa1',
    height: '100%',
  },
});

export default ModalComponent;
