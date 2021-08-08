import React, { Component } from 'react';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark text-white">
                <a className="navbar-brand">Notaria Inteligente</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" >Inicio <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" >Transacciones</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" >Precio</a>
                        </li>
                    </ul>
                    <span className="navbar-text">
                        Cuenta: {this.props.account}
                    </span>
                </div>
            </nav>
        )
    }
}

export default Navbar