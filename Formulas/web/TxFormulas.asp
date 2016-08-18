<!-- base de prog -->

<script type="text/javascript" src="../../../../code/js/lib/jquery.js"></script>
<script type="text/javascript" src="../../../../code/js/framework_bassetti.js"></script>
<script type="text/javaScript" src="/code/js/lib/jquery.js"></script>
<script type="text/javascript" src="/code/js/lib/Math.js"></script>
<script type="text/javascript" src="/temp_resources/models/TxJsonformula/formula.js"> </script>
<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
<script type="text/javascript" src="/Temp_resources/Models/TxLabeling/TxLabelingForms.js"></script>
<link rel='stylesheet' type='text/css' href="/Temp_resources/Models/TxJsonformula/css/Style.css" />

<script type="text/javascript"> 
    var J = jQuery.noConflict(); 
 </script>

<script type="text/javascript">
    var dhxWins;
    var initCallBackMA = {};
    var rCallBack, rDummyData;


    var iRead_Mode = '<% = Request("var0")%>';
    var ID_OT = '<% = Request("var1")%>';   
    var sMessage = '<% = Request("var2")%>';
    // var bHideChars = '<% = Request("var3")%>';

    var rResult = new Object();
    var ID_Object = 0;
    var rMessage = '';
   

    initCallBackMA['<%=request("sIdsMaAndObj")%>'] = function (aCB, aDD) {
        rCallBack = aCB;
        rDummyData = aDD;
        var jMAInput = {
            iRead_Mode : iRead_Mode,
            ID_OT : ID_OT ,            
            sMessage: sMessage,
            bHideChars: bHideChars
        };

        display(jMAInput);
     
        returnID(ID_Object, rMessage);
    };



    function returnID(aID_Object, aMessage) {
        rResult.updateObject = new Object();
        rResult.updateObject.ID = aID_Object;

        rCallBack(rResult, rDummyData);

    }         
</script>
<script type="text/javascript">
			 
    var input_Json = 
        {"name" : "allocatedTime",
        "variables":[{
            "name":"cycleTime",
            "value":0, 
            "unit": "s",
            "label": "Cycle Time"
        },
        {"name":"Thruput",
        "value":0,
        "unit":"%" },

        { "name":"DownTime",
        "value":0,
        "unit":"%" 
        },
        {"name":"Yield",
        "value":0,
        "unit":"%"
        },
        {"name":"CC2",
        "value":0,
        "unit":"null"
        },
        {"name":"CC",
        "value":0
        }],
        "formula": "((cycleTime * (Thruput /100)*((100+DowTime)/100 * CC)",
        "result": {
            "value": 0,
            "unit": "mn"
        }
        }
    
			 	

    var formula = new TxFormula(input_Json); //appel vers json à modifier à définir 
    $("#user").on('click',function() {

        formula.display("Formula_container");
        formula.calculate();
    });

    $("#clear").on('click',function() {

        $("#Formula_container form").remove();
    });

    $("#admin").on('click',function(){
        var log = prompt("password :");
				 
        var login = login_JSON.some(function(user){
            return user.name === "admin" && user.password === log;
							
        });

        if(!login) return;
        formula.editVar("Formula_container");
				 
			
    });

</script>

