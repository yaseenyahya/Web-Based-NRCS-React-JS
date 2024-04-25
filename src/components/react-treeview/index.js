import "./style.css";
import React, { Component, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import isEqual from "lodash/isEqual";
import find from "lodash/find";
import get from "lodash/get";
import cloneDeep from "lodash/cloneDeep";
import filter from "lodash/filter";
import { CircularProgress, Button } from "@material-ui/core";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { TreeviewType } from "./TreeviewType";
import PowerIcon from "@material-ui/icons/Power";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import TableChartIcon from '@material-ui/icons/TableChart';

class SuperTreeview extends Component {
  constructor(props) {
    super(props);

    this.handleUpdate = this.handleUpdate.bind(this);

    this.printNodes = this.printNodes.bind(this);
    this.printChildren = this.printChildren.bind(this);

    this.printCheckbox = this.printCheckbox.bind(this);
    this.printDeleteButton = this.printDeleteButton.bind(this);
    this.printCount = this.printCount.bind(this);
    this.printExpandButton = this.printExpandButton.bind(this);
    this.printNoChildrenMessage = this.printNoChildrenMessage.bind(this);

    this.handleCheckToggle = this.handleCheckToggle.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleExpandToggle = this.handleExpandToggle.bind(this);
  }
  state = {
    data: cloneDeep(this.props.data),
    lastCheckToggledNodeIndex: null,
    showScrollToTopButton: false,
  };
  componentDidMount() {
    this.treeViewRef.parentElement.parentElement.scrollIntoView();
    //this.treeViewRef.scrollTo( 0,  240 );
  }
  componentWillReceiveProps(nextProps) {
    //if (!isEqual(nextProps.data, this.props.data)) {
    this.setState({ data: cloneDeep(nextProps.data) });
    //}
  }

  handleUpdate(updatedData) {
    const { depth, onUpdateCb } = this.props;

    onUpdateCb(updatedData, depth);
  }

  handleCheckToggle(node, e) {
    const { onCheckToggleCb, depth } = this.props;
    const { lastCheckToggledNodeIndex } = this.state;
    const data = cloneDeep(this.state.data);
    const currentNode = find(data, node);
    const currentNodeIndex = data.indexOf(currentNode);
    const toggledNodes = [];
    if (e.shiftKey && !isNil(lastCheckToggledNodeIndex)) {
      const rangeStart = Math.min(currentNodeIndex, lastCheckToggledNodeIndex);
      const rangeEnd = Math.max(currentNodeIndex, lastCheckToggledNodeIndex);

      const nodeRange = data.slice(rangeStart, rangeEnd + 1);

      nodeRange.forEach((node) => {
        node.isChecked = e.target.checked;
        toggledNodes.push(node);
      });
    } else {
      currentNode.isChecked = e.target.checked;
      toggledNodes.push(currentNode);
    }

    onCheckToggleCb(toggledNodes, depth);
    this.setState({ lastCheckToggledNodeIndex: currentNodeIndex });
    this.handleUpdate(data);
  }

  handleDelete(node) {
    const { onDeleteCb, depth } = this.props;
    const data = cloneDeep(this.state.data);

    const newData = data.filter((nodeItem) => {
      return !isEqual(node, nodeItem);
    });

    onDeleteCb(node, newData, depth) && this.handleUpdate(newData);
  }

  handleExpandToggle(node) {
    const { onExpandToggleCb, depth } = this.props;
    const data = cloneDeep(this.state.data);

    const prevExpandedNode = find(data, (node) => node.isExpanded);
    if (prevExpandedNode != undefined) prevExpandedNode.isExpanded = undefined;

    const currentNode = find(data, node);

    if (currentNode != undefined)
      currentNode.isExpanded = !currentNode.isExpanded;

    onExpandToggleCb(currentNode, depth);
    this.handleUpdate(data);
  }

  printCheckbox(node) {
    const { isCheckable, keywordLabel, depth } = this.props;

    if (isCheckable(node, depth)) {
      return (
        <input
          type="checkbox"
          name={node[keywordLabel]}
          onClick={(e) => {
            this.handleCheckToggle(node, e);
          }}
          checked={!!node.isChecked}
          id={node.id}
        />
      );
    }
  }

  printDeleteButton(node) {
    const { isDeletable, depth, deleteElement } = this.props;

    if (isDeletable(node, depth)) {
      return (
        <div
          className="delete-btn"
          onClick={() => {
            this.handleDelete(node);
          }}
        >
          {deleteElement}
        </div>
      );
    }
  }

  printExpandButton(node) {
    const className = node.isExpanded
      ? "super-treeview-triangle-btn-down"
      : "super-treeview-triangle-btn-right";
    const { isExpandable, depth } = this.props;

    if (isExpandable(node, depth)) {
      return (
        <div
          className={`super-treeview-triangle-btn ${className}`}
          onClick={() => {
            this.handleExpandToggle(node);
          }}
        />
      );
    } else {
      return (
        <div
          className={`super-treeview-triangle-btn super-treeview-triangle-btn-none`}
        />
      );
    }
  }
  printCount(node) {
    const className = "super-treeview-count-box";
    const { isShowCount, depth } = this.props;

    if (isShowCount(node, depth)) {
      return (
        <div className={`${className}`}>
          <span>{node.children != undefined ? node.children.length : 0}</span>
        </div>
      );
    }
  }
  printNoChildrenMessage() {
    const { transitionExitTimeout, noChildrenAvailableMessage } = this.props;
    const noChildrenTransitionProps = {
      classNames: "super-treeview-no-children-transition",
      key: "super-treeview-no-children",
      style: {
        transitionDuration: `${transitionExitTimeout}ms`,
        transitionDelay: `${transitionExitTimeout}ms`,
      },
      timeout: {
        enter: transitionExitTimeout,
      },
      exit: false,
    };

    return (
      <CSSTransition {...noChildrenTransitionProps}>
        <div className="super-treeview-no-children">
          <div style={this.props.noChildrenStyle} className="super-treeview-no-children-content">
            {noChildrenAvailableMessage}
          </div>
        </div>
      </CSSTransition>
    );
  }

  printNodes(nodeArray) {
    const {
      keywordKey,
      keywordLabel,
      depth,
      transitionEnterTimeout,
      transitionExitTimeout,
      getStyleClassCb,
      isExpandable,
    } = this.props;
    const {
      printExpandButton,
      printCheckbox,
      printDeleteButton,
      printChildren,
      printCount,
    } = this;

    const nodeTransitionProps = {
      classNames: "super-treeview-node-transition",
      style: {
        transitionDuration: `${transitionEnterTimeout}ms`,
      },
      timeout: {
        enter: transitionEnterTimeout,
        exit: transitionExitTimeout,
      },
    };

    return (
      <TransitionGroup>
        {isEmpty(nodeArray)
          ? this.printNoChildrenMessage()
          : nodeArray.map((node, index) => {
              const nodeText = get(node, keywordLabel, "");
              var isHighlightParent = false;
              if (
                node.type == TreeviewType.Parent &&
                node.children != undefined
              )
                isHighlightParent =
                  filter(node.children, (ele) => ele.isHighlight).length > 0;
              return (
                <CSSTransition {...nodeTransitionProps} key={node.id}>
                  <div
                    key={node.id}
                    className={"super-treeview-node" + getStyleClassCb(node)}
                  >
                    <div
                      key={node.id}
                      style={this.props.rowStyle}
                      id={`super-treeview-item-${node.id}`}
                      className={
                        "super-treeview-node-content" +
                        (node.type == TreeviewType.Child
                          ? " super-treeview-node-content-cursor"
                          : "") +
                        (node.isSelected
                          ? " super-treeview-node-content-selected"
                          : "") +
                        (node.type == TreeviewType.Child && node.isHighlight
                          ? " super-treeview-node-content-child-highlight"
                          : "") +
                        (isHighlightParent
                          ? " super-treeview-node-content-parent-highlight"
                          : "")
                      }
                      onClick={() => {
                        this.onContainerClick(node, depth);

                        if (isExpandable(node, depth)) {
                          this.handleExpandToggle(node);
                        }
                      }}
                    >
                      {printExpandButton(node, depth)}
                      {printCheckbox(node, depth)}
                      {node.icon == "power" ? (
                        <PowerIcon
                          style={{
                            width: "17px",
                            height: "17px",
                            marginLeft: "-17px",
                            color: "#444242",
                          }}
                        />
                      ) : null}
                      {node.icon == "attachment" ? (
                        <AttachFileIcon
                          style={{
                            width: "17px",
                            height: "17px",
                            marginLeft: "-17px",
                            color: "#444242",
                          }}
                        />
                      ) : null}
  {node.icon == "rundown" ? (
                        <TableChartIcon
                          style={{
                            width: "17px",
                            height: "17px",
                            marginLeft: "-17px",
                            color: "#444242",
                          }}
                        />
                      ) : null}


                      <label
                        htmlFor={node.id}
                        title={nodeText}
                        className="super-treeview-text"
                        style={
                          this.isArabic(
                            nodeText.replace(/\s/g, "").length > 0
                              ? nodeText.replace(/\s/g, "")[0]
                              : ""
                          )
                            ? { direction: "rtl", marginRight: 16 }
                            : null
                        }
                      >
                        {nodeText}
                      </label>
                      {printDeleteButton(node, depth)}
                      {printCount(node, depth)}
                    </div>
                    {printChildren(node)}
                  </div>
                </CSSTransition>
              );
            })}
      </TransitionGroup>
    );
  }
  isArabic(text) {
    var pattern = /[\u0600-\u06FF\u0750-\u077F]/;
    var result = pattern.test(text);
    return result;
  }
  printChildren(node) {
    if (!node.isExpanded) {
      return null;
    }

    const { keywordChildren, keywordChildrenLoading, depth } = this.props;
    const isChildrenLoading = get(node, keywordChildrenLoading, false);

    let childrenElement;

    if (isChildrenLoading) {
      childrenElement = get(this.props, "loadingElement");
    } else {
      childrenElement = (
        <SuperTreeview
          {...this.props}
          data={node[keywordChildren] || []}
          depth={depth + 1}
          onUpdateCb={onChildrenUpdateCb.bind(this)}
        />
      );
    }

    return (
      <div className="super-treeview-children-container">{childrenElement}</div>
    );

    function onChildrenUpdateCb(updatedData) {
      const data = cloneDeep(this.state.data);
      const currentNode = find(data, node);

      currentNode[keywordChildren] = updatedData;
      this.handleUpdate(data);
    }
  }
  onContainerClick = (node, depth) => {
    this.props.onItemClick && this.props.onItemClick(node, depth);
  };
  render() {
    return (
      <div
        onScroll={(e) => {
          this.setState({ showScrollToTopButton: e.target.scrollTop > 10 });
        }}
        className="super-treeview"
        style={
          this.props.depth == 0
            ? { height: this.props.layoutHeight, overflow: "auto" }
            : null
        }
        ref={(ref) => (this.treeViewRef = ref)}
      >
        {this.state.showScrollToTopButton && (
          <Button
            onClick={() => {
              this.treeViewRef.scrollTop = 0;
              const data = cloneDeep(this.state.data);
              const prevExpandedNode = find(data, (node) => node.isExpanded);
              if (prevExpandedNode != undefined)
                prevExpandedNode.isExpanded = undefined;

              this.handleUpdate(data);
            }}
            style={{
              position: "absolute",
              borderRadius: 55,
              background: "#808080ba",
              bottom: 0,
              right: 8,
              width: 60,
              height: 60,
              transform: "scale(0.7)",
              border: "3px solid #ffffffcf",
            }}
          >
            <ExpandLessIcon style={{ width: 47, height: 47, color: "white" }} />
          </Button>
        )}
        {this.props.isLoading ? (
          <CircularProgress className="super-treeview-progress" />
        ) : (
          this.printNodes(this.state.data)
        )}
      </div>
    );
  }
}

SuperTreeview.propTypes = {
  data: PropTypes.array.isRequired,
  depth: PropTypes.number,

  deleteElement: PropTypes.element,

  getStyleClassCb: PropTypes.func,

  isCheckable: PropTypes.func,
  isDeletable: PropTypes.func,
  isExpandable: PropTypes.func,
  isShowCount: PropTypes.func,

  onItemClick: PropTypes.func,

  keywordChildren: PropTypes.string,
  keywordChildrenLoading: PropTypes.string,
  keywordKey: PropTypes.string,
  keywordLabel: PropTypes.string,

  loadingElement: PropTypes.element,
  noChildrenAvailableMessage: PropTypes.string,

  onCheckToggleCb: PropTypes.func,
  onDeleteCb: PropTypes.func,
  onExpandToggleCb: PropTypes.func,
  onUpdateCb: PropTypes.func,

  transitionEnterTimeout: PropTypes.number,
  transitionExitTimeout: PropTypes.number,
  isLoading: PropTypes.bool,
};

SuperTreeview.defaultProps = {
  depth: 0,
  isLoading: false,
  deleteElement: <div>(X)</div>,

  getStyleClassCb: (/* node, depth */) => {
    return "";
  },
  isCheckable: (/* node, depth */) => {
    return false;
  },
  isDeletable: (/* node, depth */) => {
    return true;
  },
  isExpandable: (/* node, depth */) => {
    return true;
  },
  isShowCount: (/* node, depth */) => {
    return true;
  },
  keywordChildren: "children",
  keywordChildrenLoading: "isChildrenLoading",
  keywordLabel: "name",
  keywordKey: "id",

  loadingElement: <div>loading...</div>,

  noChildrenAvailableMessage: "No data found",

  onCheckToggleCb: (/* Array of nodes, depth */) => {},
  onDeleteCb: (/* node, updatedData, depth */) => {
    return true;
  },
  onExpandToggleCb: (/* node, depth */) => {},
  onUpdateCb: (/* updatedData, depth */) => {},

  transitionEnterTimeout: 1200,
  transitionExitTimeout: 1200,
};

export default SuperTreeview;
