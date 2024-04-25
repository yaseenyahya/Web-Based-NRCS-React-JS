import * as React from "react";
import webShare, { WebShareInterface } from "react-web-share-api";
import { Button, Box, Menu, MenuItem } from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import {
  EmailShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  FacebookIcon,
  EmailIcon,
  WhatsappIcon,
} from "react-share";
const ShareButton = ({ share, isSupported, className, shareUrl, title }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const anchorElOnClose = (event) => {
    setAnchorEl(null);
  };
  return isSupported ? (
    <Button
      config={{
        params: {
          title: title,
          text: "",
          url: shareUrl,
        },
      }}
      onClick={share}
      className={className}
    >
      <ShareIcon />
    </Button>
  ) : (
    <Box display="inline">
      <Button
        aria-controls="share-menu-pc-browser"
        aria-haspopup="true"
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
        className={className}
      >
        <ShareIcon />
      </Button>
      <Menu
        id="share-menu-pc-browser"
        anchorEl={anchorEl}
        
        open={Boolean(anchorEl)}
        onClose={anchorElOnClose}
      >
        <MenuItem>
          <EmailShareButton subject={title} body={title} url={shareUrl}>
            <EmailIcon size={32} round />
          </EmailShareButton>
        </MenuItem>
        <MenuItem>
          <FacebookShareButton quote={title} url={shareUrl}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </MenuItem>
        <MenuItem>
          <WhatsappShareButton title={title} url={shareUrl}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default webShare()(ShareButton);
