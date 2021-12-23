"use strict";

function evSetupMultiSelects() {
  const multiSelects = document.querySelectorAll("select[multiple]");
  multiSelects.forEach(evSetupMultiSelect);
}

function evSetupMultiSelect(select) {
  const parent = select.closest("div.select");

  if (parent.querySelector(".ev-multi-select-view")) {
    return;
  }

  // Create the view
  const view = document.createElement("div");
  view.classList.add("ev-multi-select-view", "tags");

  view.onclick = function (event) {
    evToggleMultiSelect(select, view);
  };

  // Configure the select element
  updateOptions = function () {
    evUpdateMultiSelect(select, view);
  };

  // Configure option elements
  const options = select.querySelectorAll("option");
  options.forEach(option => {
    option.onmousedown = function (event) {
      event.preventDefault();
      option.selected = option.selected ? false : true;
      select.focus();

      updateOptions();
    };
  });

  updateOptions();

  // Insert the view
  parent.insertBefore(view, select);

  evCollapseMultiSelect(select, view);
}

function evToggleMultiSelect(select, view) {
  if (view.classList.contains("ev-expanded")) {
    evCollapseMultiSelect(select, view);
  } else {
    evExpandMultiSelect(select, view);
  }
}

function evExpandMultiSelect(select, view) {
  select.style.display = "block";
  view.classList.add("ev-expanded");

  select.focus();
}

function evCollapseMultiSelect(select, view) {
  select.style.display = "none";
  view.classList.remove("ev-expanded");

  view.focus();
}

function evUpdateMultiSelect(select, view) {
  const options = [...select.selectedOptions];

  // If there is no selected option, simply display a placeholder
  if (options.length == 0) {
    const placeholder = document.createElement("span");
    placeholder.classList.add("ev-placeholder");
    placeholder.appendChild(document.createTextNode("No element selected"));

    view.innerHTML = "";
    view.appendChild(placeholder);

    return;
  }

  // Create two tags for each option, one with a close link and one with the
  // text of the option.
  const tags = options.map(option => {
    const parent = document.createElement("div");
    parent.classList.add("tags", "has-addons");

    const label = document.createElement("span");
    label.classList.add("tag");
    label.appendChild(document.createTextNode(option.text));
    parent.appendChild(label);

    const close = document.createElement("a");
    close.classList.add("tag", "is-delete");
    close.onclick = function (event) {
      event.stopImmediatePropagation();

      [...select.options].forEach(o => {
        if (o.value == option.value) {
          o.selected = false;
          evUpdateMultiSelect(select, view);
        }
      });
    };
    parent.appendChild(close);

    return parent;
  });

  // Replace all existing tags with the new ones
  view.innerHTML = "";
  tags.forEach(tag => {
    view.appendChild(tag)
  });
}
