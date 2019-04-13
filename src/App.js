import React, { Component } from 'react';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import './App.css';
import $ from "jquery";
import {Navbar, Card, NavbarBrand, Badge} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Highcharts from 'highcharts';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category : [],
      data : []
    }
  }
  
  galleryItems = () => {
    let url = '';
    return (
      ['USD', 'JPY', 'BGN', 'CZK', 'DKK', 'GBP', 'HUF', 'PLN', 'RON', 'SEK', 'CHF', 'ISK', 'NOK', 'HRK', 'RUB'].map((item, i) => (
        <div style={{'padding': '20px'}}>
        <Card onClick = {this.getData.bind(this, item)} style={{'backgroundImage': `url(https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.1/flags/1x1/${(item.slice(0,2)).toLowerCase()}.svg)`, 'width': '120px', 'height': '70px'}} body>
        </Card>
        </div>
      ))
    )
  }

  responsive = {
    0: { items: 3 },
    600: { items: 6 },
    1024: { items: 8 },
  };

  componentDidMount = () => {
    this.getData();
  }

  getData = (base = 'USD') => {
    let category = [];
    let data = [];
    // get the most recent exchange rates via the "live" endpoint:
    $.ajax({
        url: `https://api.exchangeratesapi.io/latest?base=${base}`,
        success: (json) => {
            Object.keys(json.rates).forEach(function(index) {
              category.push(index);
              data.push(json.rates[index]);
            });
            this.setState({
              category : category,
              data : data
            });
            console.log(this.state);
            this.highchartRender();
        }
    }); 
  }

  highchartRender = () => {
    Highcharts.chart('container', {
      title: {
          text: 'Solar Employment Growth by Sector, 2010-2016'
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: this.state.category  
      },
      yAxis: {
          title: {
              text: 'hell'
          }
      },
      plotOptions: {
          series: {
              label: {
                  connectorAllowed: false
              }
          }
      },
  
      series: [{
          showInLegend: false,   
          data: this.state.data
        }],
  
      responsive: {
          rules: [{
              condition: {
                  maxWidth: 500
              }
          }]
      }});
  }


  render() {
    const items = this.galleryItems();
    return (
      <div>
        
        <Navbar light expand="md" style={{'backgroundColor': '#9D9D9D'}}>
          <NavbarBrand href="/" className="mr-auto">Cryto</NavbarBrand>
        </Navbar>
        <AliceCarousel
        items={items}
        duration={400}
        autoPlay={true}
        startIndex = {1}
        fadeOutAnimation={true}
        mouseDragEnabled={true}
        autoPlayInterval={2000}
        autoPlayDirection="rtl"
        responsive={this.responsive}
        disableAutoPlayOnAction={false}
      />
      <div style={{'padding': '20px'}}>
        <Card body>
          <div id="container"></div>
        </Card>
      </div>
      </div>
    );
  }
}

export default App;
