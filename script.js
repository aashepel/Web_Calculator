window.onload = function(){ 

    let a = '0'
    let b = '0'
    let expressionResult = ''
    let selectedOperation = null
    
    // окно вывода результата
    outputElement = document.getElementById("result")
    // список объектов кнопок циферблата (id которых начинается с btn_digit_)
    digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')
    operationButtons = document.querySelectorAll(".operation")
    signButton = document.getElementById("btn_op_sign")

    
    function onDigitButtonClicked(digit) {
        if (!selectedOperation)
        {
            if (a.length >= 16)
                return;

            if (digit == '0' && a == '0')
            {
                return
            }
            else if ((digit != '.') || (digit == '.' && !a.includes(digit)))
            {
                if (a == '0' && digit != '.')
                    a = digit
                else
                    a += digit
            }
            outputElement.innerHTML = a
        }
        else
        {
            if (b.length >= 16)
                return;

            if (digit == '0' && b == '0')
            {
                return
            }
            else if ((digit != '.') || (digit == '.' && !b.includes(digit)))
            {
                if (b == '0' && digit != '.')
                    b = digit
                else
                    b += digit
            }
            outputElement.innerHTML = b
        }
    }

    function onSignButtonClicked()
    {
        if (!selectedOperation)
        {
            if (a != '0')
            {
                if (a.includes('-'))
                    a = a.slice(1);
                else
                    a = '-' + a
                    
                outputElement.innerHTML = a
            }
        }
        else
        {
            if (b != '0')
            {
                if (b.includes('-'))
                    b = b.slice(1);
                else
                    b = '-' + b
                    
                outputElement.innerHTML = b
            }
        }
    }

    function onOperationButtonClicked(operationSybmol)
    {
        if (a === '') return
        selectedOperation = operationSybmol
        clear_result_field()
    }
    
    // устанавка колбек-функций на кнопки циферблата по событию нажатия
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });

    // установка колбек-функций для кнопок операций
    operationButtons.forEach(buttonOperation => {
        buttonOperation.onclick = function() {
            const operationSymbol = buttonOperation.innerHTML
            onOperationButtonClicked(operationSymbol)
        }
    })

    // установка колбек-функции для кнопки смены знака
    signButton.onclick = onSignButtonClicked;
    
    // кнопка очищения
    document.getElementById("btn_op_clear").onclick = function() { 
        a = '0'
        b = '0'
        selectedOperation = null
        expressionResult = ''
        outputElement.innerHTML = 0
    }
    
    // кнопка расчёта результата
    document.getElementById("btn_op_equal").onclick = function() { 
        if (a === '' || b === '' || !selectedOperation)
            return
            
        switch(selectedOperation) { 
            case 'x':
                expressionResult = (+a) * (+b)
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;
        }

        
        a = expressionResult.toString()
        b = '0'
        selectedOperation = null
        outputElement.innerHTML = a
    }

    function clear_result_field() {
        outputElement.innerHTML = '0'
    }
};