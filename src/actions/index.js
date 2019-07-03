// action creator

import axios from 'axios'
import cookies from 'universal-cookie'

const cookie = new cookies()

export const onLoginUser = (user, pass) => {
    return (dispatch) => { // dispatch adalah function 
        axios.get(
            'http://localhost:2019/users',
            {
                params: {
                    username: user,
                    pass: pass
                }
            }     // params itu parameter apa yang diambil
        ).then(res => {
            if(res.data.length > 0) {
                const {id, username} = res.data[0]
                // kirim action ke reducer, untuk disimpan username
                dispatch(
                    {
                    type: 'LOGIN_SUCCESS',
                    payload: {
                        // id: res.data[0].id,
                        // username: res.data[0].username
                        id: id,
                        username: username
                    }
                }
              )  // console.log(res.data[0].username + ' Berhasil Login')

              // create data untuk cookie 
              cookie.set('userName', {id, username}, {path: '/'}) // username itu value
            } else {
                console.log('Username/Password salah!')
            }
        })

    }
        
}

export const keepLogin = (objUser) => {
    // objUser = {id, username}
    return {
        type: "LOGIN_SUCCESS",
        payload: {
            id: objUser.id,
            username: objUser.username
        }
    }
}

export const onLogoutUser = () => {
    cookie.remove('userName')
    return {
        type: 'LOGOUT_SUCCESS'
    }
}