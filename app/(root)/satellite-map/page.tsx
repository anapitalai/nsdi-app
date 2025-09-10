import { getAllSpatials } from "@/lib/actions/spatial.actions";
import SatelliteMapClient from "./SatelliteMapClient";

export default async function SatelliteMapPage() {
  const spatials = await getAllSpatials();
  return <SatelliteMapClient spatials={spatials} />;
}