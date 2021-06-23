import React from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';

import { fontSizes, spacingSizes } from '../../utils/sizes';
import { colors } from '../../utils/colors';
import { RoundedButton } from '../../RoundedButton';

const HistoryItem = ({ item, index }) => {
  return <Text style={styles.historyItem(item.status)}>{item.subject}</Text>;
};

export const FocusHistory = ({ focusHistory, onClear }) => {
 

  return (
    <>
      <SafeAreaView style={{ flex: 1 ,justifyContent:'center', alignItems: 'center' }}>
        {!!focusHistory.length && (
          <>
          <View style={{flex:0.8 , justifyContent:'space-around'}}>
            <Text style={styles.title}> Things we've focused on :</Text>
            <FlatList
              style={{  }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            </View>
            <View styles={styles.clearButton}>
              <RoundedButton
                title="Clear"
                size={50}
                onPress={() => onClear()}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  historyItem: (status) => ({
    color: status > 1 ? colors.focusCancel : colors.focusSuccess,
    fontSize: fontSizes.md,
  }),
  title: {
    color: 'white',
    fontSize: fontSizes.md,
  },
  clearButton:{
    padding:spacingSizes.md
  }
});
