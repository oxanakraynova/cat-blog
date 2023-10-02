import image1 from "../../assets/2607fadb2240e0db3fd65ff4d4b9a67d.jpeg";
import image2 from "../../assets/15109c29de0f5505d2713378039eafd2.jpeg";
import image3 from "../../assets/f5090801b4d3590a9443876369a3d5b1.jpeg";
import image4 from "../../assets/c1912bb9419893bb6eddb1add9082b38.jpeg";
import image5 from "../../assets/2b9bc4ed188b8163268c826fc81fd8ff.jpeg";

export default function getImageByFilename(filename: string) {
  switch (filename) {
    case "2607fadb2240e0db3fd65ff4d4b9a67d.jpeg":
      return image1;
    case "15109c29de0f5505d2713378039eafd2.jpeg":
      return image2;
    case "f5090801b4d3590a9443876369a3d5b1.jpeg":
      return image3;
    case "c1912bb9419893bb6eddb1add9082b38.jpeg":
      return image4;
    case "2b9bc4ed188b8163268c826fc81fd8ff.jpeg":
      return image5;
    default:
      return undefined;
  }
}
