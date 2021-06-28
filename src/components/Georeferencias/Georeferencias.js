import React, { Component } from 'react';
// import from './';
import {
  Card, CardImg, CardBody,
  CardTitle, CardSubtitle, Button,
  Form, FormGroup, Label, Input,
  Container, Spinner 
} from 'reactstrap';
import { Layout } from '../Commons/Layout';
import {SingleMap} from './SingleMap';

export class Georeferencias extends Component {
  constructor(props) {
    super(props);
    this.state = { georefs:[] };
    if (localStorage.getItem("session") === null) {
        window.location.href = "/";
    }
  }    
    render () {
      return (
        <Layout>
          <Container>
            <Card>
            {/* <CardImg top width="100%" src="" alt="Logo" /> */}
                <CardBody>
                    <CardTitle tag="h5">Georeferencias</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted"></CardSubtitle>
                    <SingleMap refs={this.state.georefs} />
                </CardBody>
            </Card>
          </Container>
        </Layout>
      );
    }
  }