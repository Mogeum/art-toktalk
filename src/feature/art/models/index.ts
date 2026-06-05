import {Tag} from "@/src/feature/tag/models";
import {HotSpot} from "@/src/feature/hotSpot/models";

export interface Art {
  id: number;
  artist: string;
  title: string;
  year: number;
  description: string;
  imageUrl: string;
  location: string;
  hotspots:HotSpot[];
  medium: string;
  dimensions: string;
  tags: Tag[];
}
