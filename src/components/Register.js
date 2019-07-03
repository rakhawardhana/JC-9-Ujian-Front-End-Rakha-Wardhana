import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Register extends Component {

    onButtonClick = () => {
        const user = this.username.value
        const email = this.email.value
        const pass = this.password.value



        axios.get(
                'http://localhost:2019/users',
                {
                    params: {
                        username: user
                    }
                }
            ).then( res => {
                if(res.data.length > 0) {
                    console.log('Username sudah digunakan')
                } else {
                    axios.get('http://localhost:2019/users',{
                        params: {
                            email: email
                        }
                    }).then((res => {
                        if(res.data.length > 0){
                        console.log('Email sudah digunakan')
                        } else {
                        // post data
                        // console.log('Akann input data')
                            axios.post(
                            'http://localhost:2019/users',
                            {
                                username: user,
                                email: email,
                                password: pass
                            }
                            ).then( (res) => {
                            console.log('Data berhasil di input')
                            console.log(res)
                            }).catch( (err) => {
                            console.log('Gagal post data')
                            console.log(err)
                        })
                    }
                })
             )}
            }).catch( err => {
                     console.log('Gagal request')
                     console.log(err)
                })
            
        // ngepost data, makenya axious.post
            


        // axios.post('http://localhost:2019/users', 
        
        //     {
        //     // objek berisi apa yang kita post
        //         username: user,
        //         email: email,
        //         pass: pass
        //     }
        // ).then( (res) => {
        //     console.log('Data berhasil di input')
        //     console.log(res)
        // }).catch( (err) => {
        //     console.log('Gagal post data')
        //     console.log(err)
        // }) 

        
        }
    
    render() {
        return (
            <div>
               <div className = 'mt-5 row'>
                    <div className = 'col-sm-4 mx-auto card'>
                        <div className = 'card-body'>
                            <div className = ' border-bottom border-secondary card-title'>
                                <h1>Register</h1>
                            </div>

                            <div className='card-title'>
                                <h4>Username</h4>
                            </div>
                            <form className='input-group'>
                                <input className='form-control' type='text'
                                    ref={(input) => {this.username = input}}  // membuat variabel baru namanya username, yang berisi inputan
                                />
                            </form>

                            <div className='card-title'>
                                <h4>Email</h4>
                            </div>
                            <form className='input-group'>
                                <input className='form-control'
                                    ref={(input) => {this.email= input}} // membuat variabel baru namanya email, yang berisi inputan email
                                />
                            </form>

                            <div className='card-title'>
                                <h4>Password</h4>
                            </div>
                            <form className='input-group'>
                                <input className='form-control' type='password'
                                    ref={(input) => {this.password= input}}/>
                            </form>

                        </div>
                        <button onClick={this.onButtonClick} className='btn btn-success'>Click For Register</button>
                        <p>Sudah memiliki akun ? <Link to="/login" >Login disini</Link></p>
                    </div>
                </div>

            </div>
        )
    }



}

export default Register



