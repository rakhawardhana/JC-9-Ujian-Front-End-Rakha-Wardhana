import React, { Component } from 'react'
import axios from 'axios'
// import {redirect} from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



class ManageProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
          products: [],
          modal: false,
          id: null
        };
    
        this.toggle = this.toggle.bind(this);
    }


    // state = {
    //     products: [], 
    //     modal: false

        
    // }
    
    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }

    componentDidMount(){
        // Akses database // pengen ke load dulu, baru datanya.....
        axios.get('http://localhost:2019/products')
            .then(res => {
               this.setState({products: res.data})
            })
    }

    getProduct = () => {
        axios.get('http://localhost:2019/products')
            .then(res => {
               this.setState({products: res.data})
            })
    }

    addProduct = () => {

        const nama = this.nama.value
        const deskripsi = this.desc.value
        const harga = this.price.value
        const gambar = this.pict.value
        axios.post('http://localhost:2019/products', 
                        {
                            nama: nama,
                            desc: deskripsi,
                            price: harga,
                            src: gambar
                        }
                ) .then(res => 
                    {
                        // this.setState({products: res.data}
                        
                        // )

                     axios.get('http://localhost:2019/products', {              //// kalau gak di get, dia harus refresh
                         })
                        .then(res => this.setState({products: res.data}) )
                    })
    
    }
   
    // delete = (item) => {
    //     const data = this.state.products.filter(i => i.id !== item.id)
    //     axios.get('http://localhost:2010/products', data)
    //     .then(res => this.setState({products: res.data}))   
    // }

    delete = (i) => {

        axios.delete('http://localhost:2019/products/' + i)
        .then(res =>  {this.getProduct()})
        
    }

    edit = () => {
        const id = this.state.id
        const nama = this.nama.value
        const desc = this.desc.value
        const price = this.price.value
        const pict = this.pict.value

        axios.put('http://localhost:2019/products/' + id, {
            nama: nama,
            desc: desc,
            price: price,
            src: pict
        }).then(res => {this.getProduct()})
    }

    
    renderList = () => {
        return this.state.products.map( item => { // {id, name, price, desc, src}
            return (
                
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.nama}</td>
                    <td>{item.desc}</td>
                    <td>{item.price}</td>
                    <td>
                        <img className='list' src={item.src}/>
                    </td>
                    <td>
                        <button className = 'btn btn-primary' onClick={() => {
                            this.toggle()
                            this.setState({id: item.id})
                            }}>Edit</button>
                        <button className = 'btn btn-warning' onClick={()=>{this.delete(item.id)}} >Delete </button>
                    </td>
                </tr>
                //onClick={() => {this.delete(item)}}
                
            )
        })
    }
    render () {
        return (
        <div className="container">
            <div>
              {/* <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button> */}
              <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                <ModalBody>
                    <input className='form-control' type='hidden' value = {this.state.id}
                            ref={(input) => {this.id = input}}/>
                    <input className='form-control' type='text' 
                            ref={(input) => {this.nama = input}}/>
                    <input className='form-control' type='text' 
                            ref={(input) => {this.desc = input}}/>
                    <input className='form-control' type='text' 
                            ref={(input) => {this.price = input}}/>
                    <input className='form-control' type='text'
                            ref={(input) => {this.pict = input}}/>
                </ModalBody>
                 <ModalFooter>
                   <Button color="primary"  onClick={() => {
                        this.toggle()
                        this.edit()}} >Do Something</Button>
                   {/* {' '} */}
                   <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
              </Modal>
            </div>
            <h1 className="display-4 text-center">List Product</h1>
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
                    {this.renderList()}
                </tbody>
            </table>
            <h1 className="display-4 text-center">Input Product</h1>
            <table className="table text-center">
                <thead>
                    <tr>
                        <th scope="col">NAME</th>
                        <th scope="col">DESC</th>
                        <th scope="col">PRICE</th>
                        <th scope="col">PICTURE</th>
                        <th scope="col">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="col"><input ref={input => this.nama = input} className="form-control" type="text" /></th>
                        <th scope="col"><input ref={input => this.desc = input} className="form-control" type="text" /></th>
                        <th scope="col"><input ref={input => this.price = input} className="form-control" type="text" /></th>
                        <th scope="col"><input ref={input => this.pict = input} className="form-control" type="text" /></th>
                        <th scope="col"><button className="btn btn-outline-warning" onClick={this.addProduct}>Add</button></th>
                    </tr>
                </tbody>
            </table>
        </div>
    )
    }
}

export default ManageProduct