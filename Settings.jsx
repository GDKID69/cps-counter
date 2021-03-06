const { React, getModule, i18n: { Messages } } = require("powercord/webpack");
const { ColorPickerInput, SwitchItem, TextInput } = require("powercord/components/settings");

const ColorUtils = getModule(["isValidHex"], false);
const marginTopPixels = 15;
const { DEFAULT_CPS_UNIT, PRIDE_MODE_KEYFRAMES } = require("./constants");

module.exports = class CPSCounterSettings extends React.PureComponent {
    render() {
        return(
            <div className="cpsSettings">
                <div className="description-30xx7u formText-2ngGjI marginBottom20-315RVT modeDefault-2fEh7a">
                    {Messages.CC_DESCRIPTION}
                </div>
                <div className="cpsSettingsMainSettingsContainer" id = "cpsSettingsMainSettingsContainer">
                    <ColorPickerInput
                        value = {ColorUtils.hex2int(this.props.getSetting("color", "#ffffff"))}
                        disabled = {this.props.getSetting("prideMode", false)}
                        onChange = {(arg) => {
                            this.props.updateSetting("color", ColorUtils.int2hex(arg));
                            document.getElementById("cpsCounterContainer").style.color = ColorUtils.int2hex(arg);
                        }}>
                        {Messages.CC_COLOR}
                    </ColorPickerInput>

                    <SwitchItem
                        className = "cpsSettingsSeperateClickColorSwitch"
                        id = "cpsSettingsSeperateClickColorSwitch"
                        style = {{"margin-top": `${marginTopPixels}px`}}
                        value = {this.props.getSetting("seperateClickColor", false)}
                        onChange = {(arg) => {
                            this.props.updateSetting("seperateClickColor", arg);
                            if (!arg) {
                                this.props.updateSetting("clickColor", null);
                            }
                        }}>
                        {Messages.CC_ALT_COLOR}
                    </SwitchItem>

                    {this.props.getSetting("seperateClickColor", false) &&
                        <div className = "cpsSettingsClickColorPickerInputContainer">
                            <ColorPickerInput
                                value = {ColorUtils.hex2int(this.props.getSetting("clickColor", this.props.getSetting("color", "#ffffff")))}
                                onChange = {(arg) => {
                                    this.props.updateSetting("clickColor", ColorUtils.int2hex(arg));
                                }}>
                                {Messages.CC_ALT_COLOR}
                            </ColorPickerInput>
                        </div>
                    }

                    <div className = "divider-3573oO dividerDefault-3rvLe-"/>

                    <SwitchItem
                        className = "cpsSettingsPrideModeSwitch"
                        style = {{"margin-top": `${marginTopPixels}px`}}
                        value = {this.props.getSetting("prideMode", false)}
                        onChange = {(arg) => {
                            this.props.updateSetting("prideMode", arg);
                            if (arg) {
                                const chromaInstance = document.getElementById("cpsCounterContainer").animate(PRIDE_MODE_KEYFRAMES, {duration: 5000, iterations: Infinity});
                                this.props.updateSetting("_chromaInstance", chromaInstance);
                                document.getElementById("cpsCounterContainer").classList.add("prideMode");
                            }
                            else {
                                const chromaInstance = this.props.getSetting("_chromaInstance");
                                chromaInstance.cancel();
                                document.getElementById("cpsCounterContainer").classList.remove("prideMode");
                            }
                        }}>
                        {Messages.CC_PRIDE_MODE_SWITCH}
                    </SwitchItem>

                    <SwitchItem
                        className = "cpsSettingsRightClickSwitch"
                        style = {{"margin-top": `${marginTopPixels}px`}}
                        value = {this.props.getSetting("showRightClick", false)}
                        onChange = {(arg) => {this.props.updateSetting("showRightClick", arg);}}>
                        {Messages.CC_RIGHT_CLICK_SWITCH}
                    </SwitchItem>

                    <TextInput
                        className = "cpsSettingsUnitInput"
                        placeholder = {Messages.CC_CPS_UNIT_PLACEHOLDER}
                        value = {this.props.getSetting("cpsUnit", DEFAULT_CPS_UNIT)}
                        onChange = {(arg) => {this.props.updateSetting("cpsUnit", arg);}}>
                        {Messages.CC_CPS_UNIT}
                    </TextInput>
                </div>
                <div
                    className="description-30xx7u formText-2ngGjI marginBottom20-315RVT modeDefault-2fEh7a"
                    style={{"margin-top": "20px"}}>
                    {Messages.CC_I_SUCK_AT_THIS_LANGUAGE}
                </div>
                <style>
                {`
                    @keyframes loadIn {
                        from {
                            opacity: 0;
                            margin-top: -10px;
                        }
                        to {
                            opacity: 1;
                            margin-top: 0;
                        }
                    }

                    .cpsSettingsMainSettingsContainer {
                        background: var(--background-secondary);
                        backdrop-filter: blur(10px);
                        border-radius: 10px;
                        box-shadow: var(--elevation-high);
                        padding: 20px 20px 20px 20px;
                    }

                    .cpsSettingsMainSettingsContainer,
                    .cpsSettingsClickColorPickerInputContainer {
                        animation-name: loadIn;
                        animation-duration: 0.69s;
                        animation-iteration-count: 1;
                        margin-top: 0;
                    }

                    .cpsSettingsSeperateClickColorSwitch + div .divider-3573oO.dividerDefault-3rvLe-,
                    .cpsSettingsSeperateClickColorSwitch > div[class*="divider-"],
                    .cpsSettingsUnitInput + div[class*="divider-"] {
                        display: none;
                    }

                    .cpsSettingsMainSettingsContainer .disabled-2HSEFa .title-31JmR4 {
                        color: #969696;
                    }
                `}
                </style>
            </div>
        );
    }
};
