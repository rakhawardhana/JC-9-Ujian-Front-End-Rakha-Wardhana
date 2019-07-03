import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';


class ProductItem extends Component {

    addToCart = () => {
        const jumlah = this.name.value
        const name =    this.props.item.nama
        const deskripsi =  this.props.item.desc
        const price = this.props.item.price
        const picture = this.props.item.src

        console.log(jumlah)
        console.log(                        {
            nama: name,
            deksripsi : deskripsi,
            harga: price,
            gambar: picture,
            id: this.props.item.id
        }
)
        axios.post('http://localhost:2019/cart', 
                        {
                            nama: name,
                            deksripsi : deskripsi,
                            harga: price,
                            gambar: picture,
                            id: this.props.item.id
                        }
                )


    }
    render(){
        // var {nama, desc, price, src} = this.props.item
        return (
            <div className="card col-3 m-5">
                <img src={this.props.item.src} className = 'card-img-top'/>
                <div className='card-body'>
                    <h5 className='card-title'> {this.props.item.nama}</h5>
                    <p className='card-text'> {this.props.item.desc}</p>
                    <p className='card-text'>Rp {this.props.item.price}</p>
                    <input ref={input => this.name = input} type='text'/> 
                    <Link to={'/DetailProduct/' + this.props.item.id}>
                        <button className='btn btn-outline-primary btn-block'>Details</button>
                    </Link>
                    {/* <button>Details</button> */}
                    <button onClick={this.addToCart}   >Add To Cart</button>
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

// export default connect(mapStateToProps, {}) (ProductItem)
export default ProductItem


