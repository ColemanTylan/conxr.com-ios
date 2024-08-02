import React, {Component} from 'react';
import {Icon} from 'native-base';
import {View, Text, BackHandler, TouchableOpacity} from 'react-native';
import {NavigationContainer, DrawerActions} from '@react-navigation/native';

function Header(navigation) {
  return (
    <>
      <View style={{backgroundColor: 'rgb(29, 118, 199)'}}>
        {navigation.back ? (
          <View
            style={{
              flexDirection: 'row',
              width: '85%',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 45,
              backgroundColor: 'rgb(29, 118, 199)',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() =>
                  navigation.type == 1
                    ? navigation.onPress(false)
                    : navigation.props.navigation.goBack()
                }>
                <Icon
                  style={{color: 'white', fontSize: 35, paddingRight: 10}}
                  name="arrow-back-sharp"
                  type="Ionicons"
                />
              </TouchableOpacity>
            </View>
            <Text style={{color: 'white', fontSize: 20}}>
              {navigation.name}
            </Text>
            <Text style={{color: 'white'}}> </Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              width: '85%',
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              height: 45,
              backgroundColor: 'rgb(29, 118, 199)',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                textAlign: 'center',
              }}>
              {navigation.name}
            </Text>
          </View>
        )}
      </View>
    </>
  );
}
export default Header;
