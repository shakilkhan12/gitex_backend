interface ParkCombine {
  latitude: string;
  longitude: string;
  createdAt: string;
  updatedAt: string;
}
export interface ParkType extends ParkCombine {
  park_Id: string;
  english_name: string;
  arabic_name: string;
  image: string;
  location: string;
}
export interface ParkZone extends ParkCombine {
  park_Id: number;
  zone_english_name: string;
  zone_arabic_name: string;
  zone_Id: string;
  device_ip: string;
  web_api: string;
  status: string;
}

export interface SettingTypes {
  stream_url?: string;
  stream_api_key?: string;
  stream_path?: string;
  password?:string;
}
export interface SettingInputTypes extends SettingTypes {
     camera_Id: string;
}
export interface ParkCamera extends ParkCombine, SettingTypes{
  park_Id: number;
  camera_Id: string;
  camera_english_name: string;
  camera_arabic_name: string;
  ip_address: string;
  last_active_date: Date,
  last_active_time: string;
  status: string;
  attendance?: boolean|undefined;
  footfall?: boolean | undefined;
  behaviour?:boolean | undefined;
  behaviour_alerts?: boolean | undefined;
  irrigation?:boolean | undefined;
  landscapping?:boolean | undefined;
  litter_detection?:boolean | undefined;
  intrusion?:boolean | undefined;
  smooking_detection?:boolean | undefined;
}
export interface OfficeType extends ParkCombine {
  office_Id: string;
  office_english_name?:string;
  office_arabic_name?:string;
  image?:string;
}
export interface OfficeCamera extends ParkCombine {
  office_Id: number;
  camera_Id: string;
  camera_english_name?: string;
  camera_arabic_name?: string;
  ip_address?: string;
  last_active_date?: Date,
  last_active_time?: string;
  status?:string;

}

