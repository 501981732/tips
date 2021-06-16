3.js
============= 微服务 ========

1、Faas + Baas，云函数，根据计算量、调用量计费
2、后端资源，API方式调用
3、问题：
多个商家差异化
开发、调试不方便
服务治理，修改之后的回归


============= 协议 ===========

1、http1 和 http2 
多路复用、头部压缩、

2、http 和 https
Https多了一层SSL，利用非对称加密，

客户端发送支持的加密算法
服务端下发公钥
客户端接收认证
然后用公钥加密会话秘钥（随机数1+随机数2+预主密钥），然后发给服务端
服务端用自己私钥解密，得到会话秘钥
然后双方互相发送加密信息，然后建立SSL成功


https://blog.csdn.net/xiaoming100001/article/details/81109617

============= 缓存 ===========

1、前端缓存
内存
Cookie 
localStorage
sessionStorage

2、http缓存
强缓存 cache-control 
Max-age、public、no-cache

协商缓存 last-modify、e-tag

https://blog.csdn.net/atty_ping/article/details/109839541

3、数据
redis
Memcache