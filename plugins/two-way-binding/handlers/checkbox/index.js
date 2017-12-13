
const { objValueStr2AST, objExpression2Str } = require('../../../utils');
const { setValueAST, eventHandlerAST, toBoolAST, getAttr } = require('../../utils');


const bindingMap = {};



function handleCheckbox(t, modelBinding, openingElement, eventName) {
    if (!modelBinding.name || !modelBinding.name.name)
        throw new Error('Missing name prop at modelBinding.');

    const bindingStr = objExpression2Str(modelBinding.value.expression);
    if (bindingMap[bindingStr])
        bindingMap[bindingStr].push(modelBinding);
    else bindingMap[bindingStr] = [modelBinding];
    console.log(bindingMap);

    modelBinding.name.name = 'checked';
    const modelBindingExpression = modelBinding.value.expression;
    const setValueCall = setValueAST(
        modelBindingExpression,
        toBoolAST(objValueStr2AST('e.target.checked', t))
    );
    modelBinding.value = t.jSXExpressionContainer(toBoolAST(modelBindingExpression).expression);
    const eventHandler = getAttr(openingElement, eventName);
    if (eventHandler)
        eventHandler.value = eventHandlerAST(t, setValueCall, eventHandler);
    else openingElement.attributes.push(t.JSXAttribute(
        t.jSXIdentifier(eventName),
        eventHandlerAST(t, setValueCall)
    ));
}



module.exports = handleCheckbox;
