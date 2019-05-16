/**
 * Propotional Font Display blocks
 */
//% weight=100 color=#0fbc11 icon="\u270f" block="light sensor"
enum onoff {
    //% block=on
    on = 1,
    //% block=off
    off = 0
}
namespace lightsensor {
    let init = 0
    let lastLightLevel:number
    /**
     * TODO:明るさの変化を検出
     * @param level 数値。, eg: 0
     * @param handler 関数。, eg: action
     */
    //% blockId="明るさの変化を検出" block="明るさの変化を検出 %level"
    //% weight=100 blockGap=8
    export function onBrightnessChange(level: onoff, handler: Action) {
        control.onEvent(3300, level, handler);
        if (init == 0) {
            init=1
            lastLightLevel = input.lightLevel()
            control.inBackground(() => {
                while (true) {
                    const lightLevel = input.lightLevel()
                    if (lightLevel != lastLightLevel) {
                        if(lightLevel<lastLightLevel){
                            control.raiseEvent(3300, onoff.off)
                        } else {
                            control.raiseEvent(3300, onoff.on)
                        }
                        lastLightLevel = lightLevel
                    }
                    basic.pause(50);
                }
            })
        }
    }
}