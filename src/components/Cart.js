import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import DetailProduct from './DetailProduct'
import {Redirect} from 'react-router-dom'
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Cart extends Component {

    constructor(props){
        super(props)
        this.state = { 
            products: [],
            modal: false,
            pay: false
        }

        this.toggle = this.toggle.bind(this);
        this.togglePay = this.togglePay.bind(this);
    }

    getCart() {  //renderlist

        axios.get('http://localhost:2019/cart').then(res => this.setState({products: res.data, selectedID: 0}))
        // return (
        // )
                        
    }

    componentDidMount() {
        axios.get('http://localhost:2019/cart').then(res => this.setState({products: res.data, selectedID: 0}))
    }

    
    toggle() { 
    this.setState(prevState => ({
      modal: !prevState.modal 
    }));
    }

    togglePay() { 
    this.setState(prevState => ({
      pay: !prevState.pay
    }));
    }

    totalJumlah = () => { 
        var totalJumlah = 0 
        
        for (let i = 0; i < this.state.products.length; i++) {
            if (this.props.user.id === this.state.products[i].idUsername) {    
                totalJumlah += parseInt(this.state.products[i].jumlah);
            }  
        }
        return (
            <td>{totalJumlah}</td>
        )
    }

    totalHarga = () => { 
        var hargaSementara = this.state.products.map(val=>{
            return {
                price: val.jumlah*val.price, 
                idUsername: val.idUsername
            }
        })
        var hargaTotal = 0 

        for (let i = 0; i < this.state.products.length; i++) {
            if (this.props.user.id === hargaSementara[i].idUsername) {
            hargaTotal += parseInt(hargaSementara[i].price);
            }
        }
        return (
            <td>Rp. {hargaTotal}</td>
        )
    }

    // saveProduct = (item) => { 
        
    //     const jumlahBaru = parseInt(this.editQty.value) 
    //     axios.patch('http://localhost:2019/cart/'+this.state.products.idBarang,
    //     {
    //         jumlah:jumlahBaru
    //     }).then(res=>{
    //         this.getCart()
    //     })
    // }

    deleteProduct = (item) => { 
        axios.delete('http://localhost:2019/cart/'+item.idBarang).then(res=>{
            this.getCart()
        })
    }

    pembayaran = () => { 
        return this.state.products.map( item => { 
            if(this.props.user.id === item.idUsername){
                return (
                    <tr>
                        <td>
                        <img className='list' src={item.picture}/>
                        </td>
                        <td>{item.nama}</td>
                        <td>{item.price}</td>
                        <td>{item.jumlah}</td>
                    </tr>
                )
            }
        })
    }

    bayar = () => { 
        

        return this.state.products.map( item => { 
            if(this.props.user.id === item.idUsername){
                axios.delete('http://localhost:2019/cart/'+item.idBarang)
            }
            this.togglePay() 
        })
    }

    


    renderList = () => {
        if(this.props.user.username !== ''){ 
            return this.state.products.map( item => { 
                if(item.idBarang !== this.state.selectedID){ 
                    if(this.props.user.id === item.idUsername){
                        return (
                            <tr>
                                <td scope="col">{item.idBarang}</td>
                                <td scope="col">{item.nama}</td>
                                <td scope="col">{item.deskripsi}</td>
                                <td scope="col">{item.price}</td>
                                <td scope="col"><img src={item.picture}/></td>
                                <td scope="col">{item.jumlah}</td>
                                <td> 
                                    {/* <button className = 'btn btn-danger m-1' onClick={()=>{this.setState({selectedID : item.idBarang, item: item})}} >Edit</button> */}
                                    <button className = 'btn btn-warning m-1' onClick={()=>{this.deleteProduct(item)}}>Delete</button>
                                </td>
                                {/* <button className = 'btn btn-danger m-1' onClick={()=>{this.toggle()}}>CheckOut</button> */}
                            </tr>

                            
                        )
                    }
                }else {
                    if(this.props.user.id === item.idUsername){
                        return (
                            <tr>
                                <td>{item.nama}</td>
                                <td>{item.deskripsi}</td>
                                <td>{item.price}</td>
                                <td>
                                <input className="form-control" ref={input => {this.editQty = input}} type="text" defaultValue={item.jumlah}/>
                                </td>
                                <td>{item.price*item.jumlah}</td>
                                <td>
                                <img className='list' src={item.picture}/>
                                </td>
                                <td>            
                                <button className = 'btn btn-danger m-1' onClick={()=>{this.saveProduct(item)}}>Save</button>
                                <button className = 'btn btn-warning m-1' onClick={()=>{this.setState({selectedID : 0})}}>Cancel</button>
                                </td>
                                {/* <button className = 'btn btn-danger m-1' onClick={()=>{this.toggle()}}>CheckOut</button> */}
                            </tr>
                            
                        )
                    }
                }
            })
        }
        // return <Redirect to='/login'/>
        }


    render () {
        
        return (
            <div>
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
                        <th scope="col">JUMLAH</th>
                        <th scope="col">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderList()}
                </tbody>
                </table>
                <button className = 'btn btn-danger m-1' onClick={()=>{this.toggle()}}>CheckOut</button>
                </div>
                
                <div>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader className="mx-auto">BAYAR</ModalHeader>
                    <ModalBody>
                        <table className="table table-hover mb-5">
                        <thead>
                            <tr>
                                <th scope="col">GAMBAR BARANG</th>
                                <th scope="col">NAMA BARANG</th>
                                <th scope="col">HARGA</th>
                                <th scope="col">JUMLAH</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.pembayaran()}
                            <tr>
                                <td><b>TOTAL BARANG = </b></td>
                                {this.totalJumlah()}
                            </tr>
                            <tr>
                                <td><b>TOTAL HARGA = </b></td>
                                {this.totalHarga()}
                            </tr>
                        </tbody>
                        </table>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={()=>{this.bayar()}}>Bayar</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                    </Modal>
                    <Modal isOpen={this.state.pay} toggle={this.togglePay} className={this.props.className}>
                    <ModalHeader className="mx-auto">SILAHKAN DATANG LAGI</ModalHeader>
                    <ModalBody>
                        THANK YOU FOR BUYING OUR PRODUCTS!
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" href='/'>CANCEL</Button>
                    </ModalFooter>
                    </Modal>
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

export default connect(mapStateToProps) (Cart)





















