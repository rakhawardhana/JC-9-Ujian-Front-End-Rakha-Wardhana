
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { onLogoutUser } from '../actions'
import axios from 'axios'

import {
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    // NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';


class Header extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false,
        //   productcart: []
        };
      }
    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

    // componentDidMount(){
    //     axios.get('http://localhost:2019/cart').then(res=>this.setState({productcart:res.data}))
    // }

    onButtonClick = () => {
        // menghapus username dari redux state
        this.props.onLogoutUser()
    }

    // jumlahCart = () => {
    //     var cart = 0
    //     for (let i = 0; i < this.state.productcart.length; i++) {
    //         if(this.props.user.id === this.state.productcart[i].idUser){
    //             productcart += 1
    //         }
    //     }
    //     return (cart)
    // }

    render () {
        
        
    //     return (
    //         <div>
    //             <Navbar color="light" light expand="md">
    //             <NavbarBrand href="/">simpleMerce</NavbarBrand>
    //             <NavbarToggler onClick={this.toggle} />
    //             <Collapse isOpen={this.state.isOpen} navbar>
    //                 <Nav className="ml-auto" navbar>
    //                 <NavItem>
    //                     <Link to='/' >All Products</Link>
    //                 </NavItem>
    //                 <NavItem>
    //                     <Link to='/register'>
    //                         <Button color="primary" className="mx-3">Register</Button>
    //                     </Link>
    //                 </NavItem>
    //                 <NavItem>
    //                     <Link to='/login' >
    //                         <Button color="success">Login</Button>
    //                     </Link>
    //                 </NavItem>
    //                 </Nav>
    //             </Collapse>
    //             </Navbar>
    //         </div>
    //     )
    // }

         if(this.props.user.username === ''){
        // Render ketika belum login
            return (
                <div>
                    <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">simpleMerce</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link to='/' >All Products</Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/register'>
                                <Button color="primary" className="mx-3">Register</Button>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/login' >
                                <Button color="success">Login</Button>
                            </Link>
                        </NavItem>
                        </Nav>
                    </Collapse>
                    </Navbar>
                </div>
            )
        } 

        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">simpleMerce</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                    <NavItem className='mt-2'>
                        <Link to='/' >All Products</Link>
                    </NavItem>
                    {/* <NavItem className='mt-2 ml-auto'>
                        <Link to='/checkout' >
                            <button className = 'btn btn-primary ml-4 mt-auto'>{this.jumlahCart()}
                            <img id='cart' className='ml-2 mr-2' src='https://image.flaticon.com/icons/svg/34/34568.svg'></img>Shopping Cart 
                            </button>
                        </Link>
                    </NavItem> */}
                    <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                    Hallo, {this.props.user.username}
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem>
                        <Link to='/manageProduct' >Manage Product</Link>
                        </DropdownItem>
                        <DropdownItem divider />
                        <Link to='/login' >
                        <Button className='dropdown-item' onClick={this.onButtonClick}>
                            Logout
                        </Button>
                        </Link>
                    </DropdownMenu>
                    </UncontrolledDropdown>
                    </Nav>
                </Collapse>
                </Navbar>
            </div>
            
                    
          );
        }
    
}

const mapStateToProps = state => {
    return {
        user: state.auth // {id, username}
    }
}

export default connect(mapStateToProps, {onLogoutUser})(Header)
