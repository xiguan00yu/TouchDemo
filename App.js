import React from "react";
import { View, Button } from "react-native";
import DragView from "./DragView";

export default () => {
    const dragRef = React.createRef();
    const onPress = () => dragRef.current && dragRef.current.toggle();
    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <Button
                onPress={onPress}
                title="Learn More"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
            <DragView ref={dragRef} />
        </View>
    );
};
