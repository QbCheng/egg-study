坑爹集
1.所有的model文件会挂载到app.model.*** 和 ctx.model.***上 但是不知道处于什么原因，模型在挂载之后，他的模型名和我们定义的模型名会发生变化，
注，所有下划线形式的模型名，都会转化为大驼峰形象.请注意

2.分文件加载模型时，也是，所有加载到model上的模型路径，都是大驼峰命名方式

3.在使用关联时，注意一个问题
1.