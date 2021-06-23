import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Alert } from 'react-native';

import { fontSizes, spacingSizes } from './utils/sizes';
import { colors } from './utils/colors';

const mnToms = (mn) => {
  return mn * 60 * 1000;
};
const formatTime = (time) => (time < 10 ? `0${time}` : time);
export const CountDown = ({ minutes = 1, isPaused,onProgress,onEnd }) => {

  const [ms, setMs] = useState(null);
  const mn = Math.floor(ms / 1000 / 60) % 60;
  const s = Math.floor(ms / 1000) % 60;

  const countDown = () => {
    setMs((time) => {
      if (time === 0) {
        
        clearInterval(interval.current);
        return time;
      }
      const timeLeft = time - 1000;
      //report the progress
      
      return timeLeft;
    });
  };
  const interval = React.useRef(null);

  useEffect(()=>{
    setMs(mnToms(minutes));
  },[minutes])

  useEffect(()=>{
    onProgress(ms/mnToms(minutes));
     if(ms === 0 ){
       onEnd();
    }
  },[ms]);
  useEffect(() => {
    if(isPaused){
      if(interval.current) clearInterval(interval.current);
      return;
    } 
    //const interval = setInterval(countDown, 1000);
    interval.current = setInterval(countDown, 1000);
    //after rendering
    return () => clearInterval(interval.current); //clean up after rendering
    //return () => clearInterval(interval);
  });

  return (
    <Text style={styles.text}>
      {formatTime(mn)} : {formatTime(s)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: fontSizes.xxxl,
    padding: spacingSizes.lg,
    backgroundColor: colors.lightGreen,
    textAlign: 'center',
  },
});
