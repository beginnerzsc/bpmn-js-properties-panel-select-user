'use strict';

var escapeHTML = require('../Utils').escapeHTML;

var domify = require('min-dom').domify,
  domQuery = require('min-dom').query;

var entryFieldDescription = require('./EntryFieldDescription');


var textField = function (translate, options, defaultParameters) {

  // Default action for the button next to the input-field
  var defaultButtonAction = function (element, inputNode) {
    var input = domQuery('input[name="' + options.modelProperty + '"]', inputNode);
    input.value = '';

    return true;
  };

  // default method to determine if the button should be visible
  var defaultButtonShow = function (element, inputNode) {
    var input = domQuery('input[name="' + options.modelProperty + '"]', inputNode);

    return input.value !== '';
  };


  var resource = defaultParameters,
    label = options.label || resource.id,
    dataValueLabel = options.dataValueLabel,
    buttonLabel = (options.buttonLabel || 'X'),
    actionName = (typeof options.buttonAction != 'undefined') ? options.buttonAction.name : 'clear',
    actionMethod = (typeof options.buttonAction != 'undefined') ? options.buttonAction.method : defaultButtonAction,
    showName = (typeof options.buttonShow != 'undefined') ? options.buttonShow.name : 'canClear',
    showMethod = (typeof options.buttonShow != 'undefined') ? options.buttonShow.method : defaultButtonShow,
    canBeDisabled = !!options.disabled && typeof options.disabled === 'function',
    canBeHidden = !!options.hidden && typeof options.hidden === 'function',
    description = options.description;

  resource.html =
    domify('<label for="camunda-' + escapeHTML(resource.id) + '" ' +
      (canBeDisabled ? 'data-disable="isDisabled" ' : '') +
      (canBeHidden ? 'data-show="isHidden" ' : '') +
      (dataValueLabel ? 'data-value="' + escapeHTML(dataValueLabel) + '"' : '') + '>' + escapeHTML(label) + '</label>' +
      '<div class="bpp-field-wrapper" ' +
      (canBeDisabled ? 'data-disable="isDisabled"' : '') +
      (canBeHidden ? 'data-show="isHidden"' : '') +
      '>' +
      '<input id="camunda-' + escapeHTML(resource.id) + '" type="text" name="' + escapeHTML(options.modelProperty) + '" ' +
      (canBeDisabled ? 'data-disable="isDisabled"' : '') +
      (canBeHidden ? 'data-show="isHidden"' : '') +
      ' />' +
      '<button class="action-button ' + escapeHTML(actionName) + '" data-action="' + escapeHTML(actionName) + '" data-show="' + escapeHTML(showName) + '" ' +
      (canBeDisabled ? 'data-disable="isDisabled"' : '') +
      (canBeHidden ? ' data-show="isHidden"' : '') + '>' +
      '<span>' + escapeHTML(buttonLabel) + '</span>' +
      '</button>' +
      '</div>');

  if (resource.id == 'assignee') { // 如果为执行人
    resource.html = domify(
      '<label for="camunda-' + resource.id + '" ' +
      (canBeDisabled ? 'data-disable="isDisabled" ' : '') +
      (canBeHidden ? 'data-show="isHidden" ' : '') +
      (dataValueLabel ? 'data-value="' + dataValueLabel + '"' : '') + '>' + label + '</label>' +
      '<div class="bpp-field-wrapper" style="display:flex;" ' +
      (canBeDisabled ? 'data-disable="isDisabled"' : '') +
      (canBeHidden ? 'data-show="isHidden"' : '') +
      '>' +
      '<div class="left-input-disabled" style="display:flex;position:relative;">' +
      '<input id="camunda-' + resource.id + '" type="text" name="' + options.modelProperty + '" ' +
      (canBeDisabled ? 'data-disable="isDisabled"' : '') +
      (canBeHidden ? 'data-show="isHidden"' : '') +
      ' />' +

      '<button class="' + actionName + '" style="position:absolute;top:2px;right:2px" data-action="' + actionName + '" data-show="' + showName + '" ' +
      (canBeDisabled ? 'data-disable="isDisabled"' : '') +
      (canBeHidden ? ' data-show="isHidden"' : '') + '>' +
      '<span>' + buttonLabel + '</span>' +
      '</button>' +
      '</div>' +
      '<input type="button" class="btn-select" value="选择" onclick="showUserInfo(this)"/>' + // 点击方法
      '</div>'
    );
  } else if (resource.id == 'candidateUsers') { // 如果为候选人
    resource.html = domify('<label for="camunda-' + resource.id + '" ' +
    (canBeDisabled ? 'data-disable="isDisabled" ' : '') +
    (canBeHidden ? 'data-show="isHidden" ' : '') +
    (dataValueLabel ? 'data-value="' + dataValueLabel + '"' : '') + '>' + label + '</label>' +
    '<div class="bpp-field-wrapper" style="display:flex;" ' +
    (canBeDisabled ? 'data-disable="isDisabled"' : '') +
    (canBeHidden ? 'data-show="isHidden"' : '') +
    '>' +
    '<div class="left-input-disabled" style="display:flex;position:relative;">' +
    '<input id="camunda-' + resource.id + '" type="text" name="' + options.modelProperty + '" ' +
    (canBeDisabled ? 'data-disable="isDisabled"' : '') +
    (canBeHidden ? 'data-show="isHidden"' : '') +
    ' />' +

    '<button class="' + actionName + '" style="position:absolute;top:2px;right:2px" data-action="' + actionName + '" data-show="' + showName + '" ' +
    (canBeDisabled ? 'data-disable="isDisabled"' : '') +
    (canBeHidden ? ' data-show="isHidden"' : '') + '>' +
    '<span>' + buttonLabel + '</span>' +
    '</button>' +
    '</div>' +
    '<input type="button" class="btn-select" value="选择" onclick="showUserInfo(this)"/>' + // 点击方法
    '</div>');
  } else if (resource.id == 'candidateGroups') { // 如果为候选人组
    resource.html = domify('<label for="camunda-' + resource.id + '" ' +
    (canBeDisabled ? 'data-disable="isDisabled" ' : '') +
    (canBeHidden ? 'data-show="isHidden" ' : '') +
    (dataValueLabel ? 'data-value="' + dataValueLabel + '"' : '') + '>' + label + '</label>' +
    '<div class="bpp-field-wrapper" style="display:flex;" ' +
    (canBeDisabled ? 'data-disable="isDisabled"' : '') +
    (canBeHidden ? 'data-show="isHidden"' : '') +
    '>' +
    '<div class="left-input-disabled" style="display:flex;position:relative;">' +
    '<input id="camunda-' + resource.id + '" type="text" name="' + options.modelProperty + '" ' +
    (canBeDisabled ? 'data-disable="isDisabled"' : '') +
    (canBeHidden ? 'data-show="isHidden"' : '') +
    ' />' +

    '<button class="' + actionName + '" style="position:absolute;top:2px;right:2px" data-action="' + actionName + '" data-show="' + showName + '" ' +
    (canBeDisabled ? 'data-disable="isDisabled"' : '') +
    (canBeHidden ? ' data-show="isHidden"' : '') + '>' +
    '<span>' + buttonLabel + '</span>' +
    '</button>' +
    '</div>' +
    '<input type="button" class="btn-select" value="选择" onclick="showUserInfo(this)"/>' + // 点击方法
    '</div>');
  }

  // add description below text input entry field
  if (description) {
    resource.html.appendChild(entryFieldDescription(translate, description, { show: canBeHidden && 'isHidden' }));
  }

  resource[actionName] = actionMethod;
  resource[showName] = showMethod;

  if (canBeDisabled) {
    resource.isDisabled = function () {
      return options.disabled.apply(resource, arguments);
    };
  }

  if (canBeHidden) {
    resource.isHidden = function () {
      return !options.hidden.apply(resource, arguments);
    };
  }

  resource.cssClasses = ['bpp-textfield'];

  return resource;
};

module.exports = textField;
