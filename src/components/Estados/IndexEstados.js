import React, { Component } from 'react';
import axios from 'axios';
import {
  Card, CardBody,
  CardTitle, CardSubtitle, Button,
  Container 
} from 'reactstrap';
import { Layout } from '../Commons/Layout';
import {SingleMap} from '../Georeferencias/SingleMap';
import {ModalFormE} from './ModalFormE';

export class IndexEstados extends Component {
  constructor(props) {
    super(props);
    this.state = { modal: false };
    if (localStorage.getItem("session") === null) {
        window.location.href = "/";
    }
  }

  toggle (){
    this.setState({modal: !this.state.modal});
  }

  render () {
    return (
      <Layout>
        <Container>
          <Card>
              <CardBody>
                  <CardTitle tag="h5">Estados</CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted"></CardSubtitle>
                  <SingleMap refs={this.state.georefs} />
                  <Button className="btn btn-primary" onClick={this.toggle}>Nuevo</Button>
              </CardBody>
          </Card>
          <ModalFormE visible={this.state.modal}/>
        </Container>
      </Layout>
    );
  }
}