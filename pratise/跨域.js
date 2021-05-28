CORS

过滤掉option

简单请求
- 请求方式：GET、POST、HEAD
- HTTP头部信息不超过一下几种字段：无自定义头部字段、Accept、Accept-Language、Content-Language、Last-Event-ID、Content-Type（只有三个值application/x-www-form-urlencoded、multipart/form-data、text/plain


请求方式：PUT、DELETE
自定义头部字段
发送json格式数据
正式通信之前，浏览器会先发送OPTION请求，进行预检，这一次的请求称为“预检请求”
服务器成功响应预检请求后，才会发送真正的请求，并且携带真实数据
