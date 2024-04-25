import React from "react";
import Webcam from "react-webcam";
import {
  Box,
  Button,
  IconButton,
  useMediaQuery,
  Drawer,
  Slider,
  Typography,
} from "@material-ui/core";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import VideocamIcon from "@material-ui/icons/Videocam";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import FlashOffIcon from "@material-ui/icons/FlashOff";
import { setCameraModalToggle } from "../../store/actions/CameraModalActions";
import { connect } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import UploadGridList from "../UploadAttachmentsModal/UploadGridList";
import SwitchCameraIcon from "@material-ui/icons/SwitchCamera";
import StopIcon from "@material-ui/icons/Stop";
import clsx from "clsx";
import { useSnackbar } from "notistack";
import { UploadType } from "../mediaPlayerModal/UploadType";
import _ from "lodash";
import { addUploadAttachmentsModalFilesData } from "../../store/actions/UploadAttachmentsModalActions";
import { uploadFileStatusType } from "../UploadAttachmentsModal/uploadFileStatusType";
import UploadGridBox from "../UploadAttachmentsModal/UploadGridBox";
import includes from "../editorViewer/includes";
import { resolveSettings } from "../../auth/resolveSettings";
const useStyles = makeStyles((theme) => ({
  backButton: {
    position: "absolute",
    left: 0,
    padding: 0,
  },
  buttonDisabled: {
    pointerEvents: "auto!important",
    cursor: "not-allowed!important",
    color: "#b9b9b9",
  },
  backButtonIcon: {
    fontSize: 50,
    color: "white",
  },
  uploadDrawerToggleButton: {
    position: "absolute",
    right: 0,
    padding: 0,
    height: 40,
  },
  uploadDrawerToggleButtonIcon: {
    fontSize: 80,
    color: "white",
  },
  bottomOptionsContainer: {
    position: "absolute",
    width: "100%",
    height: 100,
    display: "flex",
    bottom: 0,
    background: "#00000099",
  },
  bottomCameraButtonsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  pictureVideoCaptureButton: {
    border: "3px solid white",
    borderRadius: 200,
    padding: 0,
    minWidth: "auto",
  },
  pictureVideoCaptureButtonIcon: {
    fontSize: 50,
    color: "white",
    padding: 8,
  },
  pictureVideoToggleButton: {
    border: "3px solid white",
    borderRadius: 200,
    padding: 0,
    minWidth: "auto",
    margin: "27px 0 0px 5px",
  },
  pictureVideoToggleButtonIcon: {
    fontSize: 20,
    color: "white",
    padding: 8,
  },
  uploadListDrawer: {
    background: "#fdfdfd38",
    minHeight: 200,
  },
  zoomSlider: {
    height: "200px!important",
    position: "absolute",
    top: "30%",
    left: 10,
  },
  zoomSliderRail: {
    width: "6px!important",
  },
  zoomSliderTrack: {},
  zoomSliderThumb: {
    width: "25px!important",
    height: "25px!important",
    marginLeft: "-9px!important",
  },
  flashToggleButton: {
    margin: "auto",
    display: "block",
    padding: 6,
  },
  flashToggleButtonIcon: {
    fontSize: 30,
    color: "white",
  },
  bottomCameraFlashFaceSwitchContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  cameraSwitchButton: {
    margin: "auto",
    display: "block",
    padding: 6,
  },
  cameraSwitchButtonIcon: {
    fontSize: 30,
    color: "white",
  },
  showBusyStyles: {
    color: "red!important",
    borderColor: "red!important",
  },
  videoTimerText: {
    position: "absolute",
    color: "white",
    fontSize: 23,
    background: "#000000bf",
    padding: "0 6px",
    right: 5,
    top: 61,
  },
  webCam: {
    minWidth: "100%",
    minHeight: "100%",
    width: "auto",
    height: "auto",
    objectFit: "cover",
  },
  bottomDownloadButtonsContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  lastCaptureFileSaveButton: {
    color: "white",
    background: "#48464699",
    borderRadius: 0,
    minHeight: "auto",
    padding: 2,
  },
  lastCaptureFilePreview: {
    width: 50,
    height: 50,
    border: "3px solid white",
    borderRadius: 50,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    background: "black",
    overflow: "hidden",
  },
  lastCaptureFilePreviewText: {
    color: "white",
    fontSize: 10,
    textAlign: "center",
  },
  lastCaptureFilePreviewImage: {
    width: "100%",
  },
  lastCaptureFilePreviewVideo: {
    width: "100%",
  },
  UploadGridBox: {
    top: 60,
    position: "absolute",
    width: 120,
    height: 100,
    right: 20,
    opacity: 0.6,
  },
}));
const Camera = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const { enqueueSnackbar } = useSnackbar();

  const webcamRef = React.useRef(null);

  const [toggleUploadListDrawer, setUploadListDrawer] = React.useState(false);
  const [flashButtonEnabled, setFlashButtonEnabled] = React.useState(false);
  const [flashValue, setFlashValue] = React.useState("off");

  const [zoomSliderEnabled, setZoomSliderEnabled] = React.useState(false);
  const [zoomSliderMin, setZoomSliderMin] = React.useState(0);
  const [zoomSliderMax, setZoomSliderMax] = React.useState(0);
  const [zoomSliderStep, setZoomSliderStep] = React.useState(0);
  const [zoomSliderValue, setZoomSliderValue] = React.useState(0);

  const [cameraSwitchDeviceId, setCameraSwitchDeviceId] = React.useState({});
  const [cameraSwitchDevices, setCameraSwitchDevices] = React.useState([]);

  const [cameraStatus, setCameraStatus] = React.useState("photo");

  const [lastCaptureBlob, setLastCaptureBlob] = React.useState(null);

  const [cameraDeviceIdIndex, setCameraDeviceIdIndex] = React.useState(0);

  const handleCameraSwitchDevices = React.useCallback(
    (cameraSwitchDevices) => {
      var cameraSwitchDevices_ = cameraSwitchDevices.filter(
        ({ kind, deviceId }) => kind === "videoinput" && deviceId != ""
      );
      setCameraSwitchDevices(
        cameraSwitchDevices_
      );

      setCameraSwitchDeviceId(cameraSwitchDevices_[cameraDeviceIdIndex].deviceId);
    },
    [setCameraSwitchDevices]
  );

  const [mediaVideoTrack, setMediaVideoTrack] = React.useState(null);

  const capturePicture = React.useCallback(async () => {
    setShowCameraBusyNotify(true);
    const imageSrc = webcamRef.current.getScreenshot();
    var blobImage = await (await fetch(imageSrc)).blob();
    var file = new File(
      [blobImage],
      "AxonMedia_" + Math.floor(Math.random() * 10000 + 1) + ".png",
      {
        type: "image/jpeg",
        lastModified: new Date(),
      }
    );
    setLastCaptureBlob(blobImage);
    var filesData = [
      {
        filename: file.name,
        fileForUpload: file,
        status: uploadFileStatusType.pending,
        type: UploadType.AXON,
      },
    ];
    props.addUploadAttachmentsModalFilesData(filesData, enqueueSnackbar);
    setShowCameraBusyNotify(false);
  }, [webcamRef]);

  React.useEffect(() => {

    navigator.mediaDevices.enumerateDevices().then(handleCameraSwitchDevices);
  }, [handleCameraSwitchDevices]);

  const handleWebCamUserMedia = async () => {
    const mediaVideoTrack_ = webcamRef.current.stream.getVideoTracks()[0];

    setMediaVideoTrack(mediaVideoTrack_);

    var imageCapture = new ImageCapture(mediaVideoTrack_);

imageCapture.getPhotoCapabilities().then((photoCapability) => {;
    //var mediaCapabilities = await navigator.mediaDevices.getSupportedConstraints();



    if (
      photoCapability.torch || photoCapability.fillLightMode
    )
      setFlashButtonEnabled(true);
    else setFlashButtonEnabled(false);

    const settings = mediaVideoTrack_.getSettings();

    const videoTrackCapabilities = mediaVideoTrack_.getCapabilities();
    //alert(videoTrackCapabilities.zoom.min)
   // alert(videoTrackCapabilities.zoom.max)
   // alert(videoTrackCapabilities.zoom.step)
   // alert(settings.zoom)
    if (videoTrackCapabilities.zoom) {
      setZoomSliderEnabled(true);

      setZoomSliderMin(videoTrackCapabilities.zoom.min);
      setZoomSliderMax(videoTrackCapabilities.zoom.max);
      setZoomSliderStep(videoTrackCapabilities.zoom.step);
      setZoomSliderValue(settings.zoom);
    } else {
      setZoomSliderEnabled(false);
    }
  });
  };
  const mediaRecorderRef = React.useRef(null);
  const videoRecordingInterval = React.useRef(null);
  const [videoCapturingElapsed, setVideoCapturingElapsed] = React.useState(0);

  const [videoCapturing, setVideoCapturing] = React.useState(false);

  const [showCameraBusyNotify, setShowCameraBusyNotify] = React.useState(false);

  const handleStartVideoClick = React.useCallback(() => {
    setVideoCapturing(true);
    setShowCameraBusyNotify(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleVideoDataAvailable
    );

    mediaRecorderRef.current.start();
    var tempVideoCapturingElapsed = videoCapturingElapsed;
    var tempShowCameraBusyNotify = showCameraBusyNotify;
    videoRecordingInterval.current = setInterval(() => {
      setVideoCapturingElapsed(tempVideoCapturingElapsed + 1);
      tempVideoCapturingElapsed = tempVideoCapturingElapsed + 1;
      setShowCameraBusyNotify(!tempShowCameraBusyNotify);
      tempShowCameraBusyNotify = !tempShowCameraBusyNotify;
    }, 1000);
  }, [
    webcamRef,
    setVideoCapturing,
    mediaRecorderRef,
    showCameraBusyNotify,
    setShowCameraBusyNotify,
  ]);
  const handleStopVideoClick = React.useCallback(() => {
    mediaRecorderRef.current.stop();
    clearInterval(videoRecordingInterval.current);
    setVideoCapturing(false);
    setVideoCapturingElapsed(0);
    setShowCameraBusyNotify(false);
  }, [mediaRecorderRef, webcamRef, setVideoCapturing]);
  const handleVideoDataAvailable = React.useCallback(({ data }) => {
    if (data.size > 0) {
      const blobVideo = new Blob([data], {
        type: "video/mp4",
      });
      var file = new File(
        [blobVideo],
        "AxonMedia_" + Math.floor(Math.random() * 10000 + 1) + ".png",
        {
          type: "video/mp4",
          lastModified: new Date(),
        }
      );

      setLastCaptureBlob(blobVideo);
      var filesData = [
        {
          filename: file.name,
          fileForUpload: file,
          status: uploadFileStatusType.pending,
          type: UploadType.AXON,
        },
      ];
      props.addUploadAttachmentsModalFilesData(filesData, enqueueSnackbar);
    }
  }, []);
  const currentUploadingFile = _.find(
    new includes().getUploadFilesWithSourceUrl(
      props.uploadAttachmentsModalFilesData,
      new resolveSettings().resolveAxonAppFileWatchDownloadFolderSource(),
      new resolveSettings().resolveVORecordingSavePath(),
      true
    ),
    (files) => files.status == uploadFileStatusType.uploading
  );

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      bgcolor={"black"}
      width="100%"
      height="100%"
    >
      <Webcam
 
         videoConstraints={{
           width: 1280,
           height: 720,
           facingMode:cameraDeviceIdIndex == 0 ? "environment": "user"
         }}
         className={classes.webCam}
         audio={false}
         ref={webcamRef}
         screenshotFormat="image/jpeg"
         minScreenshotWidth={1080}
         minScreenshotHeight={720}
         onUserMedia={handleWebCamUserMedia}
        
      />
      <IconButton
        className={classes.backButton}
        onClick={() => {
          props.setCameraModalToggle(false);
        }}
      >
        <ArrowBackIcon className={classes.backButtonIcon} />
      </IconButton>
      {currentUploadingFile && (
        <Box className={classes.UploadGridBox}>
          <UploadGridBox currentFile={currentUploadingFile}></UploadGridBox>
        </Box>
      )}
      <IconButton
        onClick={() => {
          setUploadListDrawer(true);
        }}
        className={classes.uploadDrawerToggleButton}
      >
        <ExpandMoreIcon className={classes.uploadDrawerToggleButtonIcon} />
      </IconButton>
      {videoCapturing && (
        <Typography className={classes.videoTimerText}>
          {("0" + Math.floor(videoCapturingElapsed / 60)).slice(-2) +
            ":" +
            ("0" + Math.floor(videoCapturingElapsed % 60)).slice(-2)}
        </Typography>
      )}
      <Drawer
        PaperProps={{ className: classes.uploadListDrawer }}
        anchor={"top"}
        open={toggleUploadListDrawer}
        onClose={() => {
          setUploadListDrawer(false);
        }}
      >
        <UploadGridList />
      </Drawer>
      <Slider
        classes={{
          rail: classes.zoomSliderRail,
          thumb: classes.zoomSliderThumb,
        }}
        className={classes.zoomSlider}
        disabled={!zoomSliderEnabled}
        value={zoomSliderValue}
        min={zoomSliderMin}
        step={zoomSliderStep}
        max={zoomSliderMax}
        orientation="vertical"
        aria-labelledby="vertical-slider"
        onChange={(event,newValue)=>{

          mediaVideoTrack.applyConstraints({advanced: [ {zoom: newValue} ]});
          setZoomSliderValue(newValue)
        }}
      />
      <div className={classes.bottomOptionsContainer}>
        <Box className={classes.bottomDownloadButtonsContainer}>
          <Box>
            {lastCaptureBlob && (
              <Button
                className={classes.lastCaptureFileSaveButton}
                onClick={() => {
                  const url = window.URL.createObjectURL(lastCaptureBlob);
                  const a = document.createElement("a");
                  a.style.display = "none";
                  a.href = url;
                  // the filename you want
                  a.download =
                    "AxonMedia_" +
                    Math.floor(Math.random() * 10000 + 1) +
                    (lastCaptureBlob.type == "video/mp4" ? ".mp4" : ".jpg");
                  document.body.appendChild(a);
                  a.click();
                  window.URL.revokeObjectURL(url);
                }}
              >
                Save
              </Button>
            )}
          </Box>
          <Box>
            <div className={classes.lastCaptureFilePreview}>
              {lastCaptureBlob == null ? (
                <Typography className={classes.lastCaptureFilePreviewText}>
                  No Image
                </Typography>
              ) : lastCaptureBlob.type == "video/mp4" ? (
                <video
                  className={classes.lastCaptureFilePreviewVideo}
                  muted={true}
                  autoPlay={true}
                  src={window.URL.createObjectURL(lastCaptureBlob)}
                ></video>
              ) : (
                <img
                  className={classes.lastCaptureFilePreviewImage}
                  src={window.URL.createObjectURL(lastCaptureBlob)}
                ></img>
              )}
            </div>
          </Box>
        </Box>
        <Box className={classes.bottomCameraButtonsContainer}>
          <Button
            disabled={cameraSwitchDevices.length == 0}
            onClick={() => {
              if (cameraStatus == "photo") {
                capturePicture();
              } else {
                if (!videoCapturing) handleStartVideoClick();
                else handleStopVideoClick();
              }
            }}
            className={clsx(classes.pictureVideoCaptureButton, {
              [classes.showBusyStyles]: showCameraBusyNotify,
            })}
          >
            {cameraStatus == "photo" ? (
              <CameraAltIcon
                className={clsx(classes.pictureVideoCaptureButtonIcon, {
                  [classes.showBusyStyles]: showCameraBusyNotify,
                })}
              ></CameraAltIcon>
            ) : videoCapturing ? (
              <StopIcon
                className={clsx(
                  classes.pictureVideoCaptureButtonIcon,
                  classes.showBusyStyles
                )}
              ></StopIcon>
            ) : (
              <VideocamIcon
                className={classes.pictureVideoCaptureButtonIcon}
              ></VideocamIcon>
            )}
          </Button>
          <Button
            onClick={() => {
              if (cameraStatus == "photo") setCameraStatus("video");
              else setCameraStatus("photo");
            }}
            className={classes.pictureVideoToggleButton}
          >
            {cameraStatus == "photo" ? (
              <VideocamIcon
                className={classes.pictureVideoToggleButtonIcon}
              ></VideocamIcon>
            ) : (
              <CameraAltIcon
                className={classes.pictureVideoToggleButtonIcon}
              ></CameraAltIcon>
            )}
          </Button>
        </Box>
        <Box className={classes.bottomCameraFlashFaceSwitchContainer}>
          <Box flex="1">
            <IconButton
              disabled={!flashButtonEnabled}
              className={clsx(classes.flashToggleButton, {
                [classes.buttonDisabled]: !flashButtonEnabled,
              })}
              onClick={() => {
                if (flashValue == "off") {
                  mediaVideoTrack
                    .applyConstraints({
                      advanced: [{ torch: true }],
                    })
                    .then(function () {
                      setFlashValue("on");
                    });
                } else if (flashValue == "on") {
                  mediaVideoTrack
                    .applyConstraints({
                      advanced: [{ torch: false }],
                    })
                    .then(function () {
                      setFlashValue("off");
                    });
                }
              }}
            >
              {flashValue == "off" ? (
                <FlashOffIcon
                  className={classes.flashToggleButtonIcon}
                ></FlashOffIcon>
              ) : (
                <FlashOnIcon
                  className={classes.flashToggleButtonIcon}
                ></FlashOnIcon>
              )}
            </IconButton>
          </Box>
          <Box flex="1">
            <IconButton
              disabled={cameraSwitchDevices.length <= 1}
              onClick={() => {
               
                var cameraDeviceIdIndex_ = cameraDeviceIdIndex >= 1 ? 0 : cameraDeviceIdIndex + 1;
         
                if (cameraDeviceIdIndex_ >= cameraSwitchDevices.length) {
                  setCameraDeviceIdIndex(0);
                  cameraDeviceIdIndex_ = 0;
                } else setCameraDeviceIdIndex(cameraDeviceIdIndex_);

               
                setCameraSwitchDeviceId(
                  cameraSwitchDevices[cameraDeviceIdIndex_].deviceId
                );
                
              }}
              className={clsx(classes.cameraSwitchButton, {
                [classes.buttonDisabled]: cameraSwitchDevices.length <= 1,
              })}
            >
              <SwitchCameraIcon className={classes.cameraSwitchButtonIcon} />
            </IconButton>
          </Box>
        </Box>
      </div>
    </Box>
  );
};
const mapStateToProps = (state) => {
  return {
    ...state.UploadAttachmentsModalReducer,
  };
};
export default connect(mapStateToProps, {
  setCameraModalToggle,
  addUploadAttachmentsModalFilesData,
})(Camera);
