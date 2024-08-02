import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Header from '../Componets/Header';
import {useSelector, useDispatch} from 'react-redux';
import FriendAction from '../store/actions/friend';

function Inbox(params) {
  const data = useSelector((state) => state.FriendReducer);
  const userData = useSelector((state) => state.AuthReducer);
  const [Fetching, UpdateFetch] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      // You can await here

      // ...text-14" ><strong>Discount 50%
      dispatch(
        FriendAction.GetFriend(
          `api/v1/add_friend/?user__username=${userData.userdata.user_name}`,
          UpdateFetch,
        ),
      );
    }
    fetchData();
  }, []);

  function getInobx() {
    UpdateFetch(true);
    dispatch(
      FriendAction.GetFriend(
        `api/v1/add_friend/?user__username=${userData.userdata.user_name}`,

        UpdateFetch,
      ),
    );
  }

  return (
    <View style={{flex: 1}}>
      <Header name="Inbox" props={params} back={false} />

      {data.isloading ? (
        <ActivityIndicator size={'large'} color={'red'} />
      ) : data.friend.length == 0 ? (
        <Text style={{textAlign: 'center'}}> Not found</Text>
      ) : (
        <FlatList
          data={data.friend[0].friend_name}
          onRefresh={() => getInobx()}
          refreshing={Fetching}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  params.navigation.navigate('ChatScreen', {
                    userName: item,
                  });
                }}
                style={{
                  shadowColor: 'gray',
                  shadowOpacity: 0.8,
                  elevation: 3,
                  width: '93%',
                  flexDirection: 'row',
                  height: 56,
                  marginTop: 10,
                  borderRadius: 10,
                  alignItems: 'center',
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  justifyContent: 'space-between',
                  marginBottom: 5,
                  flex: 1,
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
                    color: 'rgb(29, 118, 199)',
                  }}>
                  {item}
                </Text>
                <Text style={{marginRight: 10}}>Message</Text>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
}
export default Inbox;
