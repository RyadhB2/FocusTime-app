import React, { useState, useEffect } from 'react';
import {
  Alert,
  Text,
  View,
  StyleSheet,
  Pressable,
  Vibration,
} from 'react-native';
import { Focus } from './src/components/features/focus/Focus';
import { FocusHistory } from './src/components/features/focus/FocusHistory';
import { Timer } from './src/components/features/timer/Timer';
import { colors } from './src/components/utils/colors';
import { spacingSizes } from './src/components/utils/sizes';

import AsyncStorage from '@react-native-async-storage/async-storage';

const STATUS = {
  COMPLETED: 1,
  CANCELLED: 2,
};

export default function App() {
  const [focusSubject, setFocusSubject] = useState();
  const [focusHistory, setFocusHistory] = useState([]);

  const updateFocusHistory = (subject, status) => {
    setFocusHistory([
      ...focusHistory,
      { key: String(focusHistory.length + 1), subject, status },
    ]);
  };
  //console.log(focusHistory);

  const endTimer = () => {
    updateFocusHistory(focusSubject, STATUS.COMPLETED);
    setFocusSubject(null);
  };

  const clearSubject = () => {
    updateFocusHistory(focusSubject, STATUS.CANCELLED);
    setFocusSubject(null);
  };

  const onClear = () => {
    setFocusHistory([]);
  };

  const saveHistory = async () => {
    try {
      AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');

      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleVibrating = () => {
    Vibration.cancel();
  };
  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveHistory();
  }, [focusHistory]);

  return (
    <View style={styles.container}>
      <Pressable style={{ flex: 1 }} onPress={() => handleVibrating()}>
        {focusSubject ? (
          <Timer
            focusSubject={focusSubject}
            onTimerEnd={endTimer}
            clearSubject={clearSubject}
          />
        ) : (
          <View style={styles.focusContainer}>
            <Focus addSubject={setFocusSubject} />
            <FocusHistory focusHistory={focusHistory} onClear={onClear} />
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.heavyGreen,
    paddingTop: spacingSizes.xl,
    justifyContent: 'space-around',
  },
  focusContainer: {
    flex: 1,
  },
});
