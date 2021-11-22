import React from 'react'
import Header from '../Header';
import { NavLink } from 'react-router-dom';
import { Col } from 'react-bootstrap';

/**
* @author
* @function Layout
**/

const Layout = (props) => {
  return(
    <>
        <Header />
        {
          props.sidebar ?
          <div className="container-fluid">
        <div className="row">
          <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link active" >
                  <NavLink to="/">Dashboard<span className="sr-only">(current)</span></NavLink> 
                  </a>
                </li>
              </ul> 

             
            </div>
          </nav>

          <Col md={10} style={{ marginLeft: 'auto' }}>
          {props.children}
          </Col>
        </div>
      </div>
      :
      props.children 
    }
        

    </>
   )

 }

export default Layout;