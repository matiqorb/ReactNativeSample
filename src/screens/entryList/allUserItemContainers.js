import React from "react";
import { View } from "react-native";
import { Text, Divider, Caption, Colors, withTheme,IconButton } from "react-native-paper";
import { AttendanceMethod } from "../../helper/enums";
import styles from "./styles";
import ListItem from "../../components/ListItem";
import Icon from "../../components/Icon";
import { Thumbnail } from "../../components";
import staticHelper from "../../helper/staticHelper";
export class AllUserItem extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { item, theme,onReverseRemoveStatus=()=>{}} = this.props;
    return (
      <View>
        <ListItem
         
          title={
            <Text style={{ fontSize: theme.listItemStyle.title.fontSize }}>
              {item.userFullName}
            </Text>
          }
          description={
            <View style={[styles.forgottenDescContainer]}>
              <View style={[styles.dateContainer]}>
                <Icon
                  type="MaterialIcons"
                  name="access-time"
                  color={Colors.purple400}
                  fontSize={18}
                />
                <Caption
                  style={[
                    styles.caption,
                    {
                      fontSize: theme.listItemStyle.subTitle.fontSize+2
                    }
                  ]}
                >
                  {item.time}
                </Caption>
              </View>
              <View style={[styles.dateContainer]}>
                <Icon
                  type="MaterialCommunityIcons"
                  name="circle-edit-outline"
                  color={Colors.purple400}
                  fontSize={18}
                />
                <Caption
                  style={[
                    styles.caption,
                    {
                      fontSize: theme.listItemStyle.subTitle.fontSize+2
                    }
                  ]}
                >
                  {AttendanceMethod.Labels[item.method]}
                </Caption>
              </View>
            </View>
          }
          left={props => (
            <Thumbnail
              size={56}
              defaultSource={require("../../../assets/icon/user-profile.png")}
              source={require("../../../assets/icon/user-profile.png")}
            />
          )}
          right={props => (
            <IconButton icon={()=> <Icon
              type="MaterialCommunityIcons"
              name="tag-remove"
              color={item.isDeleted?Colors.purple400:Colors.grey400}
              fontSize={26}
            />} 
            style={{width: 42}}
            
            onPress={()=>onReverseRemoveStatus(item.id)}/>
          )}
        />
        <Divider />
      </View>
    );
  }
}

export default withTheme(AllUserItem);
