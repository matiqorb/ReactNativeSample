import * as React from "react";
import { View, StyleSheet } from "react-native";
import { withTheme,TouchableRipple,Text } from 'react-native-paper';
import color from 'color'
function ListItem(props) {
    const {
        left,
        right,
        title,
        description,
        onPress,
        theme,
        style,
        ...rest
      } = props;
    const titleColor = color(theme.colors.text)
      .alpha(0.87)
      .rgb()
      .string();
    const descriptionColor = color(theme.colors.text)
      .alpha(0.54)
      .rgb()
      .string();

  
  return (<TouchableRipple
    {...rest}
    style={[styles.container, style]}
    onPress={onPress}
  >
    <View style={styles.row}>
      {left ? left({ color: descriptionColor }) : null}
      <View style={[styles.content]} pointerEvents="none">
        <View
          style={[styles.title, { color: titleColor }]}
        >
          {title}
        </View>
        {description ? (
          <View
            style={[
              styles.description,
              {
                color: descriptionColor,
              },
            ]}
          >
            {description}
          </View>
        ) : null}
      </View>
      {right ? right({ color: descriptionColor }) : null}
    </View>
  </TouchableRipple>);
}

export default withTheme(ListItem);
const styles = StyleSheet.create({
    container: {
      padding: 8,
    },
    row: {
      flexDirection: 'row',
    },
    title: {
      fontSize: 16,
    },
    description: {
      fontSize: 14,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      paddingStart:8
    },
  });
  