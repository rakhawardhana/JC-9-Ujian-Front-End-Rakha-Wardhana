import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios';


class ProductItem extends Component {

    // addToCart = () => {
    //     const jumlah = this.name.value
    //     const name =    this.props.item.nama
    //     const deskripsi =  this.props.item.desc
    //     const price = this.props.item.price
    //     const picture = this.props.item.src

    //     console.log(jumlah)
    //     console.log({
    //         nama: name,
    //         deksripsi : deskripsi,
    //         harga: price,
    //         gambar: picture,
    //         id: this.props.item.id,
    //         jumlah: jumlah
    //     })
        
    //     axios.post('http://localhost:2019/cart', 
    //                     {
    //                         nama: name,
    //                         deksripsi : deskripsi,
    //                         harga: price,
    //                         gambar: picture,
    //                         id: this.props.item.id,
    //                         jumlah: jumlah
    //                     }
    //             )


    // }




    addToCart = () => {
        const jumlah = Number.parseInt(this.name.value)
        const idUsername = this.props.user.id
        const nama =    this.props.item.nama
        const deskripsi =  this.props.item.desc
        const price = this.props.item.price
        const picture = this.props.item.src
        const idBarang = this.props.item.id
        console.log(jumlah)
        
     
        if(jumlah > 0 && idUsername !== ""){
                axios.get(
                    'http://localhost:2019/cart',
                    {
                        params: {
                            idUsername: idUsername,
                            idBarang: idBarang
                        }
                    }
                ).then( res => {
                    // if(res.data.length > 0){     
                    //         axios.put('http://localhost:2019/cart/'+res.data[0].idBarang,
                    //         { 
                    //             idUsername: idUsername,
                    //             idBarang: idBarang,
                    //             nama: nama,
                    //             jumlah: jumlah,
                    //             price: price,
                    //             picture: picture,
                    //             deskripsi: deskripsi
                    //         }).then(res=>{
                    //             alert('ADD CART')
                    //             document.location.reload(true)
                    //         })

                    /////// NOMOR 2
                    if(res.data.length > 0) 
                    //  if(axios.get('http://localhost:2019/cart' + idBarang).then(res => res.data[0].jumlah > 0)) 
                    {
                        var jumlahBaru = axios.get('http://localhost:2019/cart').then(res => res.data[0].jumlah)
                        // console.log(jumlahBaru)
                        axios.patch('http://localhost:2019/cart', 
                        {
                            jumlah: parseInt(jumlah) + parseInt(jumlahBaru)
                            
                        }).then(res=>{
                            alert('ADD YOUR CART')
                            // document.location.reload(true)
                        })

                     }
                        
                     else { 
                        axios.post('http://localhost:2019/cart',
                        {
                            idUsername: idUsername,
                            idBarang: idBarang,
                            nama: nama,
                            jumlah: jumlah,
                            price: price,
                            picture: picture,
                            deskripsi: deskripsi
                        }).then(res=>{
                            alert('ADD NEW PRODUCT TO CART')
                            // document.location.reload(true)
                        })
                    }
                })    
        } else {
            if(idUsername === ""){ 
                alert('LOGIN PLEASE!!')
            } else{ 
                alert('ISI DULU JUMLAHNYA')
            }
            
        }
        // return (
        //     jumlah = 0
        // )
    }


    render(){
        return (
            <div className="card col-3 m-5">
                <img src={this.props.item.src} className = 'card-img-top'/>
                <div className='card-body'>
                    <h5 className='card-title'> {this.props.item.nama}</h5>
                    <p className='card-text'> {this.props.item.desc}</p>
                    <p className='card-text'>Rp {this.props.item.price}</p>
                    <input ref={input => this.name = input} className="form-control" defaultValue="0" type="number"/> 
                    <Link to={'/DetailProduct/' + this.props.item.id}>
                        <button className='btn btn-outline-primary btn-block'>Details</button>
                    </Link>
                    <button onClick={this.addToCart}>Add To Cart</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth // {id, username}
    }
}


export default connect(mapStateToProps)(ProductItem)


