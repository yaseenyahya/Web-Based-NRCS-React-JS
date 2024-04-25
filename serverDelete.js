const proxy = require("http-proxy-middleware");
const conf = require("./src/conf.json");
module.exports =  function (app) {
  app.use(
    proxy("/login", {
      target: conf.AXONSERVICE,
      changeOrigin: true,
    })
  );

  app.use(
    proxy("/getUploadID", {
      target: conf.AAJEPES,
      secure: false,
      changeOrigin: true,
    })
  );

  app.use(
    proxy("/registerUserAxonMobile", {
      target: conf.AAJEPES,
      secure: false,
      changeOrigin: true,
    })
  );

  app.use(
    proxy("/data", {
      target: conf.AXONSERVICE,
      secure: false,
      changeOrigin: true,
    })
  );
  app.use(
    proxy("/dataarchive", {
      target: conf.AXONSERVICE,
      secure: false,
      changeOrigin: true,
    })
  );
  app.use(
    proxy("/rundowndata", {
      target: conf.AXONSERVICE,
      secure: false,
      changeOrigin: true,
    })
  );
  app.use(
    proxy("/searchrundowndata", {
      target: conf.AXONSERVICE,
      secure: false,
      changeOrigin: true,
    })
  );
  app.use(
    proxy("/rundownarchivedata", {
      target: conf.AXONSERVICE,
      secure: false,
      changeOrigin: true,
    })
  );
  app.use(
    proxy("/searchrundownarchivedata", {
      target: conf.AXONSERVICE,
      secure: false,
      changeOrigin: true,
    })
  );
  app.use(
    proxy("/modwithreaddetails", {
      target: conf.AXONSERVICE,
      secure: false,
      changeOrigin: true,
    })
  );
  app.use(
    proxy("/reportsopper", {
      target: conf.AXONSERVICE,
      secure: false,
      changeOrigin: true,
    })
  );
  app.use(
    proxy("/changepassword", {
      target: conf.AXONSERVICE,
      secure: false,
      changeOrigin: true,
    })
  );
  app.use(
    proxy("/havesopper", {
      target: conf.AXONSERVICE,
      secure: false,
      changeOrigin: true,
    })
  );
  app.use(
    proxy("/getrundownandinfobyid", {
      target: conf.AXONSERVICE,
      secure: false,
      changeOrigin: true,
    })
  );
  app.use(
    proxy("/rundownsopper", {
      target: conf.AXONSERVICE,
      secure: false,
      changeOrigin: true,
    })
  );
  app.use(
    proxy("/rundownmoddetails", {
      target: conf.AXONSERVICE,
      secure: false,
      changeOrigin: true,
    })
  );
  app.use(
    proxy("/addnewreport", {
      target: conf.AXONSERVICE,
      secure: false,
      changeOrigin: true,
    })
  );
  app.use(
    proxy("/updateReport", {
      target: conf.AXONSERVICE,
      secure: false,
      changeOrigin: true,
    })
  );
  app.use(
    proxy("/deleteReport", {
      target: conf.AXONSERVICE,
      secure: false,
      changeOrigin: true,
    })
  );
  app.use(
    proxy("/getSwitchAccountUsers", {
      target: conf.AXONSERVICE,
      secure: false,
      changeOrigin: true,
    })
  );
}
