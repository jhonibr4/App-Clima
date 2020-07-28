import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import moment from 'moment';
import axios from 'axios';

//Estilização
import style from './style';

//Imagens
import Fundo from './assets/fundo.jpg'
import Sol from './assets/sol.png'
import ChuvaForte from './assets/chuvaforte.png'
import Tempestade from './assets/tempestade.png'
import CeuFechado from './assets/ceufechado.png'
import Chuva from './assets/chuva.png'
import Neve from './assets/neve.png'
import Nublado from './assets/nublado.png'
import Neblina from './assets/neblina.png'
import Nuvens from './assets/nuvens.png'



export default class AppClima extends Component {

  state = {
    latitude: null,
    longitude: null,
    data: '',
    cidade: '',
    kelvin_max: 0,
    kelvin_min: 0,
    kelvin_temp: 0,
    kelvin_sens: 0,
    temp_max: 0,
    temp_min: 0,
    temp: 0,
    temp_sens: 0,
    descricao: '',
    pais: '',
  }

  carregarGeolocal = async () => {
    this.setState({ latitude: 0, longitude: 0 })
    Geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {

        var response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=2f4397adbed9a6036f0fe0a4cd6674f7`)
        this.setState({
          latitude: latitude,
          longitude: longitude,
          cidade: response.data.name,
          kelvin_max: response.data.main.temp_max,
          kelvin_min: response.data.main.temp_min,
          kelvin_temp: response.data.main.temp,
          kelvin_sens: response.data.main.feels_like,
          descricao: response.data.weather[0].description,
          pais: response.data.sys.country,


        })
        var result_tempmax = this.state.kelvin_max - 273;
        var result_tempmin = this.state.kelvin_min - 273;
        var result_temp = this.state.kelvin_temp - 273;
        var result_sens = this.state.kelvin_sens - 273;
        this.setState({
          temp_max: Math.round(result_tempmax),
          temp_min: Math.round(result_tempmin),
          temp: Math.round(result_temp),
          temp_sens: Math.round(result_sens)
        })
      },
      () => {
        Alert.alert(
          "Erro",
          "Ocorreu algum erro na localização de seu dispositivo, Tente Novamente!",
          [
            { text: 'Ok', onPress: () => console.log('Fechar') }
          ]
        )
      },
      {
        enableHighAccuracy: true,
        timeout: 2000,
        
      }

    );
    var that = this;
    var data = moment()
      .format('DD/MM/YYYY');

    that.setState({ data: data });

  }

  async componentDidMount() {
    this.carregarGeolocal();
  }

  MostrarIcone = () => {
    if (this.state.descricao === 'clear sky') {

      return <Image source={Sol} style={{ width: 45, height: 45 }} />
    }
    else if (this.state.descricao === 'overcast clouds') {
      return <Image source={Nublado} style={{ width: 45, height: 45 }} />
    }
    else if (this.state.descricao === 'few clouds') {
      return <Image source={CeuFechado} style={{ width: 45, height: 45 }} />
    }
    else if (this.state.descricao === 'drizzle' || 'shower rain') {
      return <Image source={Chuva} style={{ width: 45, height: 45 }} />
    }
    else if (this.state.descricao === 'rain') {
      return <Image source={ChuvaForte} style={{ width: 45, height: 45 }} />
    }
    else if (this.state.descricao === 'thunderstorm') {
      return <Image source={Tempestade} style={{ width: 45, height: 45 }} />
    }
    else if (this.state.descricao === 'snow') {
      return <Image source={Neve} style={{ width: 45, height: 45 }} />
    }
    else if (this.state.descricao === 'scattered clouds') {
      return <Image source={Nuvens} style={{ width: 45, height: 45 }} />


    }
    else {
      return <Image source={Neblina} style={{ width: 45, height: 45 }} />
    }

  }
  render() {

    return (
      <ImageBackground source={Fundo} style={style.container}>

        <Text style={style.titulo}>App Clima</Text>

        <View style={style.viewTemp}>

          <View style={{ alignItems: 'center' }}>
            <Text style={style.textTop}>{this.state.cidade}, {this.state.pais}</Text>
            <Text style={{ color: '#FFF', marginBottom: 5 }}>Data: {this.state.data}</Text>
          </View>
          <View style={style.lineTemp}>
            <Text style={style.temp}>{this.state.temp}º</Text>
            <View style={style.infoColunm}>
              <this.MostrarIcone />
              <Text style={style.tempMaxMin} >Max: {this.state.temp_max}º</Text>
              <Text style={style.tempMaxMin}>Min: {this.state.temp_min}º</Text>
            </View>
          </View>
          <Text style={style.textBottom}>Sensação: {this.state.temp_sens}º</Text>
        </View>
        <TouchableOpacity style={style.button} onPress={() => this.carregarGeolocal()}>
          <Text style={style.textButton}>Atualizar</Text>
        </TouchableOpacity>

      </ImageBackground>
    );
  }
}