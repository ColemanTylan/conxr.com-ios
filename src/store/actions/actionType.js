export default class ActionType {
  /**
    |--------------------------------------------------
    | Login Action
    |--------------------------------------------------
    */

  static ISLOGGEDIN = 'ISLOGGEDIN';

  static LOGIN = 'LOGIN';
  static LOGIN_SUCCESS = 'LOGIN_SUCCESS';
  static LOGIN_FAIL = 'LOGIN_FAIL';

  static LOGIN_DIRECT = 'LOGIN_DIRECT';
  static LOGIN_DIRECT_SUCCESS = 'LOGIN_DIRECT_SUCCESS';
  static LOGIN_DIRECT_FAIL = 'LOGIN_DIRECT_FAIL';

  /**
    |--------------------------------------------------
    | Forget Action
    |--------------------------------------------------
    */
  static FORGOT_PASSWORD = 'FORGOT_PASSWORD';
  static FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
  static FORGOT_PASSWORD_FAIL = 'FORGOT_PASSWORD_FAIL';
  /**
    |--------------------------------------------------
    | Update Action
    |--------------------------------------------------
    */
  static UPDATE_PASSWORD = 'UPDATE_PASSWORD';
  static UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS';
  static UPDATE_PASSWORD_FAIL = 'UPDATE_PASSWORD_FAIL';
  /**
    |--------------------------------------------------
    | Verfifycode Action
    |--------------------------------------------------
    */
  static VERIFY = 'VERIFY';
  static VERIFY_SUCCESS = 'VERIFY_SUCCESS';
  static VERIFY_FAIL = 'VERIFY_FAIL';

  /**
    |--------------------------------------------------
    |Logout Action
    |--------------------------------------------------
    */
  static LOGOUT = 'LOGIN_OUT';
  static LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
  static LOGOUT_FAIL = 'LOGOUT_FAIL';

  /**
    |--------------------------------------------------
    | Singup Action
    |--------------------------------------------------
    */
  static SIGNUP = 'SIGNUP';
  static SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
  static SIGNUP_FAIL = 'SIGNUP_FAIL';

  /**
    |--------------------------------------------------
    | Profile Action
    |--------------------------------------------------
    */
  static PROFILE = 'PROFILE';
  static PROFILE_SUCCESS = 'PROFILE_SUCCESS';
  static PROFILE_FAIL = 'PROFILE_FAIL';


  /**
    |--------------------------------------------------
    | Gert User Profile Action
    |--------------------------------------------------
    */
  static GET_USER_PROFILE = 'GET_USER_PROFILE';
  static GET_USER_PROFILE_SUCCESS = 'GET_USER_PROFILE_SUCCESS';
  static GET_USER_PROFILE_FAIL = 'GET_USER_PROFILE_FAIL';

  static UPDATE_PROFILE = 'UPDATE_PROFILE';
  static UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
  static UPDATE_PROFILE_FAIL = 'UPDATE_PROFILE_FAIL';

  static ADD_POST = 'ADD_POST';
  static ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
  static ADD_POST_FAIL = 'ADD_POST_FAIL';
  //Get Post Action
  static GET_POST = 'GET_POST';
  static GET_POST_SUCCESS = 'GET_POST_SUCCESS';
  static GET_POST_FAIL = 'GET_POST_FAIL';




  static SEARCH = 'SEARCH';
  static SEARCH_SUCCESS = 'SEARCH_SUCCESS';
  static SEARCH_FAIL = 'SEARCH_FAIL';
  static RE_SEARCH = 'RE_SEARCH';

  static FRIEND = 'FRIEND';
  static FRIEND_SUCCESS = 'FRIEND_SUCCESS';
  static FRIEND_FAIL = 'FRIEND_FAIL';


  static ADD_FRIEND = 'ADD_FRIEND';
  static ADD_FRIEND_SUCCESS = 'ADD_FRIEND_SUCCESS';
  static ADD_FRIEND_FAIL = 'ADD_FRIEND_FAIL';


  /**
    |--------------------------------------------------
    | Gert ChatAction
    |--------------------------------------------------
    */
   static GET_CHAT = 'GET_CHAT';
   static GET_CHAT_SUCCESS = 'GET_CHAT_SUCCESS';
   static GET_CHAT_FAIL = 'GET_CHAT_FAIL';
 

  /**
    |--------------------------------------------------
    | Gert ChatAction
    |--------------------------------------------------
    */
   static ADD_CHAT = 'ADD_CHAT';
   static ADD_CHAT_SUCCESS = 'ADD_CHAT_SUCCESS';
   static ADD_CHAT_FAIL = 'ADD_CHAT_FAIL';
 
}
