 
<%
   Session("sPath_DLL") = "FormulasWeb\TxFormulas.dll"

	SELECT CASE (request("sfunction"))

		CASE "Initialize_Dll"
			 AParameters = Session("Dir_TEEXMA_Path") 
			 API_ASP_TxASP.Execute_DLL Session("sPath_DLL"), "DoInitializeTxFormulas", AParameters, AResult

        		
	 	CASE "display"
			AParameters = Session("Dir_TEEXMA_Path") & "|" & request(" id_Obj") & "|" & request("ID_AS")  
			API_ASP_TxASP.Execute_DLL Session("sPath_DLL"), "Get_formula", AParameters, AResult
	 
	END SELECT

	response.write AResult
%> 