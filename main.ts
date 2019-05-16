/**
 * Propotional Font Display blocks
 */
//% weight=100 color=#0fbc11 icon="\u270f" block="Proportional Font"
enum onoff {
    //% block=off
    off = 0,
    //% block=on
    on = 1
}
namespace lightsensor {
    let init = 0
    let lastLightLevel:number
    export function onBrightnessChange(level: onoff, handler: Action) {
        control.onEvent(3300, level, handler);
        if (init == 0) {
            lastLightLevel = input.lightLevel()
            control.inBackground(() => {
                while (true) {
                    const lightLevel = input.lightLevel()
                    if (lightLevel != lastLightLevel) {
                        lastLightLevel = lightLevel
                        control.raiseEvent(3300, lastLightLevel)
                    }
                    basic.pause(50);
                }
            })
        }
    }
}