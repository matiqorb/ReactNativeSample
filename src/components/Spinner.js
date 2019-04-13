import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, Modal, ActivityIndicator } from "react-native";
import { SkypeIndicator } from "react-native-indicators";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  background: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  textContainer: {
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute"
  },
  textContent: {
    top: 80,
    height: 50,
    fontSize: 20,
    fontWeight: "bold"
  }
});

const ANIMATION = ["none", "slide", "fade"];
const SIZES = ["small", "normal", "large"];
export default class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible ? this.props.visible : false,
      textContent: this.props.textContent,
      timerId: null,
      showSpinner: this.props.showSpinner ? this.props.showSpinner : true
    };
  }

  static propTypes = {
    visible: PropTypes.bool,
    cancelable: PropTypes.bool,
    textContent: PropTypes.string,
    animation: PropTypes.oneOf(ANIMATION),
    color: PropTypes.string,
    size: PropTypes.number,
    overlayColor: PropTypes.string,
    delay: PropTypes.number,
    showSpinner: PropTypes.bool
  };

  static defaultProps = {
    visible: false,
    cancelable: false,
    textContent: "",
    animation: "none",
    color: "white",
    size: 55,
    overlayColor: "rgba(0, 0, 0, 0)",
    showSpinner: true
  };

  close() {
    this.setState({ visible: false });
  }

  componentWillReceiveProps(nextProps) {
    const { visible, textContent, delay, showSpinner } = nextProps;
    if (
      visible == this.props.visible &&
      textContent == this.props.textContent &&
      delay == this.props.delay &&
      showSpinner == this.props.showSpinner
    )
      return;
    if (this.state.timerId) {
      clearTimeout(this.state.timerId);
      this.state.timerId = null;
    }
    if (delay && visible)
      this.state.timerId = setTimeout(() => {
        this.setState({
          visible: visible,
          textContent: textContent,
          showSpinner: showSpinner
        });
      }, this.props.delay);
    else
      this.setState({
        visible: visible,
        textContent: textContent,
        showSpinner: showSpinner
      });
  }

  _handleOnRequestClose() {
    if (this.props.cancelable) {
      this.close();
    }
  }

  _renderDefaultContent() {
    return (
      <View style={styles.background}>
        {this.props.showSpinner ? (
          <SkypeIndicator
            interaction={false}
            color={this.props.color}
            size={this.props.size}
            style={{ flex: 1 }}
          />
        ) : (
          <Text />
        )}
        <View style={styles.textContainer}>
          <Text style={[styles.textContent, this.props.textStyle]}>
            {this.state.textContent}
          </Text>
        </View>
      </View>
    );
  }

  _renderSpinner() {
    const { visible, showSpinner } = this.state;

    if (!visible) return null;

    const spinner = showSpinner ? (
      <View
        style={[styles.container, { backgroundColor: this.props.overlayColor }]}
        key={`spinner_${Date.now()}`}
      >
        {this.props.children
          ? this.props.children
          : this._renderDefaultContent()}
      </View>
    ) : null;

    return (
      <Modal
        animationType={this.props.animation}
        onRequestClose={() => this._handleOnRequestClose()}
        supportedOrientations={["landscape", "portrait"]}
        transparent
        visible={visible}
      >
        {spinner}
      </Modal>
    );
  }

  render() {
       return this._renderSpinner();
  }
}
