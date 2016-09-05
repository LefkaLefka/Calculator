//знак числа
//если ИСТИНА - знак ПЛЮС
var sign = true;
//операнды для операций
var operand1 = null,
	operand2 = null;
//локальная операция
var localAct = null;
//наличие точки
//если ИСТИНА - точка есть
var haveDot = false;
var wasShowing = false;

//отслеживаем нажатие на какие либо элементы
document.onclick = function(e)
{
	e = e || event;
	var target = e.target || e.srcElement;
	switch (target.id)
	{
		case "num0":
			writeNumToLocalExpression(0);
			break;
		case "num1":
			writeNumToLocalExpression(1);
			break;
		case "num2":
			writeNumToLocalExpression(2);
			break;
		case "num3":
			writeNumToLocalExpression(3);
			break;
		case "num4":
			writeNumToLocalExpression(4);
			break;
		case "num5":
			writeNumToLocalExpression(5);
			break;
		case "num6":
			writeNumToLocalExpression(6);
			break;
		case "num7":
			writeNumToLocalExpression(7);
			break;
		case "num8":
			writeNumToLocalExpression(8);
			break;
		case "num9":
			writeNumToLocalExpression(9);
			break;
		case "sign":
			writeNumToLocalExpression(-1);
			break;
		case "dot":
			writeNumToLocalExpression(-2);
			break;
		case "CE":
			deleteLastNum();
			break;
		case "C":
			stopAllOperations();
			break;
		case "bcksp":
			deleteLastSymb();
			break;
		case "addition":
			addition();
			break;
		case "subtraction":
			subtraction();
			break;
		case "multiplication":
			multiplication();
			break;
		case "division":
			division();
			break;
		case "percent":
			percent();
			break;
		case "sqrt":
			sqrt();
			break;
		case "sqr":
			sqr();
			break;
		case "fraction":
			fraction();
			break;
		case "equally":
			equally(true);
			break;
	}
}

//процент
function percent()
{
	if (operand1 !== null && operand2 === null)
	{
		operand2 = createOperand();
		operand2 = (operand1 * operand2) / 100;
		document.getElementById("localExpression").innerHTML = operand2.toString();
		equally(true);
	}
}

//корень
function sqrt()
{
	if (operand1 === null && operand2 === null)
		{
			//создаем операнд
			operand1 = createOperand();
			if (operand1 >= 0)
			{
				operand1 = Math.sqrt(operand1);
				document.getElementById("localExpression").innerHTML = operand1.toString();
				document.getElementById("globalExpression").innerHTML = "";
			}
		}
		else
			if (operand1 !== null && operand2 === null)
			{
				//создаем операнд
				operand2 = createOperand();
				if (operand2 >= 0)
				{
					operand2 = Math.sqrt(operand2);
					document.getElementById("localExpression").innerHTML = operand2.toString();
					
					if (localAct !== null)
					{
						equally(true);
					}
				}
				
			}
			else
				if (operand1 !== null && operand2 !== null)
				{
					if (operand2 >= 0)
					{
						document.getElementById("globalExpression").innerHTML = "";
						//создаем операнд
						operand1 = createOperand();
						operand1 = Math.sqrt(operand1);
						document.getElementById("localExpression").innerHTML = operand1.toString();
						deleteAllVariable();
					}
				}
}

//квадрат
function sqr()
{
	if (operand1 === null && operand2 === null)
	{
		//создаем операнд
		operand1 = createOperand();
		operand1 *= operand1;
		document.getElementById("localExpression").innerHTML = operand1.toString();
	}
	else
		if (operand1 !== null && operand2 === null)
		{
			//создаем операнд
			operand2 = createOperand();
			operand2 *= operand2;
			document.getElementById("localExpression").innerHTML = operand2.toString();
			if (localAct !== null)
			{
				equally(true);
			}
		}
		else
			if (operand1 !== null && operand2 !== null)
			{
				document.getElementById("globalExpression").innerHTML = "";
				//создаем операнд
				operand1 = createOperand();
				operand1 *= operand1;
				document.getElementById("localExpression").innerHTML = operand1.toString();
				deleteAllVariable();
			}
}

//деление=1/x
function fraction()
{
	if (operand1 === null && operand2 === null)
		{
			//создаем операнд
			operand1 = createOperand();
			if (operand1 !== 0)
			{
				operand1 = 1 / operand1;
				document.getElementById("localExpression").innerHTML = operand1.toString();
			}
		}
		else
			if (operand1 !== null && operand2 === null)
			{
				//создаем операнд
				operand2 = createOperand();
				if (operand2 !== 0)
				{
					operand2 =  1 / operand2;
					document.getElementById("localExpression").innerHTML = operand2.toString();
					
					if (localAct !== null)
					{
						equally(true);
					}
				}
				
			}
			else
				if (operand1 !== null && operand2 !== null)
				{
					if (operand2 !== 0)
					{
						document.getElementById("globalExpression").innerHTML = "";
						//создаем операнд
						operand1 = createOperand();
						operand1 = 1 / operand1;
						document.getElementById("localExpression").innerHTML = operand1.toString();
						deleteAllVariable();
					}
				}
}

//деление
function division()
{
	//если еще ничего не делаем
	if (localAct === null)
	{
		//создаем первый операнд
		operand1 = createOperand();
	}
	else
		equally(false);

	writeActShowExpression("division");
}

//умножение
function multiplication()
{
	if (localAct === null)
	{
		operand1 = createOperand();
	}
	else
		equally(false);

	writeActShowExpression("multiplication");
}

//разница
function subtraction()
{
	if (localAct === null)
	{
		operand1 = createOperand();
	}
	else
		equally(false);

	writeActShowExpression("subtraction");
}

//сложение
function addition()
{
	if (localAct === null)
	{
		operand1 = createOperand();
	}
	else
		equally(false);

	writeActShowExpression("addition");
}

//отображаем действие с операндами
function writeActShowExpression(act)
{
	haveDot = false;
	localAct = act;
	var str;
	switch (act)
	{
		case "addition":
			str = "+";
			break;
		case "subtraction":
			str = "-";
			break;
		case "multiplication":
			str = "&times";
			break;
		case "division":
			str = "/";
			break;
		default:
			str = "";
			break;
	}
	
	document.getElementById("globalExpression").innerHTML = operand1.toString() + str;
	document.getElementById("localExpression").innerHTML = "0";
}

//функционал кнопки равно
//по совместительнству функция для промежуточных операций
function equally(deleteVariable)
{
	var divisionByZero = false;
	//создаем второй операнд
	operand2 = createOperand();
	//выводим его в глобальное выражение
	document.getElementById("globalExpression").innerHTML += operand2.toString();
	//обсчитываем относительно локального действия
	switch (localAct)
	{
		case "addition":
			operand1 = operand1 + operand2;
			break;
		case "subtraction":
			operand1 = operand1 - operand2;
			break;
		case "multiplication":
			operand1 = operand1 * operand2;
			break;
		case "division":
			if (operand2 !== 0)
			{
				operand1 = operand1 / operand2;
				writeResultToLocalExpression();
			}
			else
			{
				document.getElementById("globalExpression").innerHTML = "";
				document.getElementById("globalExpression").innerHTML = "Division by zero";
				divisionByZero = true;
				deleteVariable = true;
			}
			break;
	}
	//проверяем число на его знак
	if (operand1 < 0)
	{
		sign = false;
	}
	//если не делим на ноль
	if (!divisionByZero)
	{
		//выводим результат
		writeResultToLocalExpression();
	}
	//по входящему параметру удаляем переменные
	if (deleteVariable)
	{
		deleteAllVariable();
	}
}

//удаляет все переменные
function deleteAllVariable()
{
	//в данном случаем под удалением подразумевается присвоение значение null
	operand1 = null;
	operand2 = null;
	localAct = null;
	haveDot = false;
	sign = false;
}

//вывод результата
function writeResultToLocalExpression()
{
	//выводим результат, который хранится в первом операнде
	document.getElementById("localExpression").innerHTML = operand1.toString();
	wasShowing = true;
}

//создает операнд из входящей строки
//возвращает значение Number
function createOperand(operand)
{
	return Number(document.getElementById("localExpression").innerHTML);
}

//функционал кнопки "CE"
function deleteLastNum()
{
	//удаляет последнее введенное число
	operand2 = null;
	document.getElementById("localExpression").innerHTML = "0";
}

//функционал кнопки "C"
function stopAllOperations()
{
	//удаляем все переменный
	deleteAllVariable();
	//новые значения для продолжения работы
	document.getElementById("localExpression").innerHTML = "0";
	document.getElementById("globalExpression").innerHTML = "";
}

//функционал кнопки "bcksp"
function deleteLastSymb()
{
	var str = String(document.getElementById("localExpression").innerHTML);
	//проверяем есть ли ее что удалять
	//если нету - выводим ноль
	if (str.length === 0 || str.length === 1)
		document.getElementById("localExpression").innerHTML = "0";
	else
		//иначе удаляем последний символ(число)
		document.getElementById("localExpression").innerHTML = str.substring(0, str.length - 1);
}

//отображаем число пользователю
function writeNumToLocalExpression(num)
{
	if (wasShowing)
	{
		wasShowing = false;
		document.getElementById("localExpression").innerHTML = "0";
		document.getElementById("globalExpression").innerHTML = "";
	}
	//проверка длины числа (16 символов)
	if (checkLengthLocalExpression(document.getElementById("localExpression").innerHTML))
	{
		//если жмем только ноль, при этом перед этим в строке тоже был ноль
		if ((num === 0 || num === -1) && document.getElementById("localExpression").innerHTML === "0")
			document.getElementById("localExpression").innerHTML = 0;
		else
			//если вводим какое-то ПЕРВОЕ число и не точку и не знак
			if (num !== -2 && num !== -1 && document.getElementById("localExpression").innerHTML === "0")
				document.getElementById("localExpression").innerHTML = num;
			else
				//если нажали точку
				//и до этого чилсо точку не имело
				if (num === -2 && !haveDot)
				{
					document.getElementById("localExpression").innerHTML += ".";
					haveDot ^= true;
				}
				else
					//если вводим любую цифру
					if (num !== -1 && num !== -2)
						document.getElementById("localExpression").innerHTML += num;
	}
	//меняем знак числа
	if (num === -1 && document.getElementById("localExpression").innerHTML !== "0")
	{
		//если положительное число
		if (sign)
		{
			//меняем знак
			sign ^= true;
			//выводим с минусом впереди
			document.getElementById("localExpression").innerHTML = (sign ? "" : "-") + 
				document.getElementById("localExpression").innerHTML;
		}
		else
		//если отрицательное число
		{
			sign ^= true;
			//выводим с минусом впереди
			document.getElementById("localExpression").innerHTML = 
				document.getElementById("localExpression").innerHTML.replace("-", "");
		}
	}
}

//проверяем длину числа
function checkLengthLocalExpression(expression)
{
	//длина числа должна быть 16 символов
	//1234567890123456
	//0,1234567890123456
	//1,123456789012345
	
	//если не равно -1, то точка есть в строке
	//иначе нету
	var haveDot = expression.indexOf(".") !== -1 ? true : false;
	expression = expression.replace("-", "");
	//если есть точка
	if (haveDot)
    {
		//если число вида 0,1234567890123456
		if (expression[0] === "0" && expression[1] === "." && expression.length - 2 < 16)
			return true;
		//если число вида 1,123456789012345
		else
			if (expression.length - 1 < 16)
				return true;
			else
				return false;
	}
	else
		//если точки нету
		if (expression.length < 16)
			return true;
		else
			return false;
}