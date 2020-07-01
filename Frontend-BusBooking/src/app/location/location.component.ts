import { Component, OnInit, AfterContentInit } from '@angular/core';
import { LocationService } from '../service/location.service';
import { NzModalService } from 'ng-zorro-antd';
import { CommonService } from '../service/common/common.service';
import { tileLayer, latLng, Map, marker, icon, polyline, point, LeafletMouseEvent, Marker } from 'leaflet';
import * as L from 'leaflet';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit, AfterContentInit {
  isVisible = false;
  isLoading = true;
  isLoaded = false;
  title = '';
  isView = false;
  Id;
  map;
  latLng = [];
  mapCenter = latLng([21.091707504725257, 105.77749907970428]);
  streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: 'ThanhNNT'
  });
  wMaps = tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: 'ThanhNNT'
  });

  // Marker for the top of Mt. Ranier
  summit = marker([46.8523, -121.7603], {
    icon: icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/marker-icon.png',

    })
  });

  // Marker for the parking lot at the base of Mt. Ranier trails
  paradise = marker([46.78465227596462, -121.74141269177198], {
    icon: icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/marker-icon.png',
      shadowUrl: 'assets/marker-shadow.png'
    })
  });

  // Path from paradise to summit - most points omitted from this example for brevity
  route = polyline([[46.78465227596462, -121.74141269177198],
  [46.80047278292477, -121.73470708541572],
  [46.815471360459924, -121.72521826811135],
  [46.8360239546746, -121.7323131300509],
  [46.844306448474526, -121.73327445052564],
  [46.84979408048093, -121.74325201660395],
  [46.853193528950214, -121.74823296256363],
  [46.85322881676257, -121.74843915738165],
  [46.85119913890958, -121.7519719619304],
  [46.85103829018772, -121.7542376741767],
  [46.85101557523012, -121.75431755371392],
  [46.85140013694763, -121.75727385096252],
  [46.8525277543813, -121.75995212048292],
  [46.85290292836726, -121.76049157977104],
  [46.8528160918504, -121.76042997278273]]);

  // Layers control object with our two base layers and the three overlay layers
  layersControl = {
    baseLayers: {
      'Street Maps': this.streetMaps,
      'Wikimedia Maps': this.wMaps
    },
    overlays: {
      'Mt. Rainier Summit': this.summit,
      'Mt. Rainier Paradise Start': this.paradise,
      'Mt. Rainier Climb Route': this.route
    }
  };

  layers = [

    marker([21.091707504725257, 105.77749907970428])
  ];

  // Set the initial set of displayed layers (we could also use the leafletLayers input binding for this)
  options = {
    layers: [this.streetMaps, this.route, this.summit, this.paradise],
    zoom: 3
  };

  dataSource = [];
  location: { latitude: number, longitude: number };
  constructor(public commonService: CommonService,
              private locateSvc: LocationService,
              private modal: NzModalService) {
    commonService.routerTitle = [
      { title: 'Home', url: '' },
      { title: 'Locate Manager', url: '' },
    ];
    commonService.title = 'Locate Manager';
  }

  ngAfterContentInit(): void {

  }

  ngOnInit(): void {
    this.loadData();

    this.location = {
      latitude: -28.68352,
      longitude: -147.20785
    };
  }


  async loadData() {
    const data = await this.locateSvc.getAll();
    console.log(data);
    this.dataSource = data;
    this.isLoading = false;
  }

  Edit(data) {
    this.isView = false;
    this.isVisible = true;
    this.title = data.Name;
    this.Id = data.Id;
    this.isLoaded = true;
    const lat = data.Locate.split(',');
    setTimeout(() => {
      this.map.invalidateSize();
      setTimeout(() => {
        this.layers = [

          marker([ parseFloat(lat[0]) , parseFloat(lat[1])])
        ];
        this.mapCenter = latLng([ parseFloat(lat[0]) , parseFloat(lat[1])]);
      });
    }, 0);
    // marker([21.091707504725257, 105.77749907970428]), marker([41.091707504725257, 105.77749907970428])
  }

  addData() {
    this.mapCenter = latLng([21.091707504725257, 105.77749907970428]);
    this.Id = null;
    this.isVisible = true;
    this.title = '';
    this.Id = undefined;
    this.isView = false;
    setTimeout(() => {
      this.map.invalidateSize();
      setTimeout(() => {
        this.layers = [ ];
      });
    });
  }
  viewMap(data) {
    this.isView = true;
    this.isVisible = true;
    const lat = data.Locate.split(',');
    this.title = data.Name;
    setTimeout(() => {
      this.map.invalidateSize();
      setTimeout(() => {
        this.layers = [

          marker([ parseFloat(lat[0]) , parseFloat(lat[1])])
        ];
        this.mapCenter = latLng([ parseFloat(lat[0]) , parseFloat(lat[1])]);
      });
    }, 0);
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  async submitForm() {
    if (this.title && this.latLng.length > 0) {
      const data = { Name: this.title, Locate: this.latLng.join(',')};
      console.log(data);
      await this.locateSvc.saveItem(data, this.Id);
      this.isVisible = false;
      this.loadData();
    }
  }

  showDeleteConfirm(id): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this type?',
      nzContent: '<b style="color: red;"></b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: async () => {
        this.isLoading = true;
        await this.locateSvc.deleteItem(id);
        this.loadData();
      },
      nzCancelText: 'No',
      nzOnCancel: () => { },
    });
  }
  onMapReady(map: Map) {

    this.map = map;
    console.log(map);

    // map = L.map('map').setView([46.879966, -121.726909], 7);
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //       attribution:
    //         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    // }).addTo(this.map);
    // this.map = map;
    // this.layers = [

    //   marker([21.091707504725257, 105.77749907970428]), marker([41.091707504725257, 105.77749907970428])
    // ];
  }

  onMapdoubleClick(map) {
    console.log(map);

  }
  onMapClick(map: LeafletMouseEvent) {
    console.log(map);
    this.layers = [
      marker([map.latlng.lat, map.latlng.lng])
    ];
    this.latLng = [map.latlng.lat, map.latlng.lng];
    this.mapCenter = map.latlng;
  }
}
