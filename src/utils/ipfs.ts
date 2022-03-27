import { create } from "ipfs-http-client";
import { v4 as uuidv4 } from "uuid";
import * as IPFS from "ipfs-core";

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

export const uploadIpfs = async (content:string, file:any) => {
  const result = await client.add(
    file ? 
      JSON.stringify({
        version: '1.0.0',
        metadata_id: uuidv4(),
        description: file,
        content: content,
        external_url: null,
        image: file,
        imageMimeType: null,
        name: "d",
        attributes: [],
        media: [],
        appId: 'owleee',
      }) : 
        JSON.stringify({
          version: '1.0.0',
          metadata_id: uuidv4(),
          description: '',
          content: content,
          external_url: null,
          image: "https://assets-global.website-files.com/5c38aa850637d1e7198ea850/5f4e173f16b537984687e39e_AAVE%20ARTICLE%20website%20main%201600x800.png",
          imageMimeType: null,
          name: 'Rohitt',
          attributes: [],
          media: [
            // {
            //   item: 'https://scx2.b-cdn.net/gfx/news/hires/2018/lion.jpg',
            //   // item: 'https://assets-global.website-files.com/5c38aa850637d1e7198ea850/5f4e173f16b537984687e39e_AAVE%20ARTICLE%20website%20main%201600x800.png',
            //   type: 'image/jpeg',
            // },
          ],
          appId: 'owleee',
        })
  );

  console.log("upload result ipfs", result);
  return result;
};
