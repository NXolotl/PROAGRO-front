import React, { Component } from 'react';
import axios from 'axios';
import {
    Row, Col,
    Button, Form, FormGroup, Label, Input, Spinner,
    Modal, ModalHeader, ModalBody, ModalFooter  
} from 'reactstrap';

export class ModalFormU extends Component {
    constructor(props) {
      super(props);
      this.state = { 
          disabled:false, 
          nombre: "", 
          fechaNacimiento: "",
          rfc: "",
          password:"",
          msg: "", 
          displaySpinner: "none",
          modal: false
        };
        this.toggle = this.toggle.bind(this);
        this.setNombre = this.setNombre.bind(this);
        this.setFechaN = this.setFechaN.bind(this);
        this.setRfc = this.setRfc.bind(this);
        this.setPass = this.setPass.bind(this);
        this.formSubmmit = this.formSubmmit.bind(this);
    }
    
    setNombre(e){
        this.setState({nombre: e.target.value});
    }
    
    setFechaN(e){
        this.setState({fechaNacimiento: e.target.value});
    }
    setRfc(e){
        this.setState({rfc: e.target.value});
    }
    setPass(e){
        this.setState({password: e.target.value});
    }
    toggle (){
        if (this.state.modal) {
            this.setState({modal: !this.state.modal});
        }
        else{
            this.setState({modal: true});
        }
        console.log(this.state.modal);
    }

    formSubmmit(e) {
        e.preventDefault();
        if (this.state.nombre.length > 0 
            && this.state.rfc.length > 0
            && this.state.password.length > 0
            && this.state.fechaNacimiento.length >0) {
            this.setState({displaySpinner: "block", disabled: true});
            
            axios.post(`https://localhost:44362/api/Usuarios`, 
            { 
                Nombre: this.state.nombre,
                RFC: this.state.rfc,
                Contrasena: this.state.password,
                FechaNacimiento: this.state.fechaNacimiento
            })
            .then(res => {
                if (res.data.code === 200 && res.data.value === "ok") {
                    this.setState({msg:"Se ha registrado al usuario correctamente"});
                    window.location.href="/Usuarios";
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
        <>
            <Button className="btn btn-primary" onClick={this.toggle}>Nuevo</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-dialog">
                <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                <ModalBody>
                    <Form style={{marginLeft:'50px', marginRight:'50px'}}>
                        <FormGroup>
                            <Label for="Nombre">Nombre:</Label>
                            <Input type="text" name="user" id="NombreL" onChange={this.setNombre} value={this.state.nombre} disabled ={this.state.disabled}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="Rfc">RFC:</Label>
                            <Input type="text" name="user" id="NombreL" onChange={this.setRfc} value={this.state.rfc} disabled ={this.state.disabled}/>
                        </FormGroup>
                        <FormGroup>
                                <Label for="FechaCr">Fecha de creación:</Label>
                                <Input type="date" name="password" id="NombreC" onChange={this.setFechaN} value={this.state.fechaNacimiento} disabled ={this.state.disabled}/>
                        </FormGroup>
                        <FormGroup>
                                <Label for="examplePassword">Contraseña:</Label>
                                <Input type="password" name="password" id="Password" placeholder="Contraseña" onChange={this.setPass} value={this.password} disabled ={this.state.disabled}/>
                        </FormGroup>
                        <Row>
                            <Col md="12">
                                <span>{this.state.msg}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col md ="3">
                                <Spinner color="primary" style={{display:this.state.displaySpinner}}><span> </span></Spinner>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Button className="btn btn-primary" onClick={this.formSubmmit} disabled ={this.state.disabled} style={{margin:"10px"}}>Guardar</Button>
                    </Col>
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    );
    }
}