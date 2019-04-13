import React from "react";
import { View } from "react-native";
import { withTheme, Title, Text, Colors, Caption } from "react-native-paper";
import PropTpyes from "prop-types";
import { Icon } from ".";

class HeaderSection extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps) {

    return this.props.title !== nextProps.title
  }
  render() {
    console.log("EntrySectionContainer render ..");
    const { title ,icon} = this.props;
    return (
      <View style={{ width: "100%", backgroundColor: Colors.grey300,flexDirection:"row",alignItems:"center"}}>
      <Icon
          type="MaterialCommunityIcons"
          name={icon || "calendar-today"}
          fontSize={25}
          color={Colors.purple400}
        />
        <Text style={{fontSize: 14,padding: 5,paddingStart:12,opacity:.7 }}>{title}</Text>
      </View>

    );
  }
}
HeaderSection.propTypes = {
  title: PropTpyes.string,
};
export default withTheme(HeaderSection)

