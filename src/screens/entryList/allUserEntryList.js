import React, { Component } from "react";
import {
  View,
  RefreshControl,
  InteractionManager,
  SectionList
} from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./styles";
import { withTheme, Appbar } from "react-native-paper";
import staticHepler from "../../helper/staticHelper";
import { MaterialIndicator } from "react-native-indicators";
import {
  refreshAll,
  nextPageAll,
  reverseRemoveStatus
} from "../../redux/actions/userEntry";
import EntryItem from "./allUserItemContainers";
import HeaderSection from "../../components/sectionHeader";

class AllUserEntryList extends Component {
  constructor(props) {
    super(props);
    this.endOfList = false;
    this.isLoadingData = false;
    this.state = {};
  }
  loadItems = async (anyway = false) => {
    if (this.isLoadingData) return;

    if (anyway || Object.keys(this.props.allUserItems).length == 0) {
      this.isLoadingData = true;
      await this.props
        .refreshAll()
        .then(response => {
          this.endOfList = response == 0;
          this.isLoadingData = false;
        })
        .catch(error => {
          this.isLoadingData = false;
        });
    }
  };
  nextPage = async () => {
    if (this.isLoadingData) return;

    if (!this.endOfList) {
      this.isLoadingData = true;
      this.props
        .nextPageAll()
        .then(response => {
          this.endOfList = response == 0;
          this.isLoadingData = false;
        })
        .catch(error => {
          this.isLoadingData = false;
        });
    }
  };
  async componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.loadItems();
    });
  }
  renderGroupItem = ({ item, index, section }) => {
   
    return (
      <EntryItem
        key={item.id}
        index={index}
        item={item}
        onReverseRemoveStatus={(id)=>this.onReverseRemoveStatus(id)}
      />
    );
  };
  onReverseRemoveStatus(id) {
    setTimeout(() => {
      this.props.reverseRemoveStatus(id);
    }, 0);
  }
  render() {
    const { theme } = this.props;
    const { status, allUserItems } = this.props;
    const items = Object.keys(allUserItems).reduce(function(groups, item) {
      const val = allUserItems[item].date;
      groups[val] = groups[val] || {
        title: val,
        data: []
      };
      groups[val].data.push(allUserItems[item]);
      return groups;
    }, {});
    return (
      <View style={{ flex: 1 }}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this.props.navigation.pop()} />
          <Appbar.Content
            titleStyle={theme.titleStyle}
          />
          <Appbar.Action
            icon="filter-none"
            onPress={() => console.log("Pressed archive")}
          />
        </Appbar.Header>
        <SectionList
          renderItem={this.renderGroupItem}
          renderSectionHeader={({ section: { title } }) => (
            <HeaderSection title={title} />
          )}
          sections={Object.values(items)}
          keyExtractor={(item, index) =>{
           return item.id}}
          stickySectionHeadersEnabled={true}
          onEndReached={this.nextPage}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() =>
            staticHepler.isBusy(status, ["nextPageAll"]) ? (
              <View style={styles.footerComponent}>
                <MaterialIndicator
                  color={theme.colors.indicatorColor}
                  size={28}
                />
              </View>
            ) : null
          }
          refreshControl={
            <RefreshControl
              colors={theme.refreshControlColors}
              refreshing={staticHepler.isBusy(status, ["refreshAll"])}
              onRefresh={() => this.loadItems(true)}
            />
          }
        />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  allUserItems: state.userEntries.allUserItems,
  status: state.userEntries.status
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      refreshAll,
      nextPageAll,
      reverseRemoveStatus
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(AllUserEntryList));
