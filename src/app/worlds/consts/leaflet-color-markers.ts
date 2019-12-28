import * as L from 'leaflet';

// https://github.com/pointhi/leaflet-color-markers/releases/tag/v1.0.0

interface BasicProps {
  shadowUrl: string;
  iconSize: [number, number];
  iconAnchor: [number, number];
  popupAnchor: [number, number];
  shadowSize: [number, number];
}

const basicProps: BasicProps = {
  shadowUrl: 'assets/markers-icon/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
};

export const blueIcon = new L.Icon({
  iconUrl: 'assets/markers-icon/marker-icon-2x-blue.png',
  ...basicProps
});

export const redIcon = new L.Icon({
  iconUrl: 'assets/markers-icon/marker-icon-2x-red.png',
  ...basicProps
});

export const greenIcon = new L.Icon({
  iconUrl: 'assets/markers-icon/marker-icon-2x-green.png',
  ...basicProps
});

export const orangeIcon = new L.Icon({
  iconUrl: 'assets/markers-icon/marker-icon-2x-orange.png',
  ...basicProps
});

export const yellowIcon = new L.Icon({
  iconUrl: 'assets/markers-icon/marker-icon-2x-yellow.png',
  ...basicProps
});

export const violetIcon = new L.Icon({
  iconUrl: 'assets/markers-icon/marker-icon-2x-violet.png',
  ...basicProps
});

export const greyIcon = new L.Icon({
  iconUrl: 'assets/markers-icon/marker-icon-2x-grey.png',
  ...basicProps
});

export const blackIcon = new L.Icon({
  iconUrl: 'assets/markers-icon/marker-icon-2x-black.png',
  ...basicProps
});
