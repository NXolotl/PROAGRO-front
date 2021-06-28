import React, { Component } from 'react';
import {Table, Button} from 'reactstrap';
import axios from 'axios';

export class DataTableUsers extends Component {
    constructor(props) {
        super(props);
        this.state = { rows: [] };
        // this.toggle = this.toggle.bind(this);
    }
    
    componentDidMount() {
        if (this.state.rows.length <= 0) {
            (async () => {
                try {
                    this.setState({rows: await this.getRowsData()});
                    // console.log(this.state.rows.length);
                } catch (e) {
                    console.log(e);
                }
            })();
        }
    }

    createRows(){
        return "<span>hello</span>"
    }

    async getRowsData(){
        const res = await axios.get(`https://localhost:44362/api/Usuarios`);
        if (res.data.length > 0) {
              return await res.data;
        }
        else{
            this.setState({msg:"Ocurrió un error inesperado"});
            return await [];
        }
    }
  
    render () {
        return (
            <Table>
                <thead>
                <tr>
                    <th style = {{display:"none"}}>#</th>
                    <th>Nombre</th>
                    <th>RFC</th>
                    <th>Fecha de nacimiento</th>
                    <th>Fecha del registro</th>
                    <th>Fecha de modificación</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                    {this.state.rows.map(user => {
                        if (true) { // skip the first element since it's already used above
                            return (
                                <tr>
                                    <td style = {{display:"none"}}>{user.id}</td>
                                    <td scope="row">{user.nombre}</td>
                                    <td>{user.rfc}</td>
                                    <td>{user.fechaNacimiento}</td>
                                    <td>{user.fechaCreacion}</td>
                                    <td>{user.fechaModificacion}</td>
                                    <tr>
                                        <Button color="primary" >Editar</Button> 
                                        <Button color="danger" >Eliminar</Button>
                                    </tr>
                                </tr>
                            )
                        }
                    })}
                </tbody>
            </Table>
        );
    }
}