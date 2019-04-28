demo1:

开两个窗口 一个运行server.js, 另一个运行client.js

如果采用protobufjs 操作.proto文件
版本要安装5.0.1版本，新版的protoBuf.loadProtoFile 会报错
不过这种方法直接加载.proto文件的方法并不建议，会直接暴露.proto文件


demo2:
定义一个.proto文件
address.proto文件
syntax = "proto2";

message Address
{
  required string province  = 1;
  required string city = 2;
  required string county = 3;
}


编译生成访问类文件
运行下面的命令

protoc --js_out=import_style=commonjs,binary:. address.proto
会当前目录生成

address_pb.js
其中的--js_out的语法如下：

--js_out=[OPTIONS:]output_dir
如上面的例子中的option为 import_style=commonjs,binary， "."为生成文件的目录，这里为当前目录


打包为web可用的js文件

安装库文件的引用库

npm install -g browserify
安装protobuf的库文件

npm install google-protobuf
打包js文件export.js

var address = require('./address_pb');
module.exports = {
  DataProto: address
}
编译生成可用js文件

browserify exports.js -o  address_main.js
API
普通类型字段（required/optional）

get{FIELD}() // return field value

set{FIELD}(value) // set field value to value

clear{FIELD}(value) // clear filed value

数组类型字段操作（repeated）

add{FIELD}(value) // add one value to field 

clear{FIELD}List() // clear filed 

get{FIELD}List() // return array of field values 

setInterestList(array)// set array 

序列化/反序列化

serializeBinary() // 序列化 

deserializeBinary(bin) // 反序列化（静态方法） 

调试

toObject() // 打印数据 

使用
<html>  
  <head>  
    <script type="text/javascript" src="address_main.js"></script> 
  </head>
  <body>
    protobuf
  </body>
    <script type="text/javascript">
      var address1 = new proto.Address();
      address1.setProvince("北京");
      address1.setCity("北京");
      address1.setCountry("海淀");
      console.log(address1.toObject());
    </script>
</html>