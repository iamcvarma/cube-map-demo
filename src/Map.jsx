import { map } from "leaflet";
import React,{useState,useRef} from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import domtoimage from 'dom-to-image';
import Cube from "./Cube";

const Map = () => {
  const mapRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);
  console.log(imageUrl)
  const handleCapture = () => {
    const node = mapRef.current.getContainer();
    domtoimage.toPng(node).then((dataUrl) => {
      setImageUrl(dataUrl);
    }).catch((error) => {
      console.error('Error capturing screenshot:', error);
    });
  };
  return (
    <div className="map-container">
      <div className="map-box">

      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        zoomControl={false}
        style={{ width: "500px", height: "500px" }}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      <button onClick={handleCapture}>Capture Map Image</button>
      </div>
      {imageUrl && <img src={imageUrl} width={300} height={300} />}
      {imageUrl && <div><Cube  texture={imageUrl}/></div>}
    </div>
  );
};

export default Map;
