import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DetailProduct from './DetailProduct'
import axios from 'axios';

class Cart extends Component {

    constructor(props){
        super(props)
        this.state = { 
            products: []
        }
    }

    renderList() {
        axios.get('http://localhost:2019/cart').then(res => this.setState({products: res.data}))
        // return (
        // )
                        
    }

    componentDidMount() {
        this.renderList()
    }

    render () {
        
        return (
            <div>
                <h1 className = 'justify'> LIST CART </h1>
                <table className="table table-hover mb-5">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">NAME</th>
                        <th scope="col">DESC</th>
                        <th scope="col">PRICE</th>
                        <th scope="col">PICTURE</th>
                        <th scope="col">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.products.map(v => (
                        <tr>
                            <td scope="col">{v.id}</td>
                            <td scope="col">{v.nama}</td>
                            <td scope="col">{v.deskripsi}</td>
                            <td scope="col">{v.harga}</td>
                            <td scope="col"><img src={v.gambar}/></td>
                            <td scope="col"></td>
                        </tr>
                    ))}
                </tbody>
                </table>



            </div>
            
        )



    }

}

export default Cart





















