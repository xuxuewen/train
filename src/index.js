import {MimeType,BosClient,HttpClient} from '@baiducloud/sdk/dist/baidubce-sdk.bundle';

let default_doRequest = HttpClient.prototype._doRequest;

HttpClient.prototype._doRequest = function(options, body, outputStream){
    options.withCredentials = false;
    return default_doRequest.call(this,options, body, outputStream);
}
import axios from 'axios';

function getSts(){
  axios.get('/api/bos/sts')
  .then(({data})=>{
    // 配置 bosConfig
    let bosConfig = {
      endpoint   : data.endpoint,
      credentials: {
        ak: data.ak,   // STS服务器下发的临时ak
        sk: data.sk,   // STS服务器下发的临时sk
      },
      sessionToken: data.sessionToken,   // STS服务器下发的sessionToken
      
    };
    const client        = new BosClient(bosConfig);
          client.bucket = data.bucket;
    uploadChange(client);

  })
  .catch(error=>{

  })
}
getSts();


function uploadChange(client){

  $('#upload').on('change', function (evt) {
    var file = evt.target.files[0];  // 获取要上传的文件
    var key  = file.name;            // 保存到bos时的key，您可更改，默认以文件名作为key
    var blob = file;
  
    var ext      = key.split(/\./g).pop();
    var mimeType = MimeType.guess(ext);
    if (/^text\//.test(mimeType)) {
        mimeType += '; charset=UTF-8';
    }
    var options = {
        headers:{
          'Content-Type': mimeType
        }
    };
    client.putObject(client.bucket, key, blob,options)
      .then(function (res) {

        // 访问路径 
        console.log(res);// 这个res，啥都没有
          // 上传完成，添加您的代码
          console.log('上传成功');
      })
      .catch(function (err) {
          // 上传失败，添加您的代码
          console.error(err);
      });
    // putObjectFromBlob 也是一样可以用
  });
  
}

