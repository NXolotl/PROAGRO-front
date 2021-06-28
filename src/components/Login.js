import React, { Component} from 'react';
import {
  Card, CardImg, CardBody,
  CardTitle, CardSubtitle, Button,
  Form, FormGroup, Label, Input,
  Container, Row, Col, Spinner 
} from 'reactstrap';
import axios from 'axios';
import logo from '../logo.svg';

export class Login extends Component {
    
constructor(props) {
    super(props);
    this.state = { user: "", password: "", displaySpinner: "none", disabled: false, msg: "" };
    this.setUser = this.setUser.bind(this);
    this.setPass = this.setPass.bind(this);
    this.formSubmmit = this.formSubmmit.bind(this);
  }
setUser(e){
    this.setState({user: e.target.value});
}
setPass(e){
    this.setState({password: e.target.value});
}

formSubmmit (e) {
    e.preventDefault();
    if (this.state.user.length > 0 && this.state.password.length > 0) {
        this.setState({displaySpinner: "block", disabled: true});
        
        axios.post(`https://localhost:44362/api/Usuarios/LoginUser`, 
        { 
            Nombre: this.state.user,
            Contrasena: this.state.password
        })
        .then(res => {
            if (res.data.code !== 200) {
                this.setState({msg:res.data.message});
            }
            else if (res.data.code === 200) {
                const permisos = [];
                var usr = "";
                res.data.value.permisos.map(permiso =>{
                    permisos.push(permiso.id);
                    permiso.permisos.map(usuarios => {
                        usr = usuarios.idUsuario;
                    });
                });
                localStorage.setItem('session', usr);
                localStorage.setItem('permisos', permisos);
                window.location.href ="/Georefs";
            }
            else{
                this.setState({msg:"Ocurrió un error inesperado"});
            }
        });
        this.setState({displaySpinner: "none", disabled: false});
    }
    else{
        alert("Faltan datos");
    }
}
  
  render () {
    return (
      <Container>
        <Card>
            <CardImg top src={logo} alt="Logo" style={{width:"100px"}}/>
                <CardBody>
                    <CardTitle tag="h5">ProAgro</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">Sig in</CardSubtitle>
                    <Form style={{marginLeft:'50px', marginRight:'50px'}}>
                        <Row>
                            <FormGroup>
                                <Col md="5">
                                    <Label for="exampleEmail">Usuario</Label>
                                    <Input type="text" name="user" id="user" placeholder="User" onChange={this.setUser} value={this.user} disabled ={this.state.disabled}/>
                                </Col>
                            </FormGroup>
                        </Row>
                        <Row>
                            <FormGroup>
                                <Col md="5">
                                    <Label for="examplePassword">Contraseña</Label>
                                    <Input type="password" name="password" id="Password" placeholder="Contraseña" onChange={this.setPass} value={this.password} disabled ={this.state.disabled}/>
                                </Col>
                            </FormGroup>
                        </Row>
                        <Row>
                            <Col md="12">
                                <span>{this.state.msg}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col md ="3">
                                <Spinner color="primary" style={{display:this.state.displaySpinner}}><span> </span></Spinner>
                            </Col>
                            <Col md={{ span: 6, offset: 3 }}>
                                <Button className="btn btn-default" onClick={this.formSubmmit} disabled ={this.state.disabled} style={{margin:"10px"}}>Acceder</Button>
                            </Col>
                        </Row>
                        </Form>
                </CardBody>
        </Card>
      </Container>
    );
  }
}
