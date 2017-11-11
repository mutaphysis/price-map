"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styled_components_1 = require("styled-components");
var MapIcon = /** @class */ (function (_super) {
    __extends(MapIcon, _super);
    function MapIcon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MapIcon.prototype.render = function () {
        var onClick = this.props.onClick;
        var style = {
            backgroundImage: 'url(' + this.props.path + ')',
            width: this.props.size + 'px',
            height: this.props.size + 'px',
        };
        return (<a className={this.props.className || ''} onClick={onClick} style={style}/>);
    };
    return MapIcon;
}(React.PureComponent));
exports.default = (_a = ["\n  background-repeat: no-repeat;\n  background-size: contain;\n  background-position: center;\n  display: block;\n  cursor: pointer;\n"], _a.raw = ["\n  background-repeat: no-repeat;\n  background-size: contain;\n  background-position: center;\n  display: block;\n  cursor: pointer;\n"], styled_components_1.default(MapIcon)(_a));
var _a;
