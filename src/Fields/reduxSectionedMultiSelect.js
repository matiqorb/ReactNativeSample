import React, { Component, PureComponent } from "react";
import { View ,StyleSheet} from "react-native";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import {withTheme,Text} from "react-native-paper"
export class ReduxSectionedMultiSelect extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectItems: this.props.input.value
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ selectedItems: nextProps.input.value });
  }
  onSelectedItemsChange = selectedItems => {
    this.props.input.onChange(selectedItems);
  };

  render() {
    const { input, label, type, meta, children, ...props } = this.props;
    var hasError = false;
    const {
      active,
      dirty,
      error,
      submitFailed,
    } = meta;

    if (
      (error !== undefined && !active && dirty) ||
      (submitFailed && error !== undefined)
    ) {
      hasError = true;
    }
    const { theme } = props;
    return (
      <View
        style={{
          borderBottomWidth: StyleSheet.hairlineWidth,
          paddingVertical:8,
          marginBottom:8
        }}
      >
        <SectionedMultiSelect
          style={{ paddingVertical: null, paddingHorizental: null }}
          
          subKey="children"
          showDropDowns={true}
          readOnlyHeadings={true}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.selectedItems}
          itemFontFamily={{ fontFamily:theme.fonts.regular }}
          subItemFontFamily={{ fontFamily:theme.fonts.regular }}
          confirmFontFamily={{ fontFamily:theme.fonts.regular }}
          searchTextFontFamily={{ fontFamily:theme.fonts.regular }}
          noItemsComponent={
            <Text
              style={{
                flex: 1,
                justifyContent: "center",
                fontFamily:theme.fonts.regular
              }}
            >
            </Text>
          }
          noResultsComponent={
            <Text
              style={{
                flex: 1,
                justifyContent: "center",
                fontFamily:theme.fonts.regular
              }}
            >
            </Text>
          }
          removeAllText=""
          searchPlaceholderText=""
          selectedText=""
          confirmText=""
          selectText=""
          alwaysShowSelectText={true}
          readOnlyHeadings={false}
          {...input}
          {...props.inputProps}
          styles={{
            selectToggle: { paddingVertical: 8, paddingHorizental: null },
            selectToggleText: {
              fontFamily:theme.fonts.regular,
              color: theme.colors.placeHolderColor,
              fontSize: theme.inputStyle.fontSize + 2
            },
            chipText: { fontFamily:theme.fonts.regular,color:theme.colors.text },
            ...props.inputProps.styles
          }}
        />
      </View>
    );
  }
}
export default withTheme(ReduxSectionedMultiSelect)