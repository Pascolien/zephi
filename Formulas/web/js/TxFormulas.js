var TxFormula = (function () {
    function TxFormula(aJson) {
        var name;
        var variables = [];
        var formula = {};
        var res = 0,
        var ajax = "ajax.asp",
        //var res = {};
        this.json = aJson;
    }

    TxFormula.prototype = {
        read: function (aJSON) {
            // this.res = aJSON.result; //???
            this.name = aJSON.name;
            for (var i = 0; i < aJSON.variables; i++) {
                var newvar = new TxVariable;
                this.variables.push(newvar);
            }
            formula = aJSON.formula;

        },

        calculate: function (aJSON) {
            res = 0;

            //parcours des valeurs de l'objet

            var scope = this.json.variables.reduce(function (prev, cur) {
                prev[cur.name] = cur.value; return prev;
            }, {});

            // var node = math.parse(this.json.formula);
             

            res = math.eval(this.json.formula, scope);
            res = math.round(res);
            $("#" + this.idDiv).find("#res").val(res);
            return res
        },

        display: function (id_div) {
            this.idDiv = id_div;
            var form = $("<form   name='" + this.json.name + "'/>");
            var self = this;
            this.json.variables.forEach(function (variable) {

                //display names 
                form.append((variable.label ? variable.label : variable.name) + " : ");

                //display inputs with variable's values
                var input = $("<input type='text'   name='" + variable.name + "' value ='" + variable.value + " 'size = 3'/>");
                form.append(input);
                form.append("\t" + (variable.unit ? variable.unit : ""));
                form.append("<br/><br/>");
                self.calculate();
                //calcul dynamique 
                input.on('input', function () {
                    variable.value = $(this).val();
                    //variable.value === "" ? "0" : variable.value.replace(',', '.');
                    self.calculate();
                });

                new J.ajax({
                url: ajax,
                async: false,
                cache: false,
                dataType: "html",
                data: {
                    event: "Get_Formula",
                      Id_Obj: Id_Obj,
                      sFormula : sFormula
                },
                success: function (data) {
                    var sResult = StrToArray(data);

                    if (sResult[0] === 'ok') {
                       prompt("ok");
                    } else {
                        alert(sResult[0]);
                    }
                },
                error: function (data) {                     
                    alert(sResult[1]);
                }
            });

            });

            form.append("<label  for='result'> result: </label>");
            form.append("<input type='text'   name='res' id='res' size=5/>");
            form.append("\t \t" + this.json.result.unit);
            form.append("<br/><br/>");
            form.append("<label for='formule'> formule : </label>");
            form.append("<input type='text'    name='formula'  value='" + this.json.formula + "' readonly='readonly' size=45/>");

            form.append("<br/><br/>");
            // form.append("<input type='submit' value='Calculate' />");
            $("#" + id_div).append(form);

        },

        editVar: function (id_div) {
            this.idDiv = id_div;
           // var form = $("<form   name='" + this.json.name + "'/>");
            var self = this;
            var variable = this.json.variables;
            var formula = this.json.formula;
            self.idDiv = id_div;
            var form = $("<form class='form-inline'role='form'name='" + self.json.name + "'/>");
             
            form.append("<label for='name'> nom:  </label>");
            form.append("<input   type='text' class='form-control' name='nom'   id='nom' required size=5/>");
            form.append("<br/><br/> ");
            form.append("<label for='value'> valeur: </label>");
            form.append("<input type='text' class='form-control' name='value' id='value' required size=5/>");
            form.append("<br/> <br/>");
            form.append("<label for='unit'> unit:  </label>");
            form.append("<input type='text'  class='form-control' name='unit'  id='unit'  size=5/>");
            form.append("<br/><br/>");

            //formule edition
            form.append("<label for='formule' > formule: </label>");
            form.append("<input type='text'  class='form-control' name='formula' id='formule' value='" + this.json.formula + "'  size=50/>");

            $("#" + id_div).append(form);


            form.append("<br/><br/>")
 
            form.append("<input type='submit' class='btn btn-default id='add' value='Add' />");
            form.append("\t \t");

            form.append("<input type='button' class='btn btn-default' id='delete' value='delete' />");
 
            form.append("<input type='submit'class='btn btn-primary-outline' id='add' value='Add' />");
            form.append("\t \t");

            form.append("<input type='button' class='btn btn-primary-outline'id='delete' value='delete' />");
 
            form.append("<br/><br/>");

            //add var 
            form.on('submit', function (e) {
                e.preventDefault();

                variable.push({ name: $("#nom").val(), value: $("#value").val(), unit: $("#unit").val() });
                self.json.formula = $("#formule").val();
            });

            //delete var
            $("#delete").on('click', function (e) {
                e.preventDefault();

                // recherche ,dans l'objet, de l'élément correspondant à la saisie
                var index = self.json.variables.findIndex(function (variable) {
                    return variable.name === $("#nom").val();
                });

                //debugger;
                if (index === -1) return;

                variable.splice(index, 1);
                self.json.formula = $("#formule").val();

            });
        }
    }

    return TxFormula;
})();


function TxVariable() {
    init = function (name, value, unit) {
        this.name = nom;
        this.value = value;
        this.unit = unit;
        // var newvar = Object.create( );
    }

}