import React, { Component } from 'react';
import axios from 'axios';
import {
  Card, CardBody,
  CardTitle, CardSubtitle, Button,
  Container 
} from 'reactstrap';
import { Layout } from '../Commons/Layout';
import {SingleMap} from '../Georeferencias/SingleMap';
import {ModalFormU} from './ModalFormU';
import {DataTableUsers} from './DataTableUsers';

export class IndexUsuarios extends Component {
    static modal = IndexUsuarios.modal;
    constructor(props) {
        super(props);
        this.state = { visible:false };
        if (localStorage.getItem("session") === null) {
            window.location.href = "/";
        }
        // this.toggle = this.toggle.bind(this);
    }
  
    render () {
        return (
        <Layout>
            <Container>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Usuarios</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted"></CardSubtitle>
                    <ModalFormU/>
                    <DataTableUsers/>
                </CardBody>
            </Card>
            </Container>
        </Layout>
        );
    }
}