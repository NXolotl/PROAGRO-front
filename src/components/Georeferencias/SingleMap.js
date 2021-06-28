import React, { Component }  from "react";
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import Marker from './Marker';
const Markup = ({ text }) => <div>{text}</div>;

export class SingleMap extends Component{
    constructor(props) {
        super(props);
        this.state = {georefs:[], coord: {}, defaultProps: {}, msg: ""};
        // this.getCoordinates = this.getCoordinates.bind(this);
      }

    // var Estado = this.state.coord.stateName;
  async getCoordinates(id){
    if (id !== null) {
      const res = await axios.get(`https://localhost:44362/api/Georeferencias/`+id);
      
      if (res.data.code !== 200) {
            this.setState({msg:res.data.message});
            return await [];
        }
        else if (res.data.code === 200) {
            return await res.data.value.georeferenciasC;
        }
        else{
            this.setState({msg:"Ocurrió un error inesperado"});
            return await [];
        }
    }
  }
  
componentDidMount() {
    if (this.state.georefs.length <= 0) {
        (async () => {
            try {
                this.setState({georefs: await this.getCoordinates(localStorage.getItem("permisos"))});

                this.setState({coord: this.state.georefs[0]})
                
                this.setState({
                    defaultProps: {
                        center: {
                            lat: this.state.coord.lat,
                            lng: this.state.coord.lng
                        },
                        zoom: 11
                    }
                });
            } catch (e) {
                console.log(e);
            }
        })();
    }
}

    render (){
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '100vh', width: '100%' }}>
                <span>Estado: {this.state.coord.stateName}</span><br/>
                <span>Latitud: {this.state.coord.lat}</span><br/>
                <span>Longitud: {this.state.coord.lng}</span><br/>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyBDaeWicvigtP9xPv919E-RNoxfvC-Hqik" }}
                    defaultCenter={this.state.defaultProps.center}
                    defaultZoom={this.state.defaultProps.zoom}
                >
                    <Marker key={this.state.coord.idCoordinate}
                        lat={this.state.coord.lat}
                        lng={this.state.coord.lng}
                        text = {this.state.coord.stateName}
                        />
                {/*
                    this.state.georefs.map(GeoRef => {
                        <Marker key={GeoRef.idCoordinate}
                        lat={GeoRef.lat}
                        lng={GeoRef.lng}
                        text = {GeoRef.stateName}
                        />
                    })
                */}
                </GoogleMapReact>
            </div>
        );
    }
}