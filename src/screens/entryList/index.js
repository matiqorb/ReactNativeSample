import React, { Component } from "react";
import {
  View,
  RefreshControl,
  FlatList,
  InteractionManager,
  SectionList
} from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./styles";
import {
  BottomNavigation,
  Text,
  withTheme,
  Appbar,
  Card,
  Title,
  Paragraph,
  Caption,
  Button,
  List,
  Portal,
  Colors
} from "react-native-paper";
import { SkypeIndicator, MaterialIndicator } from "react-native-indicators";
import staticHepler from "../../helper/staticHelper";
import { FloatingAction } from "react-native-floating-action";
import { nextPage,syncEntries } from "../../redux/actions/userEntry";
import {Icon,Container} from "../../components";
import EntryItem from "./itemContainer";
import HeaderSection from "../../components/sectionHeader";
class EnteryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddButton: true,
      actionVisible: false,
      visible: false
    };
    this.endOfList = false;
  }
  loadItems = async (refresh = false) => {
    this.props.nextPage(refresh).then(len => {
      if (len > 0) this.endOfList = false;
      else this.endOfList = true;
    });
  };
  syncEntries=()=>{
    this.props.syncEntries().then(()=>{
      this.loadItems(true);
    })
  }
  async componentDidMount() {
    if (Object.keys(this.props.items).length == 0) this.loadItems(true);
  }

  render() {
    const { theme, items } = this.props;
    const { status } = this.props;
    let entryGroup = Object.keys(items).reduce(function(groups, item) {
      const val = jMoment(items[item].entryDate).format("YYYYMMDD");
      groups[val] = groups[val] || {
        title: jMoment(val).format("dddd jD jMMMM jYY"),
        data: []
      };
      groups[val].data.push(items[item]);
      return groups;
    }, {});
    
    return (
      <Container>
        <Appbar.Header>
          <Appbar.Action icon="format-list-bulleted" />
          <Appbar.Content
            titleStyle={theme.titleStyle}
            subtitleStyle={theme.subtitleStyle}
          />
        </Appbar.Header>
        
        <SectionList
          renderItem={({ item, index, section }) => (
            <EntryItem key={index} index={index} item={item} />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <HeaderSection title={title} />
          )}
          sections={Object.values(entryGroup).reverse()}
          keyExtractor={(item, index) => item.toString() + index}
          stickySectionHeadersEnabled={true}
          onEndReached={() =>!this.endOfList?this.loadItems():null}
          onEndReachedThreshold={0.4}
          ListFooterComponent={()=>staticHepler.isBusy(status,["nextPage"])? <MaterialIndicator color={Colors.purple400} size={28} />:null}
          refreshControl={
            <RefreshControl
              colors={theme.refreshControlColors}
              refreshing={staticHepler.isBusy(status, ["refresh","syncEntries"])}
              onRefresh={() => this.syncEntries()}
            />
          }
        />
        
        <FloatingAction
          color={theme.fabs.color}
          position="right"
          onPressMain={() => {
            this.props.jumpTo("addFinger");
          }}
          showBackground={false}
          floatingIcon={<Icon type="MaterialIcons" name="add" color="white" />}
        />
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  items: state.userEntries.items,
  status: state.userEntries.status
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      nextPage,
      syncEntries
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(EnteryList));
