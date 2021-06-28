import React, { Component } from 'react';
import axios from 'axios';
import {
    Row, Col,
    Button, Form, FormGroup, Label, Input, Spinner,
    Modal, ModalHeader, ModalBody, ModalFooter  
} from 'reactstrap';

export class ModalFormE extends Component {
    constructor(props) {
      super(props);
      this.state = { disabled:false, nl: "", nc: "", msg: "", displaySpinner: false, modal: props.visible };
    }
    
    setNombreL(e){
        this.setState({nl: e.target.value});
    }
    
    setNombreC(e){
        this.setState({nc: e.target.value});
    }
    toggle (){
      this.setState({modal: !this.state.modal});
    }

    formSubmmit(){}
    
    render () {
    return (
        <Modal isOpen={this.state.modal} className="modal">
            <ModalHeader>Modal title</ModalHeader> {/*toggle={toggle}*/}
            <ModalBody>
                <Form style={{marginLeft:'50px', marginRight:'50px'}}>
                    <Row>
                        <FormGroup>
                            <Col md="5">
                                <Label for="NL">Nombre largo</Label>
                                <Input type="text" name="user" id="NombreL" onChange={this.setNombreL} value={this.state.nl} disabled ={this.state.disabled}/>
                            </Col>
                        </FormGroup>
                    </Row>
                    <FormGroup>
                        <Row>
                            <Col md="5">
                                <Label for="NC">Nombre corto</Label>
                                <Input type="text" name="password" id="NombreC" onChange={this.setNombreC} value={this.state.nc} disabled ={this.state.disabled}/>
                            </Col>
                        </Row>
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
    );
    }
}