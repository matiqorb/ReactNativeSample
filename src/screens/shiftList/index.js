import React, { Component } from "react";
import {
  FlatList,
  RefreshControl,
  InteractionManager,
  BackHandler,
} from "react-native";
import {
  Text,
  Appbar,
  List,
  Divider,
  Checkbox,
  withTheme
} from "react-native-paper";
import { Container, Icon } from "../../components";

import { connect } from "react-redux";
import { FloatingAction } from "react-native-floating-action";
import { bindActionCreators } from "redux";
import {
  refresh,
  remove,
  loadEditItem
} from "../../redux/actions/shiftSetting";
import staticHepler from "../../helper/staticHelper";
import { AppConstants } from "../../helper/constants";
import Spinner from "../../components/Spinner";

import styles from "./styles";
class ShiftList extends Component {
  static timerId = null;
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selectedItems: {},
      selectMode: false
    };
  }
  loadItems = async () => {
    this.props.refresh({});
  };
  async componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      if (!this.props.shifts || this.props.shifts.length == 0) this.loadItems();
      requestAnimationFrame(() => {
        this.setState({ visible: true });
      });
    });
    this.subs = [
      this.props.navigation.addListener("didFocus", () =>
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress)
      ),
      this.props.navigation.addListener("didBlur", () =>
        BackHandler.removeEventListener(
          "hardwareBackPress",
          this.handleBackPress
        )
      )
    ];
  }
  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }
  handleBackPress = () => {
    if (this.state.selectMode) {
      this.onSelectModeBackPress();
      return true;
    }
  };
  onItemPresse = item => {
    if (this.state.selectMode) {
      if (!this.state.selectedItems[item.id])
        this.state.selectedItems[item.id] = true;
      else delete this.state.selectedItems[item.id];
      this.setState({ selectMode: true });
    } else {
      setTimeout(() => {
        this.props.navigation.navigate("AddShift");
      }, 0);
      this.props.loadEditItem(item);
    }
  };
  onAddPress = async screen => {
    setTimeout(() => {
      this.props.navigation.navigate(screen);
    }, 0);
  };
  onItemLongPress = id => {
    if (!this.state.selectedItems[id]) this.state.selectedItems[id] = true;
    this.setState({ selectMode: true });
  };
  onSelectModeBackPress = () => {
    this.setState({ selectMode: false, selectedItems: {} });
  };
  onDeletePress = () => {
    this.props
      .remove(Object.keys(this.state.selectedItems))
      .then(() => this.onSelectModeBackPress());
  };
  renderItem = ({ item }) => {
    const { theme } = this.props;
    return (
      <List.Item
        style={theme.listItemStyle.listItem}
        onLongPress={() => this.onItemLongPress(item.id)}
        onPress={() => this.onItemPresse(item)}
        left={props =>
          this.state.selectMode ? (
            <Checkbox
              color={theme.colors.checkBoxColor}
              status={
                this.state.selectedItems[item.id] ? "checked" : "unchecked"
              }
              onValueChange={() => this.onItemPresse(item)}
            />
          ) : (
            <Icon
                  style={styles.icon}
                  type="MaterialIcons"
                  name="timelapse"
                  color={theme.colors.listItemIcon}
                  
                />
          )
        }
        title={<Text style={theme.listItemStyle.title}>{item.name}</Text>}
        description={
          <Text style={theme.listItemStyle.subTitle}>{item.description}</Text>
        }
      />
    );
  
  };
  render() {
    const {
      theme,
      status 
    } = this.props;
    return (
      <Container>
        {this.state.selectMode ? (
          <Appbar.Header
            style={{ backgroundColor: theme.colors.headerActionColor }}
          >
            <Appbar.BackAction onPress={this.onSelectModeBackPress} />
            <Appbar.Content
              title={Object.keys(this.state.selectedItems).length}
              titleStyle={theme.titleStyle}
            />
            <Appbar.Action
              color={theme.colors.headerActionIconColor}
              icon="delete"
              onPress={this.onDeletePress}
            />
          </Appbar.Header>
        ) : (
          <Appbar.Header>
            <Appbar.BackAction onPress={() => this.props.navigation.pop()} />
            <Appbar.Content
              titleStyle={theme.titleStyle}
              subtitleStyle={theme.subtitleStyle}
            />
          </Appbar.Header>
        )}
        <FlatList
          data={this.props.shifts}
          renderItem={this.renderItem}
          ItemSeparatorComponent={() => <Divider />}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl
              colors={theme.colors.refreshControlColors}
              refreshing={staticHepler.isBusy(status, ["refresh"])}
              onRefresh={this.loadItems}
            />
          }
          onEndReached={() => console.log("End Reache")}
          onEndReachedThreshold={0.5}
        />
        <FloatingAction
          color={theme.colors.fabsColor}
          position="right"
          onPressMain={() => this.onAddPress("AddShift")}
          showBackground={false}
          floatingIcon={
            <Icon
              type="MaterialIcons"
              name="add"
              color={theme.colors.fabsIconColor}
            />
          }
          visible={this.state.visible && !this.state.selectMode}
        />
        <Spinner
          visible={staticHelper.isBusy(status, ["remove"])}
          cancelable={false}
          {...theme.spinner}
          delay={AppConstants.spinnerDelay}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  shifts: state.shifts.items,
  status: state.shifts.status
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      refresh,
      remove,
      loadEditItem
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(ShiftList));
