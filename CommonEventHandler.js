// CommonEventHandler.js - Common event handler for browser events
// (c) Marco Vieth, 2019
// https://benchmarko.github.io/CPCBasic/

"use strict";

var Utils;

if (typeof require !== "undefined") {
	Utils = require("./Utils.js"); // eslint-disable-line global-require
}

function CommonEventHandler(oModel, oView, oController) {
	this.init(oModel, oView, oController);
}

CommonEventHandler.fnEventHandler = null;

CommonEventHandler.prototype = {
	init: function (oModel, oView, oController) {
		this.model = oModel;
		this.view = oView;
		this.controller = oController;

		this.fnUserAction = null;
		this.attachEventHandler();
	},

	fnCommonEventHandler: function (event) {
		var oTarget = event.target,
			sId = (oTarget) ? oTarget.getAttribute("id") : oTarget,
			sType, sHandler;

		if (this.fnUserAction) {
			this.fnUserAction(event, sId);
		}
		if (sId) {
			if (!oTarget.disabled) { // check needed for IE which also fires for disabled buttons
				sType = event.type; // click or change
				sHandler = "on" + Utils.stringCapitalize(sId) + Utils.stringCapitalize(sType);
				if (Utils.debug) {
					Utils.console.debug("fnCommonEventHandler: sHandler=" + sHandler);
				}
				if (sHandler in this) {
					this[sHandler](event);
				} else if (!Utils.stringEndsWith(sHandler, "SelectClick") && !Utils.stringEndsWith(sHandler, "InputClick")) { // do not print all messages
					Utils.console.log("Event handler not found: " + sHandler);
				}
			}
		} else if (Utils.debug) {
			Utils.console.debug("Event handler for " + event.type + " unknown target " + oTarget);
		}
	},

	attachEventHandler: function () {
		if (!CommonEventHandler.fnEventHandler) {
			CommonEventHandler.fnEventHandler = this.fnCommonEventHandler.bind(this);
		}
		this.view.attachEventHandler(CommonEventHandler.fnEventHandler);
		return this;
	},

	toogleHidden: function (sId, sProp) {
		var bShow = !this.view.toogleHidden(sId).getHidden(sId);

		this.model.setProperty(sProp, bShow);
	},

	/*
	onUserAction: function () {
		//this.fnDeactivateUserAction();
	},
	*/

	fnActivateUserAction: function (fnAction) {
		this.fnUserAction = fnAction;
	},

	fnDeactivateUserAction: function () {
		this.fnUserAction = null;
	},

	onSpecialLegendClick: function () {
		this.toogleHidden("specialArea", "showSpecial");
	},

	onInputLegendClick: function () {
		this.toogleHidden("inputArea", "showInput");
	},

	onInp2LegendClick: function () {
		this.toogleHidden("inp2Area", "showInp2");
	},

	onOutputLegendClick: function () {
		this.toogleHidden("outputArea", "showOutput");
	},

	onResultLegendClick: function () {
		this.toogleHidden("resultArea", "showResult");
	},

	onVariableLegendClick: function () {
		this.toogleHidden("variableArea", "showVariable");
	},

	onCpcLegendClick: function () {
		this.toogleHidden("cpcArea", "showCpc");
	},

	onParseButtonClick: function () {
		this.controller.fnParse();
	},

	onRunButtonClick: function () {
		var sInput = this.view.getAreaValue("outputText");

		this.controller.fnRun(sInput);
	},

	onStopButtonClick: function () {
		this.controller.fnStop();
	},

	onContinueButtonClick: function (event) {
		this.controller.fnContinue();
		this.onCpcCanvasClick(event);
	},

	onResetButtonClick: function () {
		this.controller.fnReset();
	},

	onParseRunButtonClick: function (event) {
		this.controller.fnParseRun();
		this.onCpcCanvasClick(event);
	},

	onHelpButtonClick: function () {
		window.open("https://github.com/benchmarko/CPCBasic/#readme");
	},

	onOutputTextChange: function () {
		this.controller.fnInvalidateScript();
	},

	fnEncodeUriParam: function (params) {
		var aParts = [],
			sKey,
			sValue;

		for (sKey in params) {
			if (params.hasOwnProperty(sKey)) {
				sValue = params[sKey];
				aParts[aParts.length] = encodeURIComponent(sKey) + "=" + encodeURIComponent((sValue === null) ? "" : sValue);
			}
		}
		return aParts.join("&");
	},

	onReloadButtonClick: function () {
		var oChanged = Utils.getChangedParameters(this.model.getAllProperties(), this.model.getAllInitialProperties());

		window.location.search = "?" + this.fnEncodeUriParam(oChanged); // jQuery.param(oChanged, true)
	},

	onDatabaseSelectChange: function () {
		var that = this,
			sDatabase = this.view.getSelectValue("databaseSelect"),
			sUrl, oDatabase,

			fnDatabaseLoaded = function (/* sFullUrl */) {
				oDatabase.loaded = true;
				Utils.console.log("fnDatabaseLoaded: database loaded: " + sDatabase + ": " + sUrl);
				//that.controller.fnSetFilterCategorySelectOptions();
				that.controller.fnSetExampleSelectOptions();
				if (oDatabase.error) {
					Utils.console.error("fnDatabaseLoaded: database contains errors: " + sDatabase + ": " + sUrl);
					that.view.setAreaValue("inputText", oDatabase.script);
					that.view.setAreaValue("resultText", oDatabase.error);
				} else {
					that.onExampleSelectChange();
				}
			},
			fnDatabaseError = function (/* sFullUrl */) {
				oDatabase.loaded = false;
				Utils.console.error("fnDatabaseError: database error: " + sDatabase + ": " + sUrl);
				//that.controller.fnSetFilterCategorySelectOptions();
				that.controller.fnSetExampleSelectOptions();
				that.onExampleSelectChange();
				that.view.setAreaValue("inputText", "");
				that.view.setAreaValue("resultText", "Cannot load database: " + sDatabase);
			},
			fnLoadDatabaseLocalStorage = function () {
				var	oStorage = Utils.localStorage,
					i, sKey, sItem;

				for (i = 0; i < oStorage.length; i += 1) {
					sKey = oStorage.key(i);
					sItem = oStorage.getItem(sKey);
					that.controller.fnAddItem(sKey, sItem);
				}
				fnDatabaseLoaded("", sDatabase);
			};

		this.model.setProperty("database", sDatabase);
		this.view.setSelectTitleFromSelectedOption("databaseSelect");
		oDatabase = this.model.getDatabase();
		if (!oDatabase) {
			Utils.console.error("onDatabaseSelectChange: database not available: " + sDatabase);
			return;
		}

		if (oDatabase.loaded) {
			//that.controller.fnSetFilterCategorySelectOptions();
			this.controller.fnSetExampleSelectOptions();
			this.onExampleSelectChange();
		} else {
			this.view.setAreaValue("inputText", "#loading database " + sDatabase + "...");
			if (sDatabase === "saved") {
				sUrl = "localStorage";
				fnLoadDatabaseLocalStorage(sDatabase);
			} else {
				//sUrl = this.model.getProperty("exampleDir") + "/" + oDatabase.src;
				sUrl = oDatabase.src + "/" + this.model.getProperty("exampleIndex");
				Utils.loadScript(sUrl, fnDatabaseLoaded, fnDatabaseError);
			}
		}
		//this.fnSetDeleteButtonStatus();
	},


	onExampleSelectChange: function () {
		var that = this,
			sExample = this.view.getSelectValue("exampleSelect"),
			sUrl, oExample, sDatabaseDir,

			fnParseRunExample = function ()	{
				that.controller.fnParseRun();
			},

			fnExampleLoaded = function (sFullUrl, bSuppressLog) {
				var sInput;

				if (!bSuppressLog) {
					Utils.console.log("Example " + sUrl + " loaded");
				}

				oExample = that.model.getExample(sExample);
				sInput = oExample.script;
				that.view.setAreaValue("inputText", sInput);
				that.view.setAreaValue("resultText", "");
				that.controller.fnReset();
				setTimeout(fnParseRunExample, 100); // hopefully the reset is done already
			},
			fnExampleError = function () {
				Utils.console.log("Example " + sUrl + " error");
				that.view.setAreaValue("inputText", "");
				that.view.setAreaValue("resultText", "Cannot load example: " + sExample);
			};

		this.model.setProperty("example", sExample);
		this.view.setSelectTitleFromSelectedOption("exampleSelect");
		oExample = this.model.getExample(sExample); // already loaded
		if (oExample && oExample.loaded) {
			fnExampleLoaded("", true);
		} else if (sExample && oExample) { // need to load
			this.view.setAreaValue("inputText", "#loading " + sExample + "...");
			this.view.setAreaValue("resultText", "waiting...");

			/*
			sPath = "";
			oDatabase = this.model.getDatabase();
			if (oDatabase.src) {
				sPath = oDatabase.src.split("/").slice(0, -1).join("/");
			}
			*/
			sDatabaseDir = this.model.getDatabase().src;
			sUrl = sDatabaseDir + "/" + sExample + ".js";
			Utils.loadScript(sUrl, fnExampleLoaded, fnExampleError);
		} else {
			this.view.setAreaValue("inputText", "");
			this.model.setProperty("example", "");
		}
	},

	onVarSelectChange: function () {
		var sPar = this.view.getSelectValue("varSelect"),
			oVariables = this.controller.oVariables,
			sValue;

		sValue = oVariables[sPar];
		if (sValue === undefined) {
			sValue = "";
		}
		this.view.setAreaValue("varText", sValue);
	},

	onScreenshotButtonClick: function () {
		var sExample = this.view.getSelectValue("exampleSelect"),
			image = this.controller.fnScreenshot(),
			link = document.getElementById("screenshotLink"),
			sName = sExample + ".png";

		link.setAttribute("download", sName);
		link.setAttribute("href", image);
		link.click();
	},

	onEnterButtonClick: function () {
		this.controller.fnEnter();
	},

	onSoundButtonClick: function () {
		this.model.setProperty("sound", !this.model.getProperty("sound"));
		this.controller.fnSetSoundActive();
	},

	onCpcCanvasClick: function (event) {
		this.controller.oCanvas.onCpcCanvasClick(event);
	}
};


if (typeof module !== "undefined" && module.exports) {
	module.exports = CommonEventHandler;
}
