import { Sensor } from "./sensor";

export class Device {
  deviceId!: string;
  macAdress!: string;
  description!: string;
  lat!: number;
  lng!: number;
  nom!: string;
  active!: boolean;
  idAdmin!: string;
  sensorList !: Array<string> ; 
}
