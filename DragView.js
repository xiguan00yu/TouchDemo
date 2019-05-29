import React from "react";
import { StyleSheet, Text, Animated } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
const DragViewHeight = 240;
const DragViewDuration = 800;

export default class DragView extends React.PureComponent {
    heightAnim = new Animated.Value(0);
    translationYAnim = new Animated.Value(0);
    status = false;
    toggle = () => {
        if (this.status) this.close();
        else this.open();
        this.status = !this.status;
    };
    open = () => {
        Animated.timing(this.heightAnim, {
            toValue: DragViewHeight,
            duration: DragViewDuration
        }).start();
    };
    close = () => {
        Animated.timing(this.heightAnim, {
            toValue: 0,
            duration: DragViewDuration
        }).start();
    };
    onGestureEvent = Animated.event(
        [{ nativeEvent: { translationY: this.translationYAnim } }],
        {
            useNativeDriver: false
        }
    );
    onHandlerStateChange = event => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            // save current height
            this.heightAnim.setValue(
                this.heightAnim._value + event.nativeEvent.translationY * -1
            );
            // change translationYAnim init status 0
            this.translationYAnim.setValue(0);
        }
    };
    render() {
        return (
            <PanGestureHandler
                onHandlerStateChange={this.onHandlerStateChange}
                onGestureEvent={this.onGestureEvent}
            >
                <Animated.View
                    style={[
                        styles.container,
                        {
                            height: Animated.add(
                                this.heightAnim,
                                this.translationYAnim.interpolate({
                                    inputRange: [-2, -1, 0, 1, 2],
                                    outputRange: [2, 1, 0, -1, -2]
                                })
                            )
                        }
                    ]}
                >
                    <Text>I am DragView</Text>
                </Animated.View>
            </PanGestureHandler>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#0f0",
        position: "absolute",
        alignItems: "center",
        bottom: 0,
        left: 0,
        right: 0
    }
});
