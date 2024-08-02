import React, {useEffect, useState} from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import Header from '../Componets/Header';
import SearchAction from '../store/actions/search';
import {
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {color} from 'react-native-reanimated';
import {FirendAction} from '../store/actions';
import axios from 'axios';

function AddFriend(params) {
  const [searchData, searchAdd] = useState('');
  const data = useSelector((state) => state.SearchReducer);
  const userData = useSelector((state) => state.AuthReducer);

  const dispatch = useDispatch();
  function search() {
    if (searchData == '') {
      alert('Search Some Thing');
    } else {
      dispatch(
        SearchAction.SearchFirend(
          2,
          `searchapi/?search=${searchData}`,
          searchData,
          userData.userdata.user_name,
        ),
      );
    }
  }

  useEffect(() => {
    function handleStatusChange(status) {
      // setIsOnline(status.isOnline);
    }
    // Specify how to clean up after this effect:
    return function cleanup() {
      dispatch(SearchAction.SearchFirend(1));
    };
  }, []);

  function addthisfriend(id) {
    var value = new FormData();
    value.append('user', userData.userdata.user);
    value.append('friend_name', id);
    dispatch(
      FirendAction.AddFrirend(
        'api/v1/add_friend/',
        value,
        userData.userdata.user_name,
        id,
        `searchapi/?search=${searchData}`,
        2,
        searchData,
      ),
    );
  }
  return (
    <View style={{flex: 1}}>
      <Header name="Add Friend" back={true} props={params} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '95%',
          alignSelf: 'center',
          marginTop: 5,
        }}>
        <TextInput
          placeholder=" search"
          value={searchData}
          style={{borderWidth: 1, borderRadius: 5, width: '75%'}}
          onChangeText={(val) => {
            searchAdd(val);
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: 'rgb(29, 118, 199)',
            margin: 5,
            padding: 10,
            justifyContent: 'center',
          }}
          onPress={() => {
            search();
          }}>
          <Text style={{color: 'white'}}> Search</Text>
        </TouchableOpacity>
      </View>

      {data.isloading ? (
        <ActivityIndicator size={'large'} color={'red'} />
      ) : data.search.length == 0 ? (
        <Text style={{textAlign: 'center'}}> Not found</Text>
      ) : (
        <FlatList
          data={data.search}
          style={{
            paddingTop: 5,
            marginTop: 5,
            paddingBottom: 5,
            width: '97%',
            alignSelf: 'center',
            marginBottom: 5,
          }}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  shadowColor: 'gray',
                  shadowOpacity: 0.8,
                  elevation: 3,
                  width: '93%',
                  height: 110,
                  marginTop: 10,
                  borderRadius: 10,
                  alignItems: 'center',
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  flex: 1,
                  justifyContent: 'space-between',
                  paddingBottom: 10,
                  marginBottom: 5,
                }}>
                <View
                  style={{
                    width: '93%',
                    flexDirection: 'row',
                    borderRadius: 10,
                    alignItems: 'center',
                    alignSelf: 'center',
                    flex: 1,
                    justifyContent: 'space-between',
                  }}>
                  <Image
                    source={require('../../assets/logo.png')}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 100,
                      justifyContent: 'center',
                      marginLeft: 10,
                    }}
                  />
                  <Text
                    style={{
                      marginLeft: 25,
                      fontSize: 22,
                      width: '50%',
                      color: 'rgb(29, 118, 199)',
                    }}>
                    {item.user_name}
                  </Text>
                  <TouchableOpacity
                    disabled={item.isFirend == true ? true : false}
                    style={{marginRight: 15}}
                    onPress={() => {
                      addthisfriend(item.user_name);
                    }}>
                    <Text style={{color: 'blue'}}>
                      {item.isFirend ? '' : 'Connect'}
                    </Text>
                  </TouchableOpacity>
                </View>
                {item.isFirend ? (
                  <Text
                    style={{
                      marginLeft: 25,
                      fontSize: 15,
                      color: 'rgb(29, 118, 199)',
                    }}>
                    Alredy Your Friend{' '}
                  </Text>
                ) : null}
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

export default AddFriend;
