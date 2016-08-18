var wSimple;
var Simple_Layout;
var JMAInput;

function displaysimpleWindow(aJMAInput) {
    if (!dhxWins) {
        dhxWins = new dhtmlXWindows("dhx_blue");
        dhxWins.setImagePath('../../../resources/theme/img/dhtmlx/windows/');
    }

    JMAInput = aJMAInput;

    wSimple = dhxWins.createWindow("txlabeling_simple", 10, 10, 350, 70);
    wSimple.setText(aJMAInput.sMessage);
    wSimple.center();
    wSimple.setIcon("../../../../../Temp_Resources/Models/TxLabeling/24x24_Scan_Barcode.png");
    wSimple.denyResize();

    Simple_Layout = wSimple.attachLayout("1C");
    Simple_Layout.setImagePath('../../../resources/theme/img/dhtmlx/layout/');

    /** input cell **/
    Simple_Layout.setAutoSize("", "a");

    var a = Simple_Layout.cells('a');
    a.hideHeader();

    var x = document.createElement("INPUT");
    x.setAttribute("id", "labelValue");

    if (aJMAInput.bHideChars == undefined) aJMAInput.bHideChars = 0;

    if (aJMAInput.bHideChars == 0) {
        x.setAttribute("type", "text");
    } else {
        x.setAttribute("type", "password");
    }

    x.setAttribute("style", "width:100%; height: 100%; font-size: 22px");
    x.onblur = function (ev, aJMAInput) {

        var sRead_Value = document.getElementById("labelValue").value;

        if (sRead_Value) {

            new J.ajax({
                url: ajax,
                async: false,
                dataType: "html",
                data: {
                    event: "LBL_Read_Label",
                    iRead_Mode: JMAInput.iRead_Mode,
                    ID_OT: JMAInput.ID_OT,
                    ID_Att_BarCode: JMAInput.ID_Att_BarCode,
                    sRead_Value: sRead_Value
                },
                success: function (data) {
                    var sResult = data.split("|");

                    if (sResult[0] = 'ok') {
                        ID_Object = Number(sResult[1]);
                    } else {
                        rMessage = sResult[0];
                    }

                    returnID(ID_Object, rMessage);
                },
                error: function (data) {
                    alert(sResult[1]);
                }
            });
        }

        closeWindow("txlabeling_simple");
    };
    a.attachObject(x);
    x.focus();
  
}

function closeWindow(aWindowName) {
    dhxWins.window(aWindowName).close();
    dhxWins.unload();
    dhxWins = null;
}
