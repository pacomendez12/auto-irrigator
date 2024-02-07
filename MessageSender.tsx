import { Characteristic } from "react-native-ble-plx";
import { Buffer } from "buffer";

const CUSTOM_SERVICE_UUID = "0000ffe0-0000-1000-8000-00805f9b34fb";

const MESSAGE_CHUNK_SIZE = 20;

export function sendMessage(characteristic: Characteristic, message: String) {
    const bufferSize = message.length;
    const bufferSizeMessage = Buffer.from(String(bufferSize), "utf-8").toString(
      "base64"
    );
  
    characteristic.writeWithoutResponse(bufferSizeMessage);
  
    let i = 0;
    for (let i = 0; i < Math.ceil(bufferSize / MESSAGE_CHUNK_SIZE); i++) {
      const start = i * MESSAGE_CHUNK_SIZE;
      const end =
        i * MESSAGE_CHUNK_SIZE <= bufferSize
          ? (i + 1) * MESSAGE_CHUNK_SIZE
          : bufferSize;
  
      const subMsg = message.substring(start, end);
  
      characteristic.writeWithoutResponse(
        Buffer.from(String(subMsg), "utf-8").toString("base64")
      );
    }
  }