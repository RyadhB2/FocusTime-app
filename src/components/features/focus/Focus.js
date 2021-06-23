import React, { useState } from 'react';
import {Alert, Text, View, StyleSheet} from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../RoundedButton';
import {fontSizes,spacingSizes} from '../../utils/sizes'

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState(null);
  const show = () => Alert.alert('Pressed');
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>What do you wanna focus on ?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            onSubmitEditing={ ({ nativeEvent }) => {
              setSubject(nativeEvent.text);
            }}
            
          />

          <RoundedButton title="+" size={60} onPress={()=>addSubject(subject)} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
  },

  innerContainer: {
    flex: 1,
    padding: spacingSizes.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: fontSizes.lg,
  },
  inputContainer: {
    paddingTop: spacingSizes.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    marginRight: spacingSizes.md,
  },
});
