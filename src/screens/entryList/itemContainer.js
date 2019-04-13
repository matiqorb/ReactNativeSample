import React from "react";
import { View } from "react-native";
import { withTheme, Text, Colors } from "react-native-paper";
import PropTpyes from "prop-types";
import { ListItem, Icon } from "../../components";
class EntryItem extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps) {
    return this.props.item !== nextProps.item;
  }
  render() {
    const { index, item, theme } = this.props;
    return (
      <ListItem
        style={{ padding: 2 }}
        title={
          <Text style={{ fontSize: theme.listItemStyle.title.fontSize - 1 }}>
            {jMoment(item.entryDate).format("HH:mm")}
          </Text>
        }
        left={props => {
          return <Icon
          type="MaterialIcons"
          name="access-time"
          fontSize={25}
          color={Colors.purple300}
        />
        }}
        right={props =>
          item.isSync ? (
            <Icon
              type="MaterialCommunityIcons"
              name="cloud-check"
              color={Colors.purple300}
              fontSize={22}
            />
          ) : (
            <Icon
              type="MaterialCommunityIcons"
              name="cloud-outline"
              color={Colors.grey400}
              fontSize={22}
            />
          )
        }
      />
    );
  }
}
EntryItem.propTypes = {
  item: PropTpyes.object,
  index: PropTpyes.number
};
export default withTheme(EntryItem);
