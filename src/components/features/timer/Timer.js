import React, { useState } from 'react';
import { Alert, Text, View, StyleSheet,Vibration,Platform } from 'react-native';
import {ProgressBar} from 'react-native-paper';
import {useKeepAwake} from 'expo-keep-awake';

import { fontSizes, spacingSizes } from '../../utils/sizes';
import { colors } from '../../utils/colors';
import { CountDown } from '../../CountDown';
import { Timing } from './Timing';
import { RoundedButton } from '../../RoundedButton';

const DEFAULT_TIME = 0.05;

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {

  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(DEFAULT_TIME);

  const onProgress = (pr) =>{
    setProgress(pr);
  }
  const vibrate = ()=>{
    if(Platform.OS ==='ios') {
      const interval = setInterval(()=> Vibration.vibrate(),1000);
      setTimeout( ()=> clearInterval(interval),10000);
    }else{
      Vibration.vibrate(10000);
    }
  }

  const onEnd = ()=>{
    //Alert.alert("Ended")
    vibrate();
    setIsStarted(false);
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    onTimerEnd();
    
  }

  const changeTime = (mn)=>{
    setMinutes(mn);
    setIsStarted(false);
    setProgress(1);
  }

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <CountDown minutes={minutes} isPaused={!isStarted} onProgress={onProgress} onEnd={onEnd} />
      </View>

      <View style={{ paddingTop: spacingSizes.lg }}>
        <Text style={styles.title}> We are focusing on : </Text>
        <Text style={styles.task}> {focusSubject} </Text>
      </View>
      <View>
        <ProgressBar
          color={colors.veryLightGreen}
          style={{height:spacingSizes.md}}
          progress={progress} />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime}/>
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted ? (
          <RoundedButton
            title="Start"
           
            onPress={() => setIsStarted(true)}
          />
        ) : (
          <RoundedButton
            title="Pause"
             
            onPress={() => setIsStarted(false)}
          />
        )}
      </View>
      <View style={styles.clearButton}>
          <RoundedButton
            title="Stop"
            size={50}
            onPress={() =>clearSubject()}
          />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: 'white',
    textAlign: 'center',
  },
  task: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.25,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems:'center',
    padding: spacingSizes.sm,
  },
  clearButton:{
    margin:fontSizes.md
  }
});
