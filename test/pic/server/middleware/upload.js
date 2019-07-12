const multer = require("koa-multer");
const path = require("path");

const upload = multer({
  storage: multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, "./uploads/");
    },
    filename: function(req, file, callback) {
      callback(null, file.originalname);
    }
  }),
  fileFilter: function(req, file, cb) {
    console.log(file);
    const extension = path.extname(file.originalname).toLowerCase();
    const mimetyp = file.mimetype;
    var extensions = [".jpg", ".jpeg", ".png"];
    var mimetyps = ["image/png", "image/jpg", "image/jpeg"];
    if (extensions.includes(extension) && mimetyps.includes(mimetyp)) {
      cb(null, true);
    } else {
      cb("文件类型有误", false);
      //   cb(new Error("文件类型错误"));
    }
  }
}).array("file", 1);

// 上传图片中间件
module.exports = async (ctx, next) => {
  console.log(upload.toString());
  /**
   * 这里是关键，在multer中，这里的写法是upload(req,res,(err)=>{}
   * 但是这是koa-multer,是promise函数，所以一定要如下写法
   * 我通过console.log(upload.toString())发现问题所在的。
   * (ctx, next) => {
      return new Promise((resolve, reject) => {
        middleware(ctx.req, ctx.res, (err) => {
          err ? reject(err) : resolve(ctx)
        })
      }).then(next)
      注意这里执行next，所以无须手动在写next()
    }
   */
  await upload(ctx, next).then(
    async ctx => {
      // 这里无需await next();
      //   await next();
    },
    err => {
      console.log(err);
      ctx.body = {
        message: "上传失败"
      };
    }
  );
};
