import esriRequest from 'esri/request';
import {urls} from 'js/config';

export default {

  /**
  * @param {string} appid - Application Id or Webmap Id to get info about
  */
  getItemInfo: appid => {
    return esriRequest(urls.itemInfo(appid), {
      responseType: 'json'
    });
  }

};
