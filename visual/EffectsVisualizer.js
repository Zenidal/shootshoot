class EffectsVisualizer {
    static visualizeWeaponArea(brush, weapon, areaPosition, overflow) {
        if (!overflow) overflow = 0.2;

        let delayTime = weapon.tempDelayTime,
            maxDelayTime = weapon.delayTime;
        if (weapon.rechargeDelayTime) {
            delayTime = weapon.rechargeDelayTime;
            maxDelayTime = weapon.rechargeTime;
        }

        let areaColor = {
            'r': 0,
            'g': Math.round(delayTime / maxDelayTime * 255),
            'b': 0
        };

        brush.drawCircle({
            x: areaPosition.x,
            y: areaPosition.y,
            radius: weapon.range,
            fillColor: 'rgba(' + areaColor.r + ',' + areaColor.g + ',' + areaColor.b + ', ' + overflow + ')'
        });
    }

    static visualizeCartridges(weapon, areaPosition, strokeWidth, unsupportedWeaponColor) {
        if (!unsupportedWeaponColor) unsupportedWeaponColor = 'rgba(0,0,0,0)';

        if (!strokeWidth) strokeWidth = 2;
        let strokeStyle = weapon.isCartridgeSupported(weapon.chargedCartridge) ? weapon.chargedCartridge.color : unsupportedWeaponColor;
        let angle = weapon.tempNumberOfCartridges * (Math.PI * 2) / weapon.numberOfCartridges;

        let screenPoint = Helper.calculateCircleScreenCoordinates(areaPosition, weapon.range, strokeWidth);
        let context = pjs.system.getContext();
        context.strokeStyle = strokeStyle;
        context.lineWidth = strokeWidth;
        context.beginPath();
        context.arc(screenPoint.x, screenPoint.y, weapon.range, 0, angle);
        strokeWidth && context.stroke();
    }

    static visualizeSelectingCartridge(brush, weapon, areaPosition, pouchCartridgeColor, strokeWidth) {
        if(weapon.chargedCartridge && weapon.chargedCartridge.color === pouchCartridgeColor) return;
        if (!strokeWidth) strokeWidth = 2;
        brush.drawCircle({
            x: areaPosition.x - strokeWidth,
            y: areaPosition.y - strokeWidth,
            radius: weapon.range + strokeWidth,
            strokeWidth: strokeWidth,
            strokeColor: pouchCartridgeColor
        });
    }

    static showInfo(brush, position, text, color, fontSize) {
        if (!color) color = 'rgba(255, 255, 255, 1.0)';
        if (!fontSize) fontSize = 22;
        brush.drawTextS({
            x: position.x,
            y: position.y,
            text: text,
            color: color,
            size: fontSize
        });
    }

    static visualizeHealthBar(startPosition, width, height, tempHealth, maxHealth, color) {
        if (!color) color = 'rgba(255, 0, 0, 1.0)';
        let activeBarWidth = width * tempHealth / maxHealth;
        brush.drawRect({
            x: startPosition.x,
            y: startPosition.y,
            w: width, h: height,
            strokeColor: color,
            strokeWidth: 1
        });
        brush.drawRect({
            x: startPosition.x,
            y: startPosition.y,
            w: activeBarWidth, h: 6,
            fillColor: color
        });
    }
}